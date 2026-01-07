import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { devocionales365Multilang, formatFecha } from '@/data/devocionales365';
import { useMemo } from 'react';

const DevocionalDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const devotional = useMemo(() => {
    const devId = parseInt(id || '0', 10);
    const multilangDev = devocionales365Multilang.find(d => d.id === devId);
    return multilangDev ? multilangDev[language] : undefined;
  }, [id, language]);

  // Calculate the date for this devotional (going back from today)
  const fecha = useMemo(() => {
    if (!devotional) return '';
    const devId = parseInt(id || '0', 10);
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const todayIndex = ((dayOfYear - 1) % 365);
    const daysBack = (todayIndex - (devId - 1) + 365) % 365;
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - daysBack);
    return formatFecha(pastDate, language);
  }, [devotional, id, language]);

  if (!devotional) {
    return (
      <Layout headerTitle={t('devotional.today')}>
        <div className="p-4 text-center">
          <p className="text-muted-foreground">{t('devotional.notFound')}</p>
          <Button onClick={() => navigate(-1)} variant="outline" className="mt-4">
            {t('devotional.back')}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout headerTitle={t('devotional.today')}>
      <div className="py-4 px-4 animate-fade-in">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">{t('devotional.back')}</span>
        </button>

        <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
          {/* Header */}
          <div className="p-5 gradient-spiritual text-primary-foreground">
            <div className="flex items-center gap-2 mb-2 opacity-80">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-medium">{fecha}</span>
            </div>
            <h1 className="font-serif text-xl font-semibold leading-tight">
              {devotional.titulo}
            </h1>
          </div>

          <div className="p-5 space-y-5">
            {/* Versículo */}
            <div className="relative pl-4 border-l-2 border-accent">
              <p className="font-serif text-lg italic text-foreground leading-relaxed">
                {devotional.versiculo}
              </p>
              <p className="mt-2 text-sm font-medium text-accent">{devotional.cita}</p>
            </div>

            {/* Reflexión */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {t('devotional.reflection')}
              </h3>
              <div className="text-foreground leading-relaxed whitespace-pre-line text-sm">
                {devotional.reflexion}
              </div>
            </div>

            {/* Oración */}
            <div className="p-4 rounded-xl bg-muted/50">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {t('devotional.prayer')}
              </h3>
              <p className="text-foreground leading-relaxed italic text-sm">
                {devotional.oracion}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevocionalDetalle;
