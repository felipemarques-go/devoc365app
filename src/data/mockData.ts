// Mock data for Devoc365 App

export interface Devotional {
  id: string;
  fecha: string;
  titulo: string;
  versiculo: string;
  cita: string;
  reflexion: string;
  oracion: string;
  rutaTematica?: string;
}

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

export interface RutaTematica {
  id: string;
  titulo: string;
  descripcion: string;
  dias: number;
  icono: string;
  premium: boolean;
  devocionales: Devotional[];
}

// Devotional content mockado
export const devocionalHoy: Devotional = {
  id: '1',
  fecha: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  titulo: 'Confianza en tiempos de incertidumbre',
  versiculo: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios. Te fortaleceré, ciertamente te ayudaré, sí, te sostendré con la diestra de mi justicia."',
  cita: 'Isaías 41:10',
  reflexion: `En medio de las tormentas de la vida, Dios nos recuerda que no estamos solos. Este versículo es una promesa poderosa que nos asegura Su presencia constante.

Cuando enfrentamos situaciones que nos superan, cuando el futuro parece incierto, Dios nos dice: "No temas". No es una sugerencia, es un mandato lleno de amor, porque Él sabe que tiene el control de todas las cosas.

Hoy, te invito a soltar esas preocupaciones que pesan en tu corazón. Dios no solo está contigo, sino que te fortalece, te ayuda y te sostiene. Su mano derecha es firme y segura.`,
  oracion: `Señor, gracias por Tu promesa de estar siempre conmigo. En este día, elijo confiar en Ti más que en mis miedos. Fortalece mi fe y ayúdame a recordar que Tú tienes el control. Te entrego mis preocupaciones y descanso en Tu amor. Amén.`
};

export const historialDevocionales: Devotional[] = [
  {
    id: '2',
    fecha: 'Sábado, 14 de diciembre de 2024',
    titulo: 'Paz en medio del caos',
    versiculo: '"La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo."',
    cita: 'Juan 14:27',
    reflexion: 'La paz que Jesús ofrece no depende de las circunstancias externas. Es una paz profunda que permanece incluso cuando todo a nuestro alrededor parece desmoronarse.',
    oracion: 'Padre celestial, llena mi corazón con Tu paz sobrenatural. Ayúdame a mantener la calma en medio de las tormentas de la vida. Amén.'
  },
  {
    id: '3',
    fecha: 'Viernes, 13 de diciembre de 2024',
    titulo: 'Gratitud en cada momento',
    versiculo: '"Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús."',
    cita: '1 Tesalonicenses 5:18',
    reflexion: 'La gratitud transforma nuestra perspectiva. Cuando elegimos agradecer, aun en las dificultades, abrimos nuestro corazón a ver la mano de Dios trabajando.',
    oracion: 'Señor, te doy gracias por cada bendición en mi vida. Enséñame a tener un corazón agradecido en toda circunstancia. Amén.'
  },
  {
    id: '4',
    fecha: 'Jueves, 12 de diciembre de 2024',
    titulo: 'Renovando las fuerzas',
    versiculo: '"Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas."',
    cita: 'Isaías 40:31',
    reflexion: 'Cuando nos sentimos agotados, Dios promete renovar nuestras fuerzas. Solo necesitamos esperar en Él con fe y paciencia.',
    oracion: 'Dios de toda fortaleza, renueva mi espíritu. Dame alas para volar por encima de mis circunstancias. Amén.'
  },
  {
    id: '5',
    fecha: 'Miércoles, 11 de diciembre de 2024',
    titulo: 'El poder de la oración',
    versiculo: '"Orad sin cesar."',
    cita: '1 Tesalonicenses 5:17',
    reflexion: 'La oración es nuestra línea directa con Dios. No necesitamos palabras perfectas, solo un corazón sincero que busca Su presencia.',
    oracion: 'Padre, enséñame a orar constantemente, a mantener una conversación continua contigo durante todo el día. Amén.'
  }
];

export const rutasTematicas: RutaTematica[] = [
  {
    id: '1',
    titulo: '30 días de esperanza',
    descripcion: 'Descubre cómo la esperanza en Dios puede transformar tu perspectiva diaria y llevarte a una vida de propósito.',
    dias: 30,
    icono: '🌅',
    premium: false,
    devocionales: []
  },
  {
    id: '2',
    titulo: '21 días de sanidad interior',
    descripcion: 'Un camino de restauración emocional y espiritual guiado por la Palabra de Dios.',
    dias: 21,
    icono: '💚',
    premium: true,
    devocionales: []
  },
  {
    id: '3',
    titulo: '14 días por la familia',
    descripcion: 'Fortalece los lazos familiares a través de devocionales enfocados en el amor y la unidad.',
    dias: 14,
    icono: '👨‍👩‍👧‍👦',
    premium: true,
    devocionales: []
  },
  {
    id: '4',
    titulo: '7 días para recomenzar con Dios',
    descripcion: 'Una semana para renovar tu relación con Dios y empezar de nuevo con fe renovada.',
    dias: 7,
    icono: '🔄',
    premium: false,
    devocionales: []
  }
];

export const usuarioMock: Usuario = {
  id: '1',
  nombre: 'María',
  email: 'maria@email.com',
  tipoAcceso: 'gratuito',
  diasCompletados: 12,
  streakActual: 5,
  mejorStreak: 8,
  metaDias: 30
};

export const HOTMART_PREMIUM_URL = 'https://pay.hotmart.com/S103473783Y?off=uedjed13&checkoutMode=10';
