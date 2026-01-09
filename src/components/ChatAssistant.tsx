import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-assistant`;

// Initial messages and UI text by language
const uiTexts = {
  es: {
    initialMessage: '¡Hola! Soy la Asistente Devoc365. Estoy aquí para ayudarte con cualquier duda sobre la app o tu vida devocional. ¿En qué puedo ayudarte hoy?',
    title: 'Asistente Devoc365',
    subtitle: 'Tu guía espiritual virtual',
    placeholder: 'Escribe tu pregunta...',
    tooLong: 'Tu mensaje es demasiado largo. El máximo permitido es',
    characters: 'caracteres',
    errorConnection: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
    quickAction1: '¿Cómo uso la app?',
    quickAction2: '¿Qué contenido hay?',
    quickAction3: 'Consejos para orar',
  },
  pt: {
    initialMessage: 'Olá! Sou a Assistente Devoc365. Estou aqui para ajudá-lo com qualquer dúvida sobre o app ou sua vida devocional. Como posso ajudá-lo hoje?',
    title: 'Assistente Devoc365',
    subtitle: 'Seu guia espiritual virtual',
    placeholder: 'Escreva sua pergunta...',
    tooLong: 'Sua mensagem é muito longa. O máximo permitido é',
    characters: 'caracteres',
    errorConnection: 'Desculpe, houve um erro ao processar sua mensagem. Por favor, tente novamente.',
    quickAction1: 'Como uso o app?',
    quickAction2: 'Qual conteúdo tem?',
    quickAction3: 'Dicas para orar',
  },
  en: {
    initialMessage: "Hi! I'm the Devoc365 Assistant. I'm here to help you with any questions about the app or your devotional life. How can I help you today?",
    title: 'Devoc365 Assistant',
    subtitle: 'Your virtual spiritual guide',
    placeholder: 'Type your question...',
    tooLong: 'Your message is too long. The maximum allowed is',
    characters: 'characters',
    errorConnection: 'Sorry, there was an error processing your message. Please try again.',
    quickAction1: 'How do I use the app?',
    quickAction2: 'What content is available?',
    quickAction3: 'Prayer tips',
  },
};

export function ChatAssistant() {
  const { session, user } = useAuth();
  const { language } = useLanguage();
  const texts = uiTexts[language] || uiTexts.es;
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: texts.initialMessage
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: texts.initialMessage }]);
    }
  }, [language, texts.initialMessage]);

  // Only show chat assistant if user is authenticated
  if (!user || !session) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const MAX_MESSAGE_LENGTH = 500;
  const MAX_MESSAGES_HISTORY = 20;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const trimmedInput = input.trim();

    // Validate message length
    if (trimmedInput.length > MAX_MESSAGE_LENGTH) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `${texts.tooLong} ${MAX_MESSAGE_LENGTH} ${texts.characters}.` 
      }]);
      return;
    }

    const userMessage: Message = { role: 'user', content: trimmedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = '';

    const updateAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant' && prev.length > 1 && prev[prev.length - 2].role === 'user') {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
        }
        return [...prev, { role: 'assistant', content: assistantContent }];
      });
    };

    try {
      // Limit message history sent to API
      const recentMessages = [...messages, userMessage]
        .filter(m => m.role !== 'assistant' || messages.indexOf(m) > 0)
        .slice(-MAX_MESSAGES_HISTORY);

      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ messages: recentMessages, language }),
      });

      if (!resp.ok || !resp.body) {
        const error = await resp.json().catch(() => ({ error: texts.errorConnection }));
        throw new Error(error.error || texts.errorConnection);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) updateAssistant(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) updateAssistant(content);
          } catch { /* ignore */ }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : texts.errorConnection;
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105",
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
          isOpen && "scale-0 opacity-0"
        )}
        aria-label="Open assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-accent-foreground" />
        </span>
      </button>

      {/* Chat panel */}
      <div className={cn(
        "fixed inset-0 z-50 transition-all duration-300",
        isOpen ? "visible" : "invisible pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Chat container */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 max-h-[85vh]",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{texts.title}</h3>
                <p className="text-xs text-muted-foreground">{texts.subtitle}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-border/50">
            <button 
              onClick={() => setInput(texts.quickAction1)}
              className="text-xs px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground transition-colors"
            >
              {texts.quickAction1}
            </button>
            <button 
              onClick={() => setInput(texts.quickAction2)}
              className="text-xs px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground transition-colors"
            >
              {texts.quickAction2}
            </button>
            <button 
              onClick={() => setInput(texts.quickAction3)}
              className="text-xs px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground transition-colors"
            >
              {texts.quickAction3}
            </button>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background/50">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={texts.placeholder}
                className="flex-1 bg-muted rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="rounded-full w-11 h-11 shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
