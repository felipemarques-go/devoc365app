import { Layout } from '@/components/layout/Layout';
import { HistorialCard } from '@/components/HistorialCard';
import { PremiumBanner } from '@/components/PremiumBanner';
import { getHistorialDevocionales, formatFechaEspanol } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useMemo } from 'react';

const Historial = () => {
  const { usuario } = useApp();
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
        fecha: formatFechaEspanol(pastDate)
      };
    });
  }, [daysToShow]);

  return (
    <Layout headerTitle="Historial">
      <div className="py-4 px-4 space-y-4">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
            Devocionales anteriores
          </h1>
          <p className="text-sm text-muted-foreground">
            {isGratuito 
              ? 'Acceso limitado a los últimos 3 días. Mejora a Premium para ver todo el historial.'
              : 'Tu historial completo de devocionales.'}
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
