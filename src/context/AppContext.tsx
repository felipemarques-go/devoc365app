import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  tipoAcceso: 'gratuito' | 'premium';
  diasCompletados: number;
  streakActual: number;
  mejorStreak: number;
  metaDias: number;
}

interface AppContextType {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
  devocionalCompletadoHoy: boolean;
  marcarDevocionalCompletado: () => void;
  horarioLembrete: string;
  setHorarioLembrete: React.Dispatch<React.SetStateAction<string>>;
}

const defaultUsuario: Usuario = {
  id: '',
  nombre: '',
  email: '',
  tipoAcceso: 'gratuito',
  diasCompletados: 0,
  streakActual: 0,
  mejorStreak: 0,
  metaDias: 30
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user, profile, subscription, isPremium } = useAuth();
  const [usuario, setUsuario] = useState<Usuario>(defaultUsuario);
  const [devocionalCompletadoHoy, setDevocionalCompletadoHoy] = useState(false);
  const [horarioLembrete, setHorarioLembrete] = useState('mañana');

  // Sync user data from auth context
  useEffect(() => {
    if (user && profile) {
      setUsuario({
        id: user.id,
        nombre: profile.nombre || user.email?.split('@')[0] || '',
        email: user.email || '',
        tipoAcceso: isPremium ? 'premium' : 'gratuito',
        diasCompletados: profile.dias_completados,
        streakActual: profile.streak_actual,
        mejorStreak: profile.mejor_streak,
        metaDias: profile.meta_dias
      });
    } else {
      setUsuario(defaultUsuario);
    }
  }, [user, profile, isPremium]);

  const marcarDevocionalCompletado = async () => {
    if (!devocionalCompletadoHoy && user) {
      setDevocionalCompletadoHoy(true);
      
      const newDiasCompletados = usuario.diasCompletados + 1;
      const newStreakActual = usuario.streakActual + 1;
      const newMejorStreak = Math.max(usuario.mejorStreak, newStreakActual);
      
      setUsuario(prev => ({
        ...prev,
        diasCompletados: newDiasCompletados,
        streakActual: newStreakActual,
        mejorStreak: newMejorStreak
      }));

      // Update in database
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            dias_completados: newDiasCompletados,
            streak_actual: newStreakActual,
            mejor_streak: newMejorStreak
          })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating profile:', error);
        }
      } catch (err) {
        console.error('Error updating profile:', err);
      }
    }
  };

  return (
    <AppContext.Provider value={{
      usuario,
      setUsuario,
      devocionalCompletadoHoy,
      marcarDevocionalCompletado,
      horarioLembrete,
      setHorarioLembrete
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
