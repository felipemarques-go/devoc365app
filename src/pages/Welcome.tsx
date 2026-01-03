import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, BookOpen, Heart, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';

const Welcome = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, isLoading, navigate]);

  const handleEnter = () => {
    setIsAnimating(true);
    setTimeout(() => navigate('/auth'), 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
      </div>

      <div className={`relative z-10 max-w-sm w-full text-center transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'animate-fade-in'}`}>
        {/* Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 rounded-2xl gradient-spiritual flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Sun className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Devoc365</h1>
          <p className="text-muted-foreground text-sm">{t('welcome.subtitle')}</p>
        </div>

        {/* Welcome message */}
        <div className="mb-10 space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            {t('welcome.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('welcome.description')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">{t('welcome.dailyVerse')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">{t('welcome.reflections')}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
              <Sun className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">{t('welcome.prayers')}</p>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={handleEnter}
          variant="spiritual" 
          size="xl" 
          className="w-full"
        >
          <LogIn className="w-5 h-5" />
          {t('welcome.startNow')}
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          {t('welcome.startJourney')}
        </p>

        <Link 
          to="/auth" 
          className="block mt-4 text-sm text-primary hover:underline"
        >
          {t('welcome.haveAccount')}
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
