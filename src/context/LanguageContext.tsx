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
    'nav.home': 'Hoy',
    'nav.history': 'Historial',
    'nav.routes': 'Rutas',
    'nav.profile': 'Perfil',
    'nav.settings': 'Config',
    
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
    'profile.title': 'Perfil',
    'profile.hello': '¡Hola,',
    'profile.daysCompleted': 'Días totales',
    'profile.currentStreak': 'Racha actual',
    'profile.bestStreak': 'Mejor racha',
    'profile.goal': 'Mi meta devocional',
    'profile.days': 'días',
    'profile.progress': 'Progreso',
    'profile.premiumActive': 'Premium activo',
    'profile.upgradePremium': 'Mejorar a Premium',
    'profile.manageSubscription': 'Gestionar mi suscripción',
    'profile.logout': 'Cerrar sesión',
    
    // Auth
    'auth.login': 'Iniciar sesión',
    'auth.register': 'Crear cuenta',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.name': 'Nombre',
    'auth.yourName': 'Tu nombre',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes cuenta?',
    'auth.hasAccount': '¿Ya tienes cuenta?',
    'auth.welcomeBack': 'Bienvenido de vuelta',
    'auth.createAccount': 'Crea tu cuenta',
    'auth.invalidEmail': 'Correo electrónico inválido',
    'auth.passwordMin': 'La contraseña debe tener al menos 6 caracteres',
    'auth.invalidCredentials': 'Credenciales incorrectas. Verifica tu correo y contraseña.',
    'auth.alreadyRegistered': 'Este correo ya está registrado. Intenta iniciar sesión.',
    'auth.genericError': 'Ocurrió un error. Por favor, intenta de nuevo.',
    'auth.signUp': 'Regístrate',
    'auth.signIn': 'Inicia sesión',
    
    // History
    'history.title': 'Historial',
    'history.subtitle': 'Devocionales anteriores',
    'history.limitedAccess': 'Acceso limitado a los últimos 3 días. Mejora a Premium para ver todo el historial.',
    'history.fullAccess': 'Tu historial completo de devocionales.',
    'history.last30Days': 'Últimos 30 días',
    
    // Routes
    'routes.title': 'Rutas temáticas',
    'routes.subtitle': 'Planes devocionales especiales para profundizar tu fe.',
    'routes.locked': 'Premium',
    
    // Premium
    'premium.title': 'Devoc365 Premium',
    'premium.description': 'Acceso completo a historial, rutas temáticas y más contenido devocional.',
    'premium.upgrade': 'Mejorar a Premium',
    'premium.upgradeNow': 'Mejorar ahora',
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
    'nav.home': 'Hoje',
    'nav.history': 'Histórico',
    'nav.routes': 'Rotas',
    'nav.profile': 'Perfil',
    'nav.settings': 'Config',
    
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
    'profile.title': 'Perfil',
    'profile.hello': 'Olá,',
    'profile.daysCompleted': 'Dias totais',
    'profile.currentStreak': 'Sequência atual',
    'profile.bestStreak': 'Melhor sequência',
    'profile.goal': 'Minha meta devocional',
    'profile.days': 'dias',
    'profile.progress': 'Progresso',
    'profile.premiumActive': 'Premium ativo',
    'profile.upgradePremium': 'Atualizar para Premium',
    'profile.manageSubscription': 'Gerenciar minha assinatura',
    'profile.logout': 'Sair',
    
    // Auth
    'auth.login': 'Entrar',
    'auth.register': 'Criar conta',
    'auth.email': 'E-mail',
    'auth.password': 'Senha',
    'auth.name': 'Nome',
    'auth.yourName': 'Seu nome',
    'auth.forgotPassword': 'Esqueceu sua senha?',
    'auth.noAccount': 'Não tem conta?',
    'auth.hasAccount': 'Já tem conta?',
    'auth.welcomeBack': 'Bem-vindo de volta',
    'auth.createAccount': 'Crie sua conta',
    'auth.invalidEmail': 'E-mail inválido',
    'auth.passwordMin': 'A senha deve ter pelo menos 6 caracteres',
    'auth.invalidCredentials': 'Credenciais incorretas. Verifique seu e-mail e senha.',
    'auth.alreadyRegistered': 'Este e-mail já está registrado. Tente fazer login.',
    'auth.genericError': 'Ocorreu um erro. Por favor, tente novamente.',
    'auth.signUp': 'Cadastre-se',
    'auth.signIn': 'Entrar',
    
    // History
    'history.title': 'Histórico',
    'history.subtitle': 'Devocionais anteriores',
    'history.limitedAccess': 'Acesso limitado aos últimos 3 dias. Atualize para Premium para ver todo o histórico.',
    'history.fullAccess': 'Seu histórico completo de devocionais.',
    'history.last30Days': 'Últimos 30 dias',
    
    // Routes
    'routes.title': 'Rotas temáticas',
    'routes.subtitle': 'Planos devocionais especiais para aprofundar sua fé.',
    'routes.locked': 'Premium',
    
    // Premium
    'premium.title': 'Devoc365 Premium',
    'premium.description': 'Acesso completo ao histórico, rotas temáticas e mais conteúdo devocional.',
    'premium.upgrade': 'Atualizar para Premium',
    'premium.upgradeNow': 'Atualizar agora',
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
    'nav.home': 'Today',
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
    'profile.title': 'Profile',
    'profile.hello': 'Hello,',
    'profile.daysCompleted': 'Total days',
    'profile.currentStreak': 'Current streak',
    'profile.bestStreak': 'Best streak',
    'profile.goal': 'My devotional goal',
    'profile.days': 'days',
    'profile.progress': 'Progress',
    'profile.premiumActive': 'Premium active',
    'profile.upgradePremium': 'Upgrade to Premium',
    'profile.manageSubscription': 'Manage my subscription',
    'profile.logout': 'Log out',
    
    // Auth
    'auth.login': 'Log in',
    'auth.register': 'Create account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.yourName': 'Your name',
    'auth.forgotPassword': 'Forgot your password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    'auth.welcomeBack': 'Welcome back',
    'auth.createAccount': 'Create your account',
    'auth.invalidEmail': 'Invalid email address',
    'auth.passwordMin': 'Password must be at least 6 characters',
    'auth.invalidCredentials': 'Invalid credentials. Please check your email and password.',
    'auth.alreadyRegistered': 'This email is already registered. Try logging in.',
    'auth.genericError': 'An error occurred. Please try again.',
    'auth.signUp': 'Sign up',
    'auth.signIn': 'Sign in',
    
    // History
    'history.title': 'History',
    'history.subtitle': 'Previous devotionals',
    'history.limitedAccess': 'Limited access to the last 3 days. Upgrade to Premium to see the full history.',
    'history.fullAccess': 'Your complete devotional history.',
    'history.last30Days': 'Last 30 days',
    
    // Routes
    'routes.title': 'Thematic Routes',
    'routes.subtitle': 'Special devotional plans to deepen your faith.',
    'routes.locked': 'Premium',
    
    // Premium
    'premium.title': 'Devoc365 Premium',
    'premium.description': 'Full access to history, thematic routes, and more devotional content.',
    'premium.upgrade': 'Upgrade to Premium',
    'premium.upgradeNow': 'Upgrade now',
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
