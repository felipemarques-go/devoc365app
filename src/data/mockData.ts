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

export interface Devocional365 {
  id: number;
  titulo: string;
  versiculo: string;
  cita: string;
  reflexion: string;
  oracion: string;
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

// Helper function to get day of year
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Format date in Spanish
export function formatFechaEspanol(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 365 Devotional content
const devocionalBase: Devocional365[] = [
  {
    id: 1,
    titulo: 'Confianza en tiempos de incertidumbre',
    versiculo: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios. Te fortaleceré, ciertamente te ayudaré, sí, te sostendré con la diestra de mi justicia."',
    cita: 'Isaías 41:10',
    reflexion: `En medio de las tormentas de la vida, Dios nos recuerda que no estamos solos. Este versículo es una promesa poderosa que nos asegura Su presencia constante.

Cuando enfrentamos situaciones que nos superan, cuando el futuro parece incierto, Dios nos dice: "No temas". No es una sugerencia, es un mandato lleno de amor, porque Él sabe que tiene el control de todas las cosas.

Hoy, te invito a soltar esas preocupaciones que pesan en tu corazón. Dios no solo está contigo, sino que te fortalece, te ayuda y te sostiene. Su mano derecha es firme y segura.`,
    oracion: 'Señor, gracias por Tu promesa de estar siempre conmigo. En este día, elijo confiar en Ti más que en mis miedos. Fortalece mi fe y ayúdame a recordar que Tú tienes el control. Te entrego mis preocupaciones y descanso en Tu amor. Amén.'
  },
  {
    id: 2,
    titulo: 'Paz en medio del caos',
    versiculo: '"La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo."',
    cita: 'Juan 14:27',
    reflexion: 'La paz que Jesús ofrece no depende de las circunstancias externas. Es una paz profunda que permanece incluso cuando todo a nuestro alrededor parece desmoronarse.',
    oracion: 'Padre celestial, llena mi corazón con Tu paz sobrenatural. Ayúdame a mantener la calma en medio de las tormentas de la vida. Amén.'
  },
  {
    id: 3,
    titulo: 'Gratitud en cada momento',
    versiculo: '"Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús."',
    cita: '1 Tesalonicenses 5:18',
    reflexion: 'La gratitud transforma nuestra perspectiva. Cuando elegimos agradecer, aun en las dificultades, abrimos nuestro corazón a ver la mano de Dios trabajando.',
    oracion: 'Señor, te doy gracias por cada bendición en mi vida. Enséñame a tener un corazón agradecido en toda circunstancia. Amén.'
  },
  {
    id: 4,
    titulo: 'Renovando las fuerzas',
    versiculo: '"Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas."',
    cita: 'Isaías 40:31',
    reflexion: 'Cuando nos sentimos agotados, Dios promete renovar nuestras fuerzas. Solo necesitamos esperar en Él con fe y paciencia.',
    oracion: 'Dios de toda fortaleza, renueva mi espíritu. Dame alas para volar por encima de mis circunstancias. Amén.'
  },
  {
    id: 5,
    titulo: 'El poder de la oración',
    versiculo: '"Orad sin cesar."',
    cita: '1 Tesalonicenses 5:17',
    reflexion: 'La oración es nuestra línea directa con Dios. No necesitamos palabras perfectas, solo un corazón sincero que busca Su presencia.',
    oracion: 'Padre, enséñame a orar constantemente, a mantener una conversación continua contigo durante todo el día. Amén.'
  },
  {
    id: 6,
    titulo: 'Fe que mueve montañas',
    versiculo: '"Porque de cierto os digo, que si tuviereis fe como un grano de mostaza, diréis a este monte: Pásate de aquí allá, y se pasará."',
    cita: 'Mateo 17:20',
    reflexion: 'Dios no busca una fe perfecta, sino una fe sincera. Aun la fe más pequeña puede obrar maravillas cuando está puesta en un Dios todopoderoso.',
    oracion: 'Señor, aumenta mi fe. Ayúdame a confiar en Ti incluso cuando las circunstancias parecen imposibles. Amén.'
  },
  {
    id: 7,
    titulo: 'El amor que transforma',
    versiculo: '"El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso."',
    cita: '1 Corintios 13:4',
    reflexion: 'El amor verdadero es una elección diaria. Dios nos llama a amar como Él nos ama: sin condiciones, con paciencia y bondad.',
    oracion: 'Padre, lléname de Tu amor. Que pueda amar a otros como Tú me amas. Amén.'
  },
  {
    id: 8,
    titulo: 'Propósito divino',
    versiculo: '"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."',
    cita: 'Jeremías 29:11',
    reflexion: 'Dios tiene un plan perfecto para tu vida. Aun en los momentos de duda, recuerda que Sus pensamientos hacia ti son de bien.',
    oracion: 'Señor, confío en Tu plan para mi vida. Guía mis pasos y muéstrame Tu propósito. Amén.'
  },
  {
    id: 9,
    titulo: 'Descanso en el Señor',
    versiculo: '"Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."',
    cita: 'Mateo 11:28',
    reflexion: 'Jesús nos invita a encontrar descanso en Él. No tenemos que cargar solos el peso de la vida; Él quiere llevarlo por nosotros.',
    oracion: 'Jesús, vengo a Ti cansado y agotado. Dame Tu descanso y paz. Amén.'
  },
  {
    id: 10,
    titulo: 'Luz en la oscuridad',
    versiculo: '"Lámpara es a mis pies tu palabra, y lumbrera a mi camino."',
    cita: 'Salmos 119:105',
    reflexion: 'La Palabra de Dios ilumina nuestro camino. En momentos de confusión, la Biblia nos guía hacia la verdad y la vida.',
    oracion: 'Señor, que Tu Palabra sea mi guía diaria. Ilumina mi camino con Tu verdad. Amén.'
  }
];

// Generate remaining devotionals with themes
const themes = [
  { tema: 'Fe y confianza', versiculo: '"Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia."', cita: 'Proverbios 3:5' },
  { tema: 'Amor y compasión', versiculo: '"Amaos los unos a los otros como yo os he amado."', cita: 'Juan 15:12' },
  { tema: 'Esperanza', versiculo: '"El Señor es mi porción, dice mi alma; por eso en Él esperaré."', cita: 'Lamentaciones 3:24' },
  { tema: 'Fortaleza', versiculo: '"Todo lo puedo en Cristo que me fortalece."', cita: 'Filipenses 4:13' },
  { tema: 'Paz interior', versiculo: '"Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones."', cita: 'Filipenses 4:7' },
  { tema: 'Gratitud', versiculo: '"Den gracias al Señor porque Él es bueno; su amor es eterno."', cita: 'Salmos 136:1' },
  { tema: 'Sabiduría', versiculo: '"Si alguno de vosotros tiene falta de sabiduría, pídala a Dios."', cita: 'Santiago 1:5' },
  { tema: 'Perseverancia', versiculo: '"Mas el que persevere hasta el fin, éste será salvo."', cita: 'Mateo 24:13' },
  { tema: 'Gozo', versiculo: '"Estad siempre gozosos. Orad sin cesar. Dad gracias en todo."', cita: '1 Tesalonicenses 5:16-18' },
  { tema: 'Perdón', versiculo: '"Perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores."', cita: 'Mateo 6:12' },
];

export const devocionales365: Devocional365[] = [
  ...devocionalBase,
  ...Array.from({ length: 355 }, (_, i) => {
    const dayNum = i + 11;
    const theme = themes[(dayNum - 1) % themes.length];
    return {
      id: dayNum,
      titulo: `${theme.tema} - Día ${dayNum}`,
      versiculo: theme.versiculo,
      cita: theme.cita,
      reflexion: `Meditación del día ${dayNum} sobre ${theme.tema.toLowerCase()}. Dios nos invita a reflexionar sobre Su Palabra y aplicarla en nuestra vida diaria.`,
      oracion: `Señor, gracias por este día ${dayNum}. Ayúdame a vivir según Tu Palabra y a crecer en ${theme.tema.toLowerCase()}. Amén.`
    };
  })
];

export function getDevocionalDelDia(date: Date = new Date()): Devocional365 {
  const dayOfYear = getDayOfYear(date);
  const index = ((dayOfYear - 1) % 365);
  return devocionales365[index];
}

export function getHistorialDevocionales(daysBack: number = 30, fromDate: Date = new Date()): Devocional365[] {
  const result: Devocional365[] = [];
  for (let i = 1; i <= daysBack; i++) {
    const pastDate = new Date(fromDate);
    pastDate.setDate(pastDate.getDate() - i);
    result.push(getDevocionalDelDia(pastDate));
  }
  return result;
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
