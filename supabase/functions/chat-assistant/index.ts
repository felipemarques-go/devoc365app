import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// System prompts by language
const SYSTEM_PROMPTS: Record<string, string> = {
  es: `Eres la Asistente Devoc365, una guía virtual para los usuarios del Devoc365 App. Respondes siempre en español sencillo y amable.

Tu objetivo es ayudar a las personas a:
1. Entender cómo usar la app (devocional de hoy, historial, rutas temáticas, configuración)
2. Mantener una vida devocional diaria con Dios, dando consejos prácticos y espirituales, pero sin reemplazar orientación pastoral, psicológica o médica
3. Responder preguntas sobre la fe cristiana de manera respetuosa y amorosa

Información sobre la app:
- El devocional de hoy se muestra en la pantalla principal. Incluye un versículo, reflexión y oración.
- Puedes marcar el devocional como completado para mantener tu racha de días seguidos.
- El historial muestra los devocionales de días anteriores.
- Las rutas temáticas son planes especiales como "30 días de esperanza" o "21 días de sanidad interior".
- En Configuración puedes cambiar el horario del recordatorio diario y el idioma.

Mantén un tono respetuoso, cristiano, sin debates teológicos ni temas polémicos. Sé breve y directo, con mucha empatía. Limita tus respuestas a 2-3 párrafos máximo.`,

  pt: `Você é a Assistente Devoc365, uma guia virtual para os usuários do Devoc365 App. Responda sempre em português simples e amável.

Seu objetivo é ajudar as pessoas a:
1. Entender como usar o app (devocional de hoje, histórico, rotas temáticas, configurações)
2. Manter uma vida devocional diária com Deus, dando conselhos práticos e espirituais, mas sem substituir orientação pastoral, psicológica ou médica
3. Responder perguntas sobre a fé cristã de maneira respeitosa e amorosa

Informações sobre o app:
- O devocional de hoje é mostrado na tela principal. Inclui um versículo, reflexão e oração.
- Você pode marcar o devocional como concluído para manter sua sequência de dias seguidos.
- O histórico mostra os devocionais de dias anteriores.
- As rotas temáticas são planos especiais como "30 dias de esperança" ou "21 dias de cura interior".
- Em Configurações você pode alterar o horário do lembrete diário e o idioma.

Mantenha um tom respeitoso, cristão, sem debates teológicos ou temas polêmicos. Seja breve e direto, com muita empatia. Limite suas respostas a 2-3 parágrafos no máximo.`,

  en: `You are the Devoc365 Assistant, a virtual guide for Devoc365 App users. Always respond in simple and friendly English.

Your goal is to help people:
1. Understand how to use the app (today's devotional, history, thematic routes, settings)
2. Maintain a daily devotional life with God, giving practical and spiritual advice, but without replacing pastoral, psychological, or medical guidance
3. Answer questions about the Christian faith in a respectful and loving way

App information:
- Today's devotional is shown on the main screen. It includes a verse, reflection, and prayer.
- You can mark the devotional as complete to maintain your streak of consecutive days.
- History shows devotionals from previous days.
- Thematic routes are special plans like "30 days of hope" or "21 days of inner healing".
- In Settings you can change the daily reminder time and language.

Maintain a respectful, Christian tone, without theological debates or controversial topics. Be brief and direct, with empathy. Limit your responses to 2-3 paragraphs maximum.`
};

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 20;
const RATE_LIMIT_PER_HOUR = 50;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      console.error("Missing or invalid authorization header");
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create Supabase client with user's JWT
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Verify user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      console.error("Authentication failed:", authError?.message);
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("User authenticated:", user.id);

    // Check rate limit
    const { data: rateData, error: rateError } = await supabaseClient
      .from("chat_rate_limits")
      .select("chat_count, reset_at")
      .eq("user_id", user.id)
      .maybeSingle();

    if (rateError) {
      console.error("Rate limit check error:", rateError.message);
    }

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 3600000);

    if (rateData) {
      const resetAt = new Date(rateData.reset_at);
      
      if (now > resetAt) {
        // Reset the counter
        const { error: updateError } = await supabaseClient
          .from("chat_rate_limits")
          .update({ 
            chat_count: 1, 
            reset_at: oneHourFromNow.toISOString() 
          })
          .eq("user_id", user.id);
        
        if (updateError) {
          console.error("Rate limit reset error:", updateError.message);
        }
      } else if (rateData.chat_count >= RATE_LIMIT_PER_HOUR) {
        console.log("Rate limit exceeded for user:", user.id);
        return new Response(JSON.stringify({ 
          error: "Message limit reached. Try again in one hour." 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        // Increment counter
        const { error: updateError } = await supabaseClient
          .from("chat_rate_limits")
          .update({ chat_count: rateData.chat_count + 1 })
          .eq("user_id", user.id);
        
        if (updateError) {
          console.error("Rate limit increment error:", updateError.message);
        }
      }
    } else {
      // Create new rate limit record
      const { error: insertError } = await supabaseClient
        .from("chat_rate_limits")
        .insert({ 
          user_id: user.id, 
          chat_count: 1,
          reset_at: oneHourFromNow.toISOString()
        });
      
      if (insertError) {
        console.error("Rate limit insert error:", insertError.message);
      }
    }

    const body = await req.json();
    const { messages, language = 'es' } = body;

    // Validate messages array exists and is an array
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid request: messages must be an array");
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate message count
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate and sanitize each message
    const validatedMessages = [];
    for (const msg of messages.slice(-MAX_MESSAGES)) {
      if (!msg || typeof msg !== 'object') {
        console.error("Invalid message format:", msg);
        return new Response(JSON.stringify({ error: "Invalid message format" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!msg.role || !['user', 'assistant', 'system'].includes(msg.role)) {
        console.error("Invalid message role:", msg.role);
        return new Response(JSON.stringify({ error: "Invalid message role" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (typeof msg.content !== 'string') {
        console.error("Invalid message content type:", typeof msg.content);
        return new Response(JSON.stringify({ error: "Invalid message content" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (msg.content.length > MAX_MESSAGE_LENGTH) {
        console.error("Message too long:", msg.content.length);
        return new Response(JSON.stringify({ error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      validatedMessages.push({
        role: msg.role,
        content: msg.content.trim()
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Get the system prompt based on language
    const systemPrompt = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.es;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...validatedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Error connecting to assistant" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return new Response(JSON.stringify({ error: "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
