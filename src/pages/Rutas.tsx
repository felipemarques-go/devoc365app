import { Layout } from '@/components/layout/Layout';
import { RutaCard } from '@/components/RutaCard';
import { PremiumBanner } from '@/components/PremiumBanner';
import { rutasTematicas } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';

const Rutas = () => {
  const { usuario } = useApp();
  const { t } = useLanguage();
  const isGratuito = usuario.tipoAcceso === 'gratuito';

  return (
    <Layout headerTitle={t('routes.title')}>
      <div className="py-4 px-4 space-y-4">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
            {t('routes.title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('routes.subtitle')}
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