import { Layout } from '@/components/layout/Layout';
import { HistorialCard } from '@/components/HistorialCard';
import { PremiumBanner } from '@/components/PremiumBanner';
import { historialDevocionales } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const Historial = () => {
  const { usuario } = useApp();
  const isGratuito = usuario.tipoAcceso === 'gratuito';

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
