import { useLanguage } from '@/context/LanguageContext';
import logo from '@/assets/logo.png';

interface HeaderProps {
  title?: string;
}

// Daily motivational phrases by language (rotated by day of year)
const dailyPhrases: Record<string, string[]> = {
  es: [
    'Dios te ama hoy',
    'Camina en fe',
    'Eres bendecido(a)',
    'Su gracia te basta',
    'Confía en Él siempre',
    'Paz en tu corazón',
    'Él nunca te abandona',
    'Nueva misericordia hoy',
    'Eres luz del mundo',
    'Su amor es eterno',
  ],
  pt: [
    'Deus te ama hoje',
    'Caminhe pela fé',
    'Você é abençoado(a)',
    'Sua graça te basta',
    'Confie Nele sempre',
    'Paz no seu coração',
    'Ele nunca te abandona',
    'Nova misericórdia hoje',
    'Você é luz do mundo',
    'Seu amor é eterno',
  ],
  en: [
    'God loves you today',
    'Walk by faith',
    'You are blessed',
    'His grace is enough',
    'Trust in Him always',
    'Peace in your heart',
    'He never leaves you',
    'New mercy today',
    'You are the light',
    'His love is eternal',
  ],
};

function getDailyPhrase(language: string): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const phrases = dailyPhrases[language] || dailyPhrases.es;
  return phrases[dayOfYear % phrases.length];
}

export function Header({ title = 'Devoc365' }: HeaderProps) {
  const { language } = useLanguage();
  const dailyPhrase = getDailyPhrase(language);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Devoc365" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-serif font-semibold text-lg text-foreground">{title}</span>
        </div>
        
        <span className="text-xs font-medium text-accent italic">
          {dailyPhrase}
        </span>
      </div>
    </header>
  );
}
