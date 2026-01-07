import { Layout } from '@/components/layout/Layout';
import { RutaCard } from '@/components/RutaCard';
import { PremiumBanner } from '@/components/PremiumBanner';
import { useApp } from '@/context/AppContext';
import { useLanguage } from '@/context/LanguageContext';

// Rutas with translation keys
const rutasTematicasMultilang = [
  {
    id: '1',
    titleKey: 'route.hope.title',
    descriptionKey: 'route.hope.description',
    dias: 30,
    icono: '🌅',
    premium: false,
  },
  {
    id: '2',
    titleKey: 'route.healing.title',
    descriptionKey: 'route.healing.description',
    dias: 21,
    icono: '💚',
    premium: true,
  },
  {
    id: '3',
    titleKey: 'route.family.title',
    descriptionKey: 'route.family.description',
    dias: 14,
    icono: '👨‍👩‍👧‍👦',
    premium: true,
  },
  {
    id: '4',
    titleKey: 'route.restart.title',
    descriptionKey: 'route.restart.description',
    dias: 7,
    icono: '🔄',
    premium: false,
  }
];

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
          {rutasTematicasMultilang.map((ruta, index) => (
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