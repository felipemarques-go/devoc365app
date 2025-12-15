import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Lock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { rutasTematicas, HOTMART_PREMIUM_URL } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const RutaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useApp();
  
  const ruta = rutasTematicas.find(r => r.id === id);
  const isLocked = ruta?.premium && usuario.tipoAcceso === 'gratuito';

  if (!ruta) {
    return (
      <Layout headerTitle="Ruta">
        <div className="p-4 text-center">
          <p className="text-muted-foreground">Ruta no encontrada</p>
          <Button onClick={() => navigate(-1)} variant="outline" className="mt-4">
            Volver
          </Button>
        </div>
      </Layout>
    );
  }

  // Generate mock days
  const dias = Array.from({ length: ruta.dias }, (_, i) => ({
    numero: i + 1,
    titulo: `Día ${i + 1}: ${['Introducción', 'Fundamentos', 'Profundizando', 'Aplicación', 'Reflexión', 'Compromiso', 'Celebración'][i % 7]}`,
    completado: false
  }));

  return (
    <Layout headerTitle={ruta.titulo}>
      <div className="py-4 px-4 animate-fade-in">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-4xl mx-auto mb-4">
            {ruta.icono}
          </div>
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-2">
            {ruta.titulo}
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {ruta.descripcion}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-primary">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{ruta.dias} días</span>
          </div>
        </div>

        {isLocked ? (
          <div className="text-center p-8 rounded-2xl bg-muted/50 border border-border">
            <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-serif font-semibold text-foreground mb-2">
              Contenido Premium
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Esta ruta temática está disponible para usuarios Premium.
            </p>
            <Button 
              variant="premium"
              onClick={() => window.open(HOTMART_PREMIUM_URL, '_blank')}
            >
              Mejorar a Premium
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {dias.map((dia, index) => (
              <button
                key={dia.numero}
                className={cn(
                  "w-full text-left p-4 rounded-xl bg-card border border-border shadow-sm transition-all duration-200 hover:shadow-card hover:border-primary/20 animate-fade-in",
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                    {dia.numero}
                  </div>
                  <span className="font-medium text-foreground">{dia.titulo}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RutaDetalle;
