import { ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Devocional365 } from '@/data/devocionales365';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface HistorialDevocional extends Devocional365 {
  fecha: string;
}

interface HistorialCardProps {
  devotional: HistorialDevocional;
  index: number;
  locked?: boolean;
}

export function HistorialCard({ devotional, index, locked = false }: HistorialCardProps) {
  const navigate = useNavigate();
  const { usuario } = useApp();
  
  // Free users only see first 3
  const isLocked = locked || (usuario.tipoAcceso === 'gratuito' && index >= 3);

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/devocional/${devotional.id}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLocked}
      className={cn(
        "w-full text-left p-4 rounded-xl bg-card border border-border shadow-card transition-all duration-200 animate-fade-in",
        !isLocked && "hover:shadow-soft hover:border-primary/20 active:scale-[0.99]",
        isLocked && "opacity-60"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground mb-1">{devotional.fecha}</p>
          <h3 className="font-semibold text-foreground truncate">{devotional.titulo}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {devotional.cita}
          </p>
        </div>
        {isLocked ? (
          <Lock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </div>
    </button>
  );
}
