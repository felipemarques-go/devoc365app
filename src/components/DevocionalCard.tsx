import { BookOpen, CheckCircle2, Flame, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { getDevocionalDelDia, formatFechaEspanol } from '@/data/devocionales365';
import { getGuidesForDay } from '@/data/guidesContent';
import { cn } from '@/lib/utils';

export function DevocionalCard() {
  const { devocionalCompletadoHoy, marcarDevocionalCompletado, usuario } = useApp();
  const { language, t } = useLanguage();
  
  const devocionalHoy = getDevocionalDelDia();
  const guides = getGuidesForDay(new Date(), language);
  
  const formatDate = (date: Date) => {
    const locales = { es: 'es-ES', pt: 'pt-BR', en: 'en-US' };
    return date.toLocaleDateString(locales[language], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const fechaHoy = formatDate(new Date());

  return (
    <article className="mx-4 animate-slide-up">
      {/* Streak indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary">
          <Flame className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">
            {usuario.streakActual} {t('devotional.daysStreak')}
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
            <span className="text-xs font-medium uppercase tracking-wide">{t('devotional.today')}</span>
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
              {t('devotional.reflection')}
            </h3>
            <div className="text-foreground leading-relaxed whitespace-pre-line text-sm">
              {devocionalHoy.reflexion}
            </div>
          </div>

          {/* Oración */}
          <div className="p-4 rounded-xl bg-muted/50">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {t('devotional.prayer')}
            </h3>
            <p className="text-foreground leading-relaxed italic text-sm">
              {devocionalHoy.oracion}
            </p>
          </div>

          {/* Protection Guide */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="text-xs font-semibold uppercase tracking-wide text-primary">
                {guides.protection.title}
              </h3>
            </div>
            <p className="text-foreground leading-relaxed text-sm whitespace-pre-line mb-3">
              {guides.protection.content}
            </p>
            <p className="text-foreground leading-relaxed italic text-sm border-t border-primary/10 pt-3">
              {guides.protection.prayer}
            </p>
          </div>

          {/* Prosperity Guide */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">
                {guides.prosperity.title}
              </h3>
            </div>
            <p className="text-foreground leading-relaxed text-sm whitespace-pre-line mb-3">
              {guides.prosperity.content}
            </p>
            <p className="text-foreground leading-relaxed italic text-sm border-t border-accent/10 pt-3">
              {guides.prosperity.prayer}
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
            {devocionalCompletadoHoy ? t('devotional.completed') : t('devotional.markComplete')}
          </Button>
        </div>
      </div>
    </article>
  );
}
