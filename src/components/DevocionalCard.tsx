import { BookOpen, CheckCircle2, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { getDevocionalDelDia, formatFechaEspanol } from '@/data/devocionales365';
import { cn } from '@/lib/utils';

export function DevocionalCard() {
  const { devocionalCompletadoHoy, marcarDevocionalCompletado, usuario } = useApp();
  
  const devocionalHoy = getDevocionalDelDia();
  const fechaHoy = formatFechaEspanol(new Date());

  return (
    <article className="mx-4 animate-slide-up">
      {/* Streak indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
          <Flame className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">
            {usuario.streakActual} días seguidos
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{fechaHoy}</span>
      </div>

      {/* Main card */}
      <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
        {/* Header */}
        <div className="p-5 gradient-spiritual text-primary-foreground">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Devocional de hoy</span>
          </div>
          <h2 className="font-serif text-xl font-semibold leading-tight">
            {devocionalHoy.titulo}
          </h2>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Versículo */}
          <div className="relative pl-4 border-l-2 border-accent">
            <p className="font-serif text-lg italic text-foreground leading-relaxed">
              {devocionalHoy.versiculo}
            </p>
            <p className="mt-2 text-sm font-medium text-accent">{devocionalHoy.cita}</p>
          </div>

          {/* Reflexión */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Reflexión
            </h3>
            <div className="text-foreground leading-relaxed whitespace-pre-line text-sm">
              {devocionalHoy.reflexion}
            </div>
          </div>

          {/* Oración */}
          <div className="p-4 rounded-xl bg-muted/50">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Oración
            </h3>
            <p className="text-foreground leading-relaxed italic text-sm">
              {devocionalHoy.oracion}
            </p>
          </div>

          {/* Action */}
          <Button
            onClick={marcarDevocionalCompletado}
            disabled={devocionalCompletadoHoy}
            variant={devocionalCompletadoHoy ? "soft" : "gold"}
            className={cn(
              "w-full",
              devocionalCompletadoHoy && "bg-green-100 text-green-700 hover:bg-green-100"
            )}
            size="lg"
          >
            <CheckCircle2 className={cn(
              "w-5 h-5",
              devocionalCompletadoHoy && "text-green-600"
            )} />
            {devocionalCompletadoHoy ? '¡Completado!' : 'Marcar como completado'}
          </Button>
        </div>
      </div>
    </article>
  );
}
