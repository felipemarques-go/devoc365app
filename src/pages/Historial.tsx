import { Layout } from '@/components/layout/Layout';
import { HistorialCard } from '@/components/HistorialCard';
import { PremiumBanner } from '@/components/PremiumBanner';
import { getHistorialDevocionales, formatFechaEspanol } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';
import { useMemo } from 'react';
import { formatFecha } from '@/data/devocionales365';

const Historial = () => {
  const { usuario } = useApp();
  const { t, language } = useLanguage();
  const isGratuito = usuario.tipoAcceso === 'gratuito';
  
  // Get past devotionals based on access type
  const daysToShow = isGratuito ? 3 : 30;
  const historialDevocionales = useMemo(() => {
    const today = new Date();
    return getHistorialDevocionales(daysToShow, today).map((dev, index) => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - (index + 1));
      return {
        ...dev,
        fecha: formatFecha(pastDate, language)
      };
    });
  }, [daysToShow, language]);

  return (
    <Layout headerTitle={t('history.title')}>
      <div className="py-4 px-4 space-y-4">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
            {t('history.subtitle')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isGratuito 
              ? t('history.limitedAccess')
              : t('history.fullAccess')}
          </p>
        </div>

        <div className="space-y-3">
          {historialDevocionales.map((devotional, index) => (
            <HistorialCard 
              key={devotional.id} 
              devotional={devotional} 
              index={index}
            />
          ))}
        </div>

        {isGratuito && (
          <div className="pt-4">
            <PremiumBanner variant="compact" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Historial;