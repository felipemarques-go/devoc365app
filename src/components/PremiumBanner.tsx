import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HOTMART_PREMIUM_URL } from '@/data/mockData';

interface PremiumBannerProps {
  variant?: 'full' | 'compact';
}

export function PremiumBanner({ variant = 'full' }: PremiumBannerProps) {
  const handleClick = () => {
    window.open(HOTMART_PREMIUM_URL, '_blank');
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent/10 to-amber-500/10 border border-accent/20 hover:border-accent/40 transition-all duration-200"
      >
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium text-foreground">Mejorar a Premium</span>
      </button>
    );
  }

  return (
    <div className="mx-4 p-5 rounded-2xl bg-gradient-to-br from-accent/10 via-secondary to-accent/5 border border-accent/20 shadow-card animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-accent-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-semibold text-foreground mb-1">
            Devoc365 Premium
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Acceso completo a historial, rutas temáticas y más contenido devocional.
          </p>
          <Button onClick={handleClick} variant="premium" size="sm">
            Mejorar ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
