import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Check } from 'lucide-react';
import { Language } from '@/context/LanguageContext';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

const selectTexts: Record<Language, { title: string; continue: string }> = {
  en: { title: 'Select your language', continue: 'Continue' },
  pt: { title: 'Selecione seu idioma', continue: 'Continuar' },
  es: { title: 'Selecciona tu idioma', continue: 'Continuar' },
};

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<Language>('es');

  const handleContinue = () => {
    // Save directly to localStorage (same keys used by LanguageContext)
    localStorage.setItem('devoc365_language', selectedLang);
    localStorage.setItem('devoc365_language_selected', 'true');
    // Force page reload so LanguageProvider picks up the new values
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-sm w-full text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-2xl gradient-spiritual flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Sun className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Devoc365</h1>
        </div>

        {/* Language selection */}
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            {selectTexts[selectedLang].title}
          </h2>

          <div className="space-y-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLang(lang.code)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
                  selectedLang === lang.code
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="font-medium text-foreground">{lang.name}</span>
                </div>
                {selectedLang === lang.code && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <Button 
          onClick={handleContinue}
          variant="spiritual" 
          size="xl" 
          className="w-full"
        >
          {selectTexts[selectedLang].continue}
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelection;
