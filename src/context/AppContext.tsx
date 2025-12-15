import React, { createContext, useContext, useState, ReactNode } from 'react';
import { usuarioMock, Usuario, Devotional, devocionalHoy, historialDevocionales } from '@/data/mockData';

interface AppContextType {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
  devocionalCompletadoHoy: boolean;
  marcarDevocionalCompletado: () => void;
  horarioLembrete: string;
  setHorarioLembrete: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario>(usuarioMock);
  const [devocionalCompletadoHoy, setDevocionalCompletadoHoy] = useState(false);
  const [horarioLembrete, setHorarioLembrete] = useState('mañana');

  const marcarDevocionalCompletado = () => {
    if (!devocionalCompletadoHoy) {
      setDevocionalCompletadoHoy(true);
      setUsuario(prev => ({
        ...prev,
        diasCompletados: prev.diasCompletados + 1,
        streakActual: prev.streakActual + 1,
        mejorStreak: Math.max(prev.mejorStreak, prev.streakActual + 1)
      }));
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
