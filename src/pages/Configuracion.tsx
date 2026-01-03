import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useLanguage, Language } from '@/context/LanguageContext';
import { HOTMART_PREMIUM_URL } from '@/data/mockData';
import { Bell, Globe, ExternalLink, LogOut, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
];

const Configuracion = () => {
  const { horarioLembrete, setHorarioLembrete } = useApp();
  const { language, setLanguage, t } = useLanguage();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const horarios = [
    { id: 'mañana', label: t('settings.morning'), time: '7:00 AM' },
    { id: 'tarde', label: t('settings.afternoon'), time: '2:00 PM' },
    { id: 'noche', label: t('settings.night'), time: '9:00 PM' },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Layout headerTitle={t('settings.title')}>
      <div className="py-4 px-4 space-y-6 animate-fade-in">
        <h1 className="font-serif text-2xl font-semibold text-foreground mb-6">
          {t('settings.title')}
        </h1>

        {/* Reminder time */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t('settings.reminderTime')}</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {horarios.map(h => (
              <button
                key={h.id}
                onClick={() => setHorarioLembrete(h.id)}
                className={cn(
                  "p-3 rounded-xl text-center transition-all duration-200",
                  horarioLembrete === h.id
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                <span className="block font-medium text-sm">{h.label}</span>
                <span className="block text-xs opacity-80 mt-0.5">{h.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t('settings.language')}</h3>
            </div>
          </div>
          
          <div className="space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "w-full p-3 rounded-xl flex items-center justify-between transition-all duration-200",
                  language === lang.code
                    ? 'bg-primary/10 border border-primary/30'
                    : 'bg-muted hover:bg-muted/80'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-medium text-foreground">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.open(HOTMART_PREMIUM_URL, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            {t('settings.manageSubscription')}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            {t('settings.logout')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Configuracion;
