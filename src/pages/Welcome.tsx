import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, BookOpen, Heart } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEnter = () => {
    setIsAnimating(true);
    setTimeout(() => navigate('/dashboard'), 300);
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
          <p className="text-muted-foreground text-sm">Tu compañero espiritual diario</p>
        </div>

        {/* Welcome message */}
        <div className="mb-10 space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            ¡Bienvenido(a) a Devoc365!
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Tu devocional diario en 5–10 minutos, directamente en tu celular.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Versículo diario</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">Reflexiones</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
              <Sun className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Oraciones</p>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={handleEnter}
          variant="spiritual" 
          size="xl" 
          className="w-full"
        >
          Entrar al devocional de hoy
        </Button>

        <p className="text-xs text-muted-foreground mt-6">
          Inicia tu jornada espiritual hoy
        </p>
      </div>
    </div>
  );
};

export default Welcome;
