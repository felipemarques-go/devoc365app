import { ChevronRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface RutaTematicaMultilang {
  id: string;
  titleKey: string;
  descriptionKey: string;
  dias: number;
  icono: string;
  premium: boolean;
}

interface RutaCardProps {
  ruta: RutaTematicaMultilang;
  index: number;
}

export function RutaCard({ ruta, index }: RutaCardProps) {
  const navigate = useNavigate();
  const { usuario } = useApp();
  const { t } = useLanguage();
  
  const isLocked = ruta.premium && usuario.tipoAcceso === 'gratuito';

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/ruta/${ruta.id}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLocked}
      className={cn(
        "w-full text-left p-5 rounded-2xl bg-card border border-border shadow-card transition-all duration-200 animate-fade-in",
        !isLocked && "hover:shadow-soft hover:border-primary/20 active:scale-[0.99]",
        isLocked && "opacity-75"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
          {ruta.icono}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-serif font-semibold text-foreground">{t(ruta.titleKey)}</h3>
            {isLocked && <Lock className="w-4 h-4 text-accent" />}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {t(ruta.descriptionKey)}
          </p>
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {ruta.dias} {t('routes.days')}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}
