import { Layout } from '@/components/layout/Layout';
import { RutaCard } from '@/components/RutaCard';
import { PremiumBanner } from '@/components/PremiumBanner';
import { rutasTematicas } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const Rutas = () => {
  const { usuario } = useApp();
  const isGratuito = usuario.tipoAcceso === 'gratuito';

  return (
    <Layout headerTitle="Rutas temáticas">
      <div className="py-4 px-4 space-y-4">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
            Rutas temáticas
          </h1>
          <p className="text-sm text-muted-foreground">
            Planes devocionales especiales para profundizar tu fe.
          </p>
        </div>

        <div className="space-y-4">
          {rutasTematicas.map((ruta, index) => (
            <RutaCard key={ruta.id} ruta={ruta} index={index} />
          ))}
        </div>

        {isGratuito && (
          <div className="pt-4">
            <PremiumBanner />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Rutas;
