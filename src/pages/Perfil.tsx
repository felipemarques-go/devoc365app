import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { HOTMART_PREMIUM_URL } from '@/data/mockData';
import { User, Flame, Target, Trophy, Sparkles, ExternalLink } from 'lucide-react';

const Perfil = () => {
  const { usuario, setUsuario } = useApp();

  const metas = [7, 14, 21, 30, 60, 90];

  return (
    <Layout headerTitle="Perfil">
      <div className="py-4 px-4 space-y-6 animate-fade-in">
        {/* Profile header */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full gradient-spiritual flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-foreground">
            ¡Hola, {usuario.nombre}!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{usuario.email}</p>
          
          {usuario.tipoAcceso === 'premium' ? (
            <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Premium activo
            </span>
          ) : (
            <Button 
              variant="premium" 
              size="sm" 
              className="mt-3"
              onClick={() => window.open(HOTMART_PREMIUM_URL, '_blank')}
            >
              <Sparkles className="w-4 h-4" />
              Mejorar a Premium
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-card border border-border shadow-card text-center">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{usuario.diasCompletados}</p>
            <p className="text-xs text-muted-foreground">Días totales</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border shadow-card text-center">
            <Flame className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{usuario.streakActual}</p>
            <p className="text-xs text-muted-foreground">Racha actual</p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border shadow-card text-center">
            <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{usuario.mejorStreak}</p>
            <p className="text-xs text-muted-foreground">Mejor racha</p>
          </div>
        </div>

        {/* Meta */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-serif font-semibold text-foreground mb-3">Mi meta devocional</h3>
          <div className="flex flex-wrap gap-2">
            {metas.map(meta => (
              <button
                key={meta}
                onClick={() => setUsuario(prev => ({ ...prev, metaDias: meta }))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  usuario.metaDias === meta
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {meta} días
              </button>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-medium text-foreground">
                {Math.min(usuario.diasCompletados, usuario.metaDias)}/{usuario.metaDias}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full rounded-full gradient-spiritual transition-all duration-500"
                style={{ width: `${Math.min((usuario.diasCompletados / usuario.metaDias) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Subscription link */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => window.open(HOTMART_PREMIUM_URL, '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
          Gestionar mi suscripción
        </Button>
      </div>
    </Layout>
  );
};

export default Perfil;
