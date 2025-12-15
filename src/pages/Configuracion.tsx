import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { HOTMART_PREMIUM_URL } from '@/data/mockData';
import { Bell, Globe, ExternalLink, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Configuracion = () => {
  const { horarioLembrete, setHorarioLembrete } = useApp();

  const horarios = [
    { id: 'mañana', label: 'Mañana', time: '7:00 AM' },
    { id: 'tarde', label: 'Tarde', time: '2:00 PM' },
    { id: 'noche', label: 'Noche', time: '9:00 PM' },
  ];

  return (
    <Layout headerTitle="Configuración">
      <div className="py-4 px-4 space-y-6 animate-fade-in">
        <h1 className="font-serif text-2xl font-semibold text-foreground mb-6">
          Configuración
        </h1>

        {/* Reminder time */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Horario de recordatorio</h3>
              <p className="text-sm text-muted-foreground">¿Cuándo prefieres tu devocional?</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {horarios.map(h => (
              <button
                key={h.id}
                onClick={() => setHorarioLembrete(h.id)}
                className={cn(
                  "p-3 rounded-xl text-center transition-all duration-200",
                  horarioLembrete === h.id
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                <span className="block font-medium text-sm">{h.label}</span>
                <span className="block text-xs opacity-80 mt-0.5">{h.time}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Idioma</h3>
              <p className="text-sm text-muted-foreground">Español (predeterminado)</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => window.open(HOTMART_PREMIUM_URL, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Gestionar mi suscripción
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Configuracion;
