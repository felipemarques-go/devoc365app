import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  hasSelectedLanguage: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Welcome/Language Selection
    'welcome.selectLanguage': 'Selecciona tu idioma',
    'welcome.continue': 'Continuar',
    'welcome.title': '¡Bienvenido(a) a Devoc365!',
    'welcome.subtitle': 'Tu compañero espiritual diario',
    'welcome.description': 'Tu devocional diario en 5–10 minutos, directamente en tu celular.',
    'welcome.startNow': 'Comenzar ahora',
    'welcome.startJourney': 'Inicia tu jornada espiritual hoy',
    'welcome.haveAccount': '¿Ya tienes cuenta? Inicia sesión',
    'welcome.dailyVerse': 'Versículo diario',
    'welcome.reflections': 'Reflexiones',
    'welcome.prayers': 'Oraciones',
    
    // Devotional
    'devotional.today': 'Devocional de hoy',
    'devotional.daysStreak': 'días seguidos',
    'devotional.reflection': 'Reflexión',
    'devotional.prayer': 'Oración',
    'devotional.protection': 'Guía de Protección',
    'devotional.prosperity': 'Guía de Prosperidad',
    'devotional.markComplete': 'Marcar como completado',
    'devotional.completed': '¡Completado!',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.history': 'Historial',
    'nav.routes': 'Rutas',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.reminderTime': 'Hora del recordatorio',
    'settings.morning': 'Mañana',
    'settings.afternoon': 'Tarde',
    'settings.night': 'Noche',
    'settings.language': 'Idioma',
    'settings.manageSubscription': 'Gestionar mi suscripción',
    'settings.logout': 'Cerrar sesión',
    
    // Profile
    'profile.title': 'Mi Perfil',
    'profile.daysCompleted': 'Días completados',
    'profile.currentStreak': 'Racha actual',
    'profile.bestStreak': 'Mejor racha',
    'profile.goal': 'Meta de días',
    
    // Auth
    'auth.login': 'Iniciar sesión',
    'auth.register': 'Crear cuenta',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes cuenta?',
    'auth.hasAccount': '¿Ya tienes cuenta?',
    
    // History
    'history.title': 'Historial',
    'history.last30Days': 'Últimos 30 días',
    
    // Routes
    'routes.title': 'Rutas Temáticas',
    'routes.locked': 'Premium',
    
    // Premium
    'premium.upgrade': 'Actualizar a Premium',
    'premium.unlock': 'Desbloquear contenido premium',
  },
  pt: {
    // Welcome/Language Selection
    'welcome.selectLanguage': 'Selecione seu idioma',
    'welcome.continue': 'Continuar',
    'welcome.title': 'Bem-vindo(a) ao Devoc365!',
    'welcome.subtitle': 'Seu companheiro espiritual diário',
    'welcome.description': 'Seu devocional diário em 5–10 minutos, direto no seu celular.',
    'welcome.startNow': 'Começar agora',
    'welcome.startJourney': 'Inicie sua jornada espiritual hoje',
    'welcome.haveAccount': 'Já tem conta? Faça login',
    'welcome.dailyVerse': 'Versículo diário',
    'welcome.reflections': 'Reflexões',
    'welcome.prayers': 'Orações',
    
    // Devotional
    'devotional.today': 'Devocional de hoje',
    'devotional.daysStreak': 'dias seguidos',
    'devotional.reflection': 'Reflexão',
    'devotional.prayer': 'Oração',
    'devotional.protection': 'Guia de Proteção',
    'devotional.prosperity': 'Guia de Prosperidade',
    'devotional.markComplete': 'Marcar como concluído',
    'devotional.completed': 'Concluído!',
    
    // Navigation
    'nav.home': 'Início',
    'nav.history': 'Histórico',
    'nav.routes': 'Rotas',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configurações',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.reminderTime': 'Hora do lembrete',
    'settings.morning': 'Manhã',
    'settings.afternoon': 'Tarde',
    'settings.night': 'Noite',
    'settings.language': 'Idioma',
    'settings.manageSubscription': 'Gerenciar minha assinatura',
    'settings.logout': 'Sair',
    
    // Profile
    'profile.title': 'Meu Perfil',
    'profile.daysCompleted': 'Dias completados',
    'profile.currentStreak': 'Sequência atual',
    'profile.bestStreak': 'Melhor sequência',
    'profile.goal': 'Meta de dias',
    
    // Auth
    'auth.login': 'Entrar',
    'auth.register': 'Criar conta',
    'auth.email': 'E-mail',
    'auth.password': 'Senha',
    'auth.name': 'Nome',
    'auth.forgotPassword': 'Esqueceu sua senha?',
    'auth.noAccount': 'Não tem conta?',
    'auth.hasAccount': 'Já tem conta?',
    
    // History
    'history.title': 'Histórico',
    'history.last30Days': 'Últimos 30 dias',
    
    // Routes
    'routes.title': 'Rotas Temáticas',
    'routes.locked': 'Premium',
    
    // Premium
    'premium.upgrade': 'Atualizar para Premium',
    'premium.unlock': 'Desbloquear conteúdo premium',
  },
  en: {
    // Welcome/Language Selection
    'welcome.selectLanguage': 'Select your language',
    'welcome.continue': 'Continue',
    'welcome.title': 'Welcome to Devoc365!',
    'welcome.subtitle': 'Your daily spiritual companion',
    'welcome.description': 'Your daily devotional in 5–10 minutes, right on your phone.',
    'welcome.startNow': 'Start now',
    'welcome.startJourney': 'Begin your spiritual journey today',
    'welcome.haveAccount': 'Already have an account? Sign in',
    'welcome.dailyVerse': 'Daily verse',
    'welcome.reflections': 'Reflections',
    'welcome.prayers': 'Prayers',
    
    // Devotional
    'devotional.today': "Today's devotional",
    'devotional.daysStreak': 'day streak',
    'devotional.reflection': 'Reflection',
    'devotional.prayer': 'Prayer',
    'devotional.protection': 'Protection Guide',
    'devotional.prosperity': 'Prosperity Guide',
    'devotional.markComplete': 'Mark as complete',
    'devotional.completed': 'Completed!',
    
    // Navigation
    'nav.home': 'Home',
    'nav.history': 'History',
    'nav.routes': 'Routes',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.reminderTime': 'Reminder time',
    'settings.morning': 'Morning',
    'settings.afternoon': 'Afternoon',
    'settings.night': 'Night',
    'settings.language': 'Language',
    'settings.manageSubscription': 'Manage my subscription',
    'settings.logout': 'Log out',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.daysCompleted': 'Days completed',
    'profile.currentStreak': 'Current streak',
    'profile.bestStreak': 'Best streak',
    'profile.goal': 'Day goal',
    
    // Auth
    'auth.login': 'Log in',
    'auth.register': 'Create account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.forgotPassword': 'Forgot your password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    
    // History
    'history.title': 'History',
    'history.last30Days': 'Last 30 days',
    
    // Routes
    'routes.title': 'Thematic Routes',
    'routes.locked': 'Premium',
    
    // Premium
    'premium.upgrade': 'Upgrade to Premium',
    'premium.unlock': 'Unlock premium content',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('devoc365_language') as Language | null;
    const hasSelected = localStorage.getItem('devoc365_language_selected') === 'true';
    
    if (savedLanguage && ['es', 'pt', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    setHasSelectedLanguage(hasSelected);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('devoc365_language', lang);
    localStorage.setItem('devoc365_language_selected', 'true');
    setHasSelectedLanguage(true);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, hasSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
