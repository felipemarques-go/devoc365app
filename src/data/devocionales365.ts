// 365 Devotionals data structure
export interface Devocional365 {
  id: number;
  titulo: string;
  versiculo: string;
  cita: string;
  reflexion: string;
  oracion: string;
}

// Helper function to get day of year (1-365)
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Helper function to get today's devotional
export function getDevocionalDelDia(date: Date = new Date()): Devocional365 {
  const dayOfYear = getDayOfYear(date);
  const index = ((dayOfYear - 1) % 365);
  return devocionales365[index];
}

// Helper function to get past devotionals for history
export function getHistorialDevocionales(daysBack: number = 30, fromDate: Date = new Date()): Devocional365[] {
  const result: Devocional365[] = [];
  for (let i = 1; i <= daysBack; i++) {
    const pastDate = new Date(fromDate);
    pastDate.setDate(pastDate.getDate() - i);
    result.push(getDevocionalDelDia(pastDate));
  }
  return result;
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

// The 365 devotionals array
export const devocionales365: Devocional365[] = [
  // Real devotionals (1-10)
  {
    id: 1,
    titulo: "Confianza en tiempos de incertidumbre",
    versiculo: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios. Te fortaleceré, ciertamente te ayudaré, sí, te sostendré con la diestra de mi justicia."',
    cita: "Isaías 41:10",
    reflexion: `En medio de las tormentas de la vida, Dios nos recuerda que no estamos solos. Este versículo es una promesa poderosa que nos asegura Su presencia constante.

Cuando enfrentamos situaciones que nos superan, cuando el futuro parece incierto, Dios nos dice: "No temas". No es una sugerencia, es un mandato lleno de amor, porque Él sabe que tiene el control de todas las cosas.

Hoy, te invito a soltar esas preocupaciones que pesan en tu corazón. Dios no solo está contigo, sino que te fortalece, te ayuda y te sostiene. Su mano derecha es firme y segura.`,
    oracion: "Señor, gracias por Tu promesa de estar siempre conmigo. En este día, elijo confiar en Ti más que en mis miedos. Fortalece mi fe y ayúdame a recordar que Tú tienes el control. Te entrego mis preocupaciones y descanso en Tu amor. Amén."
  },
  {
    id: 2,
    titulo: "Paz en medio del caos",
    versiculo: '"La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo."',
    cita: "Juan 14:27",
    reflexion: `La paz que Jesús ofrece no depende de las circunstancias externas. Es una paz profunda que permanece incluso cuando todo a nuestro alrededor parece desmoronarse.

El mundo nos ofrece una paz temporal, basada en cosas materiales o situaciones favorables. Pero la paz de Cristo es diferente: es eterna, constante y no puede ser robada por ninguna adversidad.

Hoy, sin importar lo que estés enfrentando, puedes experimentar esa paz. Solo necesitas abrir tu corazón y permitir que Jesús calme tus temores.`,
    oracion: "Padre celestial, llena mi corazón con Tu paz sobrenatural. Ayúdame a mantener la calma en medio de las tormentas de la vida. Confío en que Tú estás en control. Amén."
  },
  {
    id: 3,
    titulo: "Gratitud en cada momento",
    versiculo: '"Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús."',
    cita: "1 Tesalonicenses 5:18",
    reflexion: `La gratitud transforma nuestra perspectiva. Cuando elegimos agradecer, aun en las dificultades, abrimos nuestro corazón a ver la mano de Dios trabajando.

No siempre es fácil dar gracias, especialmente cuando atravesamos momentos difíciles. Pero la gratitud no depende de nuestras circunstancias, sino de nuestra decisión de reconocer la bondad de Dios.

Cada día trae nuevas misericordias. Hoy, toma un momento para agradecer por las pequeñas y grandes bendiciones en tu vida.`,
    oracion: "Señor, te doy gracias por cada bendición en mi vida. Enséñame a tener un corazón agradecido en toda circunstancia, reconociendo Tu bondad cada día. Amén."
  },
  {
    id: 4,
    titulo: "Renovando las fuerzas",
    versiculo: '"Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán."',
    cita: "Isaías 40:31",
    reflexion: `Cuando nos sentimos agotados física, emocional o espiritualmente, Dios promete renovar nuestras fuerzas. Solo necesitamos esperar en Él con fe y paciencia.

Esperar en el Señor no significa quedarnos pasivos. Significa confiar activamente en Sus tiempos y Sus caminos, sabiendo que Él trabaja incluso cuando no lo vemos.

Hoy, si te sientes cansado, recuerda que Dios tiene fuerzas nuevas para ti. Solo necesitas acudir a Él.`,
    oracion: "Dios de toda fortaleza, renueva mi espíritu hoy. Dame alas para volar por encima de mis circunstancias y fuerzas para seguir adelante. Confío en Ti. Amén."
  },
  {
    id: 5,
    titulo: "El poder de la oración",
    versiculo: '"Orad sin cesar."',
    cita: "1 Tesalonicenses 5:17",
    reflexion: `La oración es nuestra línea directa con Dios. No necesitamos palabras perfectas, solo un corazón sincero que busca Su presencia.

Orar sin cesar no significa estar de rodillas todo el día, sino mantener una actitud constante de comunión con Dios. Es hablar con Él mientras trabajamos, caminamos, o realizamos nuestras actividades diarias.

La oración nos conecta con la fuente de toda sabiduría y poder. Hoy, cultiva ese diálogo continuo con tu Padre celestial.`,
    oracion: "Padre, enséñame a orar constantemente, a mantener una conversación continua contigo durante todo el día. Quiero vivir consciente de Tu presencia. Amén."
  },
  {
    id: 6,
    titulo: "Amor incondicional",
    versiculo: '"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."',
    cita: "Juan 3:16",
    reflexion: `El amor de Dios no tiene condiciones ni límites. Él nos amó primero, incluso cuando no lo merecíamos, y envió a Su Hijo para darnos vida eterna.

Este amor no depende de nuestros logros o fracasos. Es un amor perfecto que nos acepta tal como somos, mientras nos transforma en quienes debemos ser.

Hoy, recibe este amor incondicional y permite que llene cada área de tu vida.`,
    oracion: "Gracias, Señor, por Tu amor infinito. Ayúdame a comprender la profundidad de Tu gracia y a compartir ese amor con quienes me rodean. Amén."
  },
  {
    id: 7,
    titulo: "Caminando por fe",
    versiculo: '"Porque por fe andamos, no por vista."',
    cita: "2 Corintios 5:7",
    reflexion: `La fe nos permite avanzar incluso cuando no podemos ver el camino completo. Confiar en Dios significa dar pasos aunque no tengamos todas las respuestas.

Caminar por fe es un acto de valentía. Es decidir creer en las promesas de Dios por encima de lo que nuestros ojos pueden ver o nuestra mente puede comprender.

Hoy, da ese paso de fe que has estado posponiendo. Dios va delante de ti, preparando el camino.`,
    oracion: "Señor, aumenta mi fe. Dame el valor para caminar confiando en Ti, aunque no pueda ver lo que viene. Sé que Tú guías mis pasos. Amén."
  },
  {
    id: 8,
    titulo: "La bondad de Dios",
    versiculo: '"Gustad, y ved que es bueno Jehová; dichoso el hombre que confía en él."',
    cita: "Salmos 34:8",
    reflexion: `La bondad de Dios es algo que debemos experimentar personalmente. No basta con escuchar sobre ella; necesitamos vivirla en nuestra propia vida.

Cuando confiamos en el Señor, descubrimos que Su bondad nos rodea cada día. Está presente en las pequeñas bendiciones y en las grandes victorias.

Hoy, abre tus ojos para ver la bondad de Dios manifestada en tu vida.`,
    oracion: "Padre bueno, gracias por Tu bondad que me rodea cada día. Abre mis ojos para reconocer Tus bendiciones y mi corazón para confiar plenamente en Ti. Amén."
  },
  {
    id: 9,
    titulo: "Perdón y libertad",
    versiculo: '"Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad."',
    cita: "1 Juan 1:9",
    reflexion: `El perdón de Dios es completo y liberador. Cuando confesamos nuestros pecados, Él nos limpia y nos da un nuevo comienzo.

No hay pecado demasiado grande para Su gracia ni error que Su amor no pueda cubrir. El perdón nos libera de la culpa y nos permite avanzar con libertad.

Hoy, si hay algo que pesa en tu corazón, acércate a Dios con humildad. Él está listo para perdonarte y restaurarte.`,
    oracion: "Señor, confieso mis faltas ante Ti. Gracias por Tu perdón que me limpia y me da libertad. Ayúdame a perdonarme a mí mismo y a perdonar a otros. Amén."
  },
  {
    id: 10,
    titulo: "Propósito divino",
    versiculo: '"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."',
    cita: "Jeremías 29:11",
    reflexion: `Dios tiene un propósito específico para tu vida. Sus planes para ti son de bien, de esperanza y de un futuro lleno de promesas.

Aunque a veces no entendamos por qué atravesamos ciertas situaciones, podemos confiar en que Dios está trabajando todas las cosas para nuestro bien.

Hoy, descansa en la certeza de que el Creador del universo tiene planes maravillosos para ti.`,
    oracion: "Padre, gracias porque tienes un propósito para mi vida. Ayúdame a confiar en Tus planes, sabiendo que son mejores que los míos. Guíame en Tu voluntad. Amén."
  },
  // Generate placeholders for days 11-365
  ...Array.from({ length: 355 }, (_, i) => {
    const dayNum = i + 11;
    const themes = [
      { tema: "La fidelidad de Dios", versiculo: "Grande es tu fidelidad", cita: "Lamentaciones 3:23" },
      { tema: "Sabiduría divina", versiculo: "Si alguno de vosotros tiene falta de sabiduría, pídala a Dios", cita: "Santiago 1:5" },
      { tema: "El gozo del Señor", versiculo: "El gozo del Señor es vuestra fuerza", cita: "Nehemías 8:10" },
      { tema: "Confianza plena", versiculo: "Confía en Jehová con todo tu corazón", cita: "Proverbios 3:5" },
      { tema: "Amor al prójimo", versiculo: "Amarás a tu prójimo como a ti mismo", cita: "Marcos 12:31" },
      { tema: "La presencia de Dios", versiculo: "No te desampararé, ni te dejaré", cita: "Hebreos 13:5" },
      { tema: "Nuevo comienzo", versiculo: "De modo que si alguno está en Cristo, nueva criatura es", cita: "2 Corintios 5:17" },
      { tema: "Fortaleza interior", versiculo: "Todo lo puedo en Cristo que me fortalece", cita: "Filipenses 4:13" },
      { tema: "Esperanza viva", versiculo: "Y la esperanza no avergüenza", cita: "Romanos 5:5" },
      { tema: "Descanso en Dios", versiculo: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar", cita: "Mateo 11:28" },
      { tema: "Fe inquebrantable", versiculo: "Es, pues, la fe la certeza de lo que se espera", cita: "Hebreos 11:1" },
      { tema: "Protección divina", versiculo: "El ángel de Jehová acampa alrededor de los que le temen", cita: "Salmos 34:7" },
    ];
    const themeIndex = (dayNum - 1) % themes.length;
    const theme = themes[themeIndex];
    
    return {
      id: dayNum,
      titulo: theme.tema,
      versiculo: `"${theme.versiculo}..."`,
      cita: theme.cita,
      reflexion: `Reflexión del día ${dayNum}: ${theme.tema}. Este es un recordatorio de que Dios está contigo en cada momento. Medita en Su Palabra y permite que transforme tu corazón hoy.\n\nCada día es una nueva oportunidad para acercarte más a Dios y experimentar Su amor. Toma un momento para reflexionar sobre cómo puedes aplicar este versículo en tu vida diaria.`,
      oracion: `Señor, en este día ${dayNum} de mi caminar contigo, te pido que me ayudes a vivir según Tu Palabra. Que ${theme.tema.toLowerCase()} sea una realidad en mi vida. Te amo y confío en Ti. Amén.`
    };
  })
];
