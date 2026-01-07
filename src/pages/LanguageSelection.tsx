import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import background from '@/assets/background.png';
import logo from '@/assets/logo.png';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<Language>('es');

  const handleContinue = () => {
    setLanguage(selectedLang);
    navigate('/');
  };

  // Dynamic title based on selected language
  const getTitle = () => {
    switch (selectedLang) {
      case 'en': return 'Select your language';
      case 'pt': return 'Selecione seu idioma';
      default: return 'Selecciona tu idioma';
    }
  };

  const getContinueText = () => {
    switch (selectedLang) {
      case 'en': return 'Continue';
      case 'pt': return 'Continuar';
      default: return 'Continuar';
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="relative z-10 max-w-sm w-full text-center animate-fade-in">
        {/* Logo */}
        <div className="mb-8">
          <img src={logo} alt="Devoc365" className="w-32 h-32 mx-auto mb-4" />
        </div>

        {/* Language selection */}
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
            {getTitle()}
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
          {getContinueText()}
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelection;
