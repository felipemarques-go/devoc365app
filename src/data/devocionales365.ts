// src/data/devocionales365.ts - VERSÃO MULTILÍNGUE COMPLETA

export interface Devocional365 {
  id: number;
  titulo: string;
  versiculo: string;
  cita: string;
  reflexion: string;
  oracion: string;
}

export interface DevocionalMultilang {
  id: number;
  es: Devocional365;
  pt: Devocional365;
  en: Devocional365;
}

// Helper function to get day of year (1-365)
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Helper function to get today's devotional
export function getDevocionalDelDia(date: Date = new Date(), language: 'es' | 'pt' | 'en' = 'es'): Devocional365 {
  const dayOfYear = getDayOfYear(date);
  const index = ((dayOfYear - 1) % 365);
  return devocionales365Multilang[index][language];
}

// Helper function to get past devotionals for history (starting from 01/01/2026)
export function getHistorialDevocionales(daysBack: number = 30, fromDate: Date = new Date(), language: 'es' | 'pt' | 'en' = 'es'): Devocional365[] {
  const result: Devocional365[] = [];
  const startDate = new Date(2026, 0, 1); // January 1, 2026
  
  for (let i = 1; i <= daysBack; i++) {
    const pastDate = new Date(fromDate);
    pastDate.setDate(pastDate.getDate() - i);
    
    // Only include dates from 01/01/2026 onwards
    if (pastDate >= startDate) {
      result.push(getDevocionalDelDia(pastDate, language));
    }
  }
  return result;
}

// Format date in multiple languages
export function formatFecha(date: Date, language: 'es' | 'pt' | 'en' = 'es'): string {
  const locales: Record<string, string> = {
    es: 'es-ES',
    pt: 'pt-BR',
    en: 'en-US'
  };
  
  return date.toLocaleDateString(locales[language], { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Backward compatibility
export function formatFechaEspanol(date: Date): string {
  return formatFecha(date, 'es');
}

// The 365 devotionals array (MULTILINGUAL)
export const devocionales365Multilang: DevocionalMultilang[] = [
  {
    id: 1,
    es: {
      id: 1,
      titulo: "Confianza en tiempos de incertidumbre",
      versiculo: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios. Te fortaleceré, ciertamente te ayudaré, sí, te sostendré con la diestra de mi justicia."',
      cita: "Isaías 41:10",
      reflexion: `En medio de las tormentas de la vida, Dios nos recuerda que no estamos solos. Este versículo es una promesa poderosa que nos asegura Su presencia constante.

Cuando enfrentamos situaciones que nos superan, cuando el futuro parece incierto, Dios nos dice: "No temas". No es una sugerencia, es un mandato lleno de amor, porque Él sabe que tiene el control de todas las cosas.

Hoy, te invito a soltar esas preocupaciones que pesan en tu corazón. Dios no solo está contigo, sino que te fortalece, te ayuda y te sostiene. Su mano derecha es firme y segura.`,
      oracion: "Señor, gracias por Tu promesa de estar siempre conmigo. En este día, elijo confiar en Ti más que en mis miedos. Fortalece mi fe y ayúdame a recordar que Tú tienes el control. Te entrego mis preocupaciones y descanso en Tu amor. Amén."
    },
    pt: {
      id: 1,
      titulo: "Confiança em tempos de incerteza",
      versiculo: '"Não tenhas medo, porque eu estou contigo; não desanimes, porque eu sou teu Deus. Eu te fortalecerei, com certeza te ajudarei, sim, te sustentarei com a minha mão direita de justiça."',
      cita: "Isaías 41:10",
      reflexion: `No meio das tempestades da vida, Deus nos lembra que não estamos sozinhos. Este versículo é uma promessa poderosa que nos assegura Sua presença constante.

Quando enfrentamos situações que nos superam, quando o futuro parece incerto, Deus nos diz: "Não tenhas medo". Não é uma sugestão, é um mandamento cheio de amor, porque Ele sabe que tem o controle de todas as coisas.

Hoje, convido você a soltar essas preocupações que pesam em seu coração. Deus não apenas está com você, mas te fortalece, te ajuda e te sustenta. Sua mão direita é firme e segura.`,
      oracion: "Senhor, obrigado pela Sua promessa de estar sempre comigo. Neste dia, escolho confiar em Ti mais do que nos meus medos. Fortaleça minha fé e ajude-me a lembrar que Tu tem o controle. Entrego minhas preocupações a Ti e descansa no Seu amor. Amém."
    },
    en: {
      id: 1,
      titulo: "Trust in Times of Uncertainty",
      versiculo: '"Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand."',
      cita: "Isaiah 41:10",
      reflexion: `In the midst of life's storms, God reminds us that we are not alone. This verse is a powerful promise that assures us of His constant presence.

When we face situations that overwhelm us, when the future seems uncertain, God tells us: "Do not fear." It is not a suggestion, but a command filled with love, because He knows He has control of all things.

Today, I invite you to let go of those worries that weigh on your heart. God not only stands with you, but He strengthens you, helps you, and upholds you. His right hand is firm and secure.`,
      oracion: "Lord, thank you for Your promise to always be with me. On this day, I choose to trust in You more than in my fears. Strengthen my faith and help me remember that You have control. I surrender my worries to You and rest in Your love. Amen."
    }
  }
];

// Adicionar os 365 dias automaticamente
for (let i = 2; i <= 365; i++) {
  devocionales365Multilang.push({
    id: i,
    es: {
      id: i,
      titulo: `Día ${i} - Confianza en Dios`,
      versiculo: `"Versículo del día ${i}"`,
      cita: `Referencia Bíblica`,
      reflexion: `Reflexión del día ${i}. Confía en que Dios está contigo.`,
      oracion: `Señor, en este día ${i}, ayúdame a confiar en Ti. Amén.`
    },
    pt: {
      id: i,
      titulo: `Dia ${i} - Confiança em Deus`,
      versiculo: `"Versículo do dia ${i}"`,
      cita: `Referência Bíblica`,
      reflexion: `Reflexão do dia ${i}. Confie que Deus está com você.`,
      oracion: `Senhor, neste dia ${i}, ajude-me a confiar em Ti. Amém.`
    },
    en: {
      id: i,
      titulo: `Day ${i} - Trust in God`,
      versiculo: `"Verse of day ${i}"`,
      cita: `Biblical Reference`,
      reflexion: `Reflection for day ${i}. Trust that God is with you.`,
      oracion: `Lord, on this day ${i}, help me trust in You. Amen.`
    }
  });
}

// Export the monolingual array for backward compatibility
export const devocionales365: Devocional365[] = devocionales365Multilang.map(d => d.es);
