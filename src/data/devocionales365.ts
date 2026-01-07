import { Language } from '@/context/LanguageContext';

export interface DevocionalMultilang {
  id: number;
  titulo: { es: string; pt: string; en: string };
  versiculo: { es: string; pt: string; en: string };
  cita: { es: string; pt: string; en: string };
  reflexion: { es: string; pt: string; en: string };
  oracion: { es: string; pt: string; en: string };
}

export interface Devocional365 {
  id: number;
  titulo: string;
  versiculo: string;
  cita: string;
  reflexion: string;
  oracion: string;
}

// Helper function to get day of year
export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Format date based on language
export function formatFecha(date: Date, language: Language = 'es'): string {
  const locales = { es: 'es-ES', pt: 'pt-BR', en: 'en-US' };
  return date.toLocaleDateString(locales[language], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Legacy Spanish format
export function formatFechaEspanol(date: Date): string {
  return formatFecha(date, 'es');
}

// Base devotionals with full multilingual content (first 10 days)
const devocionalBaseMultilang: DevocionalMultilang[] = [
  {
    id: 1,
    titulo: {
      es: 'Confianza en tiempos de incertidumbre',
      pt: 'Confiança em tempos de incerteza',
      en: 'Trust in times of uncertainty'
    },
    versiculo: {
      es: '"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios. Te fortaleceré, ciertamente te ayudaré, sí, te sostendré con la diestra de mi justicia."',
      pt: '"Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel."',
      en: '"Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, I will help you, I will uphold you with my righteous right hand."'
    },
    cita: { es: 'Isaías 41:10', pt: 'Isaías 41:10', en: 'Isaiah 41:10' },
    reflexion: {
      es: `En medio de las tormentas de la vida, Dios nos recuerda que no estamos solos. Este versículo es una promesa poderosa que nos asegura Su presencia constante.

Cuando enfrentamos situaciones que nos superan, cuando el futuro parece incierto, Dios nos dice: "No temas". No es una sugerencia, es un mandato lleno de amor, porque Él sabe que tiene el control de todas las cosas.

Hoy, te invito a soltar esas preocupaciones que pesan en tu corazón. Dios no solo está contigo, sino que te fortalece, te ayuda y te sostiene. Su mano derecha es firme y segura.`,
      pt: `Em meio às tempestades da vida, Deus nos lembra que não estamos sozinhos. Este versículo é uma promessa poderosa que nos assegura Sua presença constante.

Quando enfrentamos situações que nos superam, quando o futuro parece incerto, Deus nos diz: "Não temas". Não é uma sugestão, é um mandamento cheio de amor, porque Ele sabe que tem o controle de todas as coisas.

Hoje, te convido a soltar essas preocupações que pesam em seu coração. Deus não só está contigo, mas te fortalece, te ajuda e te sustenta. Sua mão direita é firme e segura.`,
      en: `In the midst of life's storms, God reminds us that we are not alone. This verse is a powerful promise that assures us of His constant presence.

When we face situations that overwhelm us, when the future seems uncertain, God tells us: "Fear not." It is not a suggestion, it is a command full of love, because He knows He is in control of all things.

Today, I invite you to release those worries that weigh on your heart. God is not only with you, but He strengthens you, helps you, and sustains you. His right hand is firm and secure.`
    },
    oracion: {
      es: 'Señor, gracias por Tu promesa de estar siempre conmigo. En este día, elijo confiar en Ti más que en mis miedos. Fortalece mi fe y ayúdame a recordar que Tú tienes el control. Te entrego mis preocupaciones y descanso en Tu amor. Amén.',
      pt: 'Senhor, obrigado pela Tua promessa de estar sempre comigo. Neste dia, escolho confiar em Ti mais do que nos meus medos. Fortalece minha fé e ajuda-me a lembrar que Tu tens o controle. Entrego-Te minhas preocupações e descanso no Teu amor. Amém.',
      en: 'Lord, thank You for Your promise to always be with me. Today, I choose to trust You more than my fears. Strengthen my faith and help me remember that You are in control. I surrender my worries and rest in Your love. Amen.'
    }
  },
  {
    id: 2,
    titulo: {
      es: 'Paz en medio del caos',
      pt: 'Paz em meio ao caos',
      en: 'Peace in the midst of chaos'
    },
    versiculo: {
      es: '"La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo."',
      pt: '"Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize."',
      en: '"Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."'
    },
    cita: { es: 'Juan 14:27', pt: 'João 14:27', en: 'John 14:27' },
    reflexion: {
      es: 'La paz que Jesús ofrece no depende de las circunstancias externas. Es una paz profunda que permanece incluso cuando todo a nuestro alrededor parece desmoronarse.',
      pt: 'A paz que Jesus oferece não depende das circunstâncias externas. É uma paz profunda que permanece mesmo quando tudo ao nosso redor parece desmoronar.',
      en: 'The peace that Jesus offers does not depend on external circumstances. It is a deep peace that remains even when everything around us seems to be falling apart.'
    },
    oracion: {
      es: 'Padre celestial, llena mi corazón con Tu paz sobrenatural. Ayúdame a mantener la calma en medio de las tormentas de la vida. Amén.',
      pt: 'Pai celestial, enche meu coração com Tua paz sobrenatural. Ajuda-me a manter a calma em meio às tempestades da vida. Amém.',
      en: 'Heavenly Father, fill my heart with Your supernatural peace. Help me to remain calm in the midst of life\'s storms. Amen.'
    }
  },
  {
    id: 3,
    titulo: {
      es: 'Gratitud en cada momento',
      pt: 'Gratidão em cada momento',
      en: 'Gratitude in every moment'
    },
    versiculo: {
      es: '"Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús."',
      pt: '"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco."',
      en: '"Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus."'
    },
    cita: { es: '1 Tesalonicenses 5:18', pt: '1 Tessalonicenses 5:18', en: '1 Thessalonians 5:18' },
    reflexion: {
      es: 'La gratitud transforma nuestra perspectiva. Cuando elegimos agradecer, aun en las dificultades, abrimos nuestro corazón a ver la mano de Dios trabajando.',
      pt: 'A gratidão transforma nossa perspectiva. Quando escolhemos agradecer, mesmo nas dificuldades, abrimos nosso coração para ver a mão de Deus trabalhando.',
      en: 'Gratitude transforms our perspective. When we choose to give thanks, even in difficulties, we open our hearts to see God\'s hand at work.'
    },
    oracion: {
      es: 'Señor, te doy gracias por cada bendición en mi vida. Enséñame a tener un corazón agradecido en toda circunstancia. Amén.',
      pt: 'Senhor, agradeço-Te por cada bênção em minha vida. Ensina-me a ter um coração agradecido em toda circunstância. Amém.',
      en: 'Lord, I thank You for every blessing in my life. Teach me to have a grateful heart in every circumstance. Amen.'
    }
  },
  {
    id: 4,
    titulo: {
      es: 'Renovando las fuerzas',
      pt: 'Renovando as forças',
      en: 'Renewing strength'
    },
    versiculo: {
      es: '"Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas."',
      pt: '"Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias."',
      en: '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles."'
    },
    cita: { es: 'Isaías 40:31', pt: 'Isaías 40:31', en: 'Isaiah 40:31' },
    reflexion: {
      es: 'Cuando nos sentimos agotados, Dios promete renovar nuestras fuerzas. Solo necesitamos esperar en Él con fe y paciencia.',
      pt: 'Quando nos sentimos esgotados, Deus promete renovar nossas forças. Só precisamos esperar nEle com fé e paciência.',
      en: 'When we feel exhausted, God promises to renew our strength. We just need to wait on Him with faith and patience.'
    },
    oracion: {
      es: 'Dios de toda fortaleza, renueva mi espíritu. Dame alas para volar por encima de mis circunstancias. Amén.',
      pt: 'Deus de toda fortaleza, renova meu espírito. Dá-me asas para voar acima das minhas circunstâncias. Amém.',
      en: 'God of all strength, renew my spirit. Give me wings to soar above my circumstances. Amen.'
    }
  },
  {
    id: 5,
    titulo: {
      es: 'El poder de la oración',
      pt: 'O poder da oração',
      en: 'The power of prayer'
    },
    versiculo: {
      es: '"Orad sin cesar."',
      pt: '"Orai sem cessar."',
      en: '"Pray without ceasing."'
    },
    cita: { es: '1 Tesalonicenses 5:17', pt: '1 Tessalonicenses 5:17', en: '1 Thessalonians 5:17' },
    reflexion: {
      es: 'La oración es nuestra línea directa con Dios. No necesitamos palabras perfectas, solo un corazón sincero que busca Su presencia.',
      pt: 'A oração é nossa linha direta com Deus. Não precisamos de palavras perfeitas, apenas um coração sincero que busca Sua presença.',
      en: 'Prayer is our direct line to God. We don\'t need perfect words, just a sincere heart that seeks His presence.'
    },
    oracion: {
      es: 'Padre, enséñame a orar constantemente, a mantener una conversación continua contigo durante todo el día. Amén.',
      pt: 'Pai, ensina-me a orar constantemente, a manter uma conversa contínua contigo durante todo o dia. Amém.',
      en: 'Father, teach me to pray constantly, to maintain a continuous conversation with You throughout the day. Amen.'
    }
  },
  {
    id: 6,
    titulo: {
      es: 'Fe que mueve montañas',
      pt: 'Fé que move montanhas',
      en: 'Faith that moves mountains'
    },
    versiculo: {
      es: '"Porque de cierto os digo, que si tuviereis fe como un grano de mostaza, diréis a este monte: Pásate de aquí allá, y se pasará."',
      pt: '"Porque em verdade vos digo que, se tiverdes fé como um grão de mostaza, direis a este monte: Passa daqui para acolá, e ele passará."',
      en: '"Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, \'Move from here to there,\' and it will move."'
    },
    cita: { es: 'Mateo 17:20', pt: 'Mateus 17:20', en: 'Matthew 17:20' },
    reflexion: {
      es: 'Dios no busca una fe perfecta, sino una fe sincera. Aun la fe más pequeña puede obrar maravillas cuando está puesta en un Dios todopoderoso.',
      pt: 'Deus não busca uma fé perfeita, mas uma fé sincera. Mesmo a menor fé pode fazer maravilhas quando está colocada em um Deus todo-poderoso.',
      en: 'God doesn\'t look for perfect faith, but sincere faith. Even the smallest faith can work wonders when placed in an almighty God.'
    },
    oracion: {
      es: 'Señor, aumenta mi fe. Ayúdame a confiar en Ti incluso cuando las circunstancias parecen imposibles. Amén.',
      pt: 'Senhor, aumenta minha fé. Ajuda-me a confiar em Ti mesmo quando as circunstâncias parecem impossíveis. Amém.',
      en: 'Lord, increase my faith. Help me to trust You even when circumstances seem impossible. Amen.'
    }
  },
  {
    id: 7,
    titulo: {
      es: 'El amor que transforma',
      pt: 'O amor que transforma',
      en: 'Love that transforms'
    },
    versiculo: {
      es: '"El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso."',
      pt: '"O amor é paciente, é bondoso. O amor não inveja, não se vangloria, não se orgulha."',
      en: '"Love is patient, love is kind. It does not envy, it does not boast, it is not proud."'
    },
    cita: { es: '1 Corintios 13:4', pt: '1 Coríntios 13:4', en: '1 Corinthians 13:4' },
    reflexion: {
      es: 'El amor verdadero es una elección diaria. Dios nos llama a amar como Él nos ama: sin condiciones, con paciencia y bondad.',
      pt: 'O amor verdadeiro é uma escolha diária. Deus nos chama a amar como Ele nos ama: sem condições, com paciência e bondade.',
      en: 'True love is a daily choice. God calls us to love as He loves us: unconditionally, with patience and kindness.'
    },
    oracion: {
      es: 'Padre, lléname de Tu amor. Que pueda amar a otros como Tú me amas. Amén.',
      pt: 'Pai, enche-me do Teu amor. Que eu possa amar os outros como Tu me amas. Amém.',
      en: 'Father, fill me with Your love. May I love others as You love me. Amen.'
    }
  },
  {
    id: 8,
    titulo: {
      es: 'Propósito divino',
      pt: 'Propósito divino',
      en: 'Divine purpose'
    },
    versiculo: {
      es: '"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."',
      pt: '"Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais."',
      en: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."'
    },
    cita: { es: 'Jeremías 29:11', pt: 'Jeremias 29:11', en: 'Jeremiah 29:11' },
    reflexion: {
      es: 'Dios tiene un plan perfecto para tu vida. Aun en los momentos de duda, recuerda que Sus pensamientos hacia ti son de bien.',
      pt: 'Deus tem um plano perfeito para sua vida. Mesmo nos momentos de dúvida, lembre-se de que Seus pensamentos para você são de bem.',
      en: 'God has a perfect plan for your life. Even in moments of doubt, remember that His thoughts toward you are good.'
    },
    oracion: {
      es: 'Señor, confío en Tu plan para mi vida. Guía mis pasos y muéstrame Tu propósito. Amén.',
      pt: 'Senhor, confio no Teu plano para minha vida. Guia meus passos e mostra-me Teu propósito. Amém.',
      en: 'Lord, I trust in Your plan for my life. Guide my steps and show me Your purpose. Amen.'
    }
  },
  {
    id: 9,
    titulo: {
      es: 'Descanso en el Señor',
      pt: 'Descanso no Senhor',
      en: 'Rest in the Lord'
    },
    versiculo: {
      es: '"Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."',
      pt: '"Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei."',
      en: '"Come to me, all you who are weary and burdened, and I will give you rest."'
    },
    cita: { es: 'Mateo 11:28', pt: 'Mateus 11:28', en: 'Matthew 11:28' },
    reflexion: {
      es: 'Jesús nos invita a encontrar descanso en Él. No tenemos que cargar solos el peso de la vida; Él quiere llevarlo por nosotros.',
      pt: 'Jesus nos convida a encontrar descanso nEle. Não precisamos carregar sozinhos o peso da vida; Ele quer levá-lo por nós.',
      en: 'Jesus invites us to find rest in Him. We don\'t have to carry the weight of life alone; He wants to carry it for us.'
    },
    oracion: {
      es: 'Jesús, vengo a Ti cansado y agotado. Dame Tu descanso y paz. Amén.',
      pt: 'Jesus, venho a Ti cansado e esgotado. Dá-me Teu descanso e paz. Amém.',
      en: 'Jesus, I come to You weary and burdened. Give me Your rest and peace. Amen.'
    }
  },
  {
    id: 10,
    titulo: {
      es: 'Luz en la oscuridad',
      pt: 'Luz na escuridão',
      en: 'Light in the darkness'
    },
    versiculo: {
      es: '"Lámpara es a mis pies tu palabra, y lumbrera a mi camino."',
      pt: '"Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho."',
      en: '"Your word is a lamp for my feet, a light on my path."'
    },
    cita: { es: 'Salmos 119:105', pt: 'Salmos 119:105', en: 'Psalm 119:105' },
    reflexion: {
      es: 'La Palabra de Dios ilumina nuestro camino. En momentos de confusión, la Biblia nos guía hacia la verdad y la vida.',
      pt: 'A Palavra de Deus ilumina nosso caminho. Em momentos de confusão, a Bíblia nos guia para a verdade e a vida.',
      en: 'God\'s Word illuminates our path. In moments of confusion, the Bible guides us toward truth and life.'
    },
    oracion: {
      es: 'Señor, que Tu Palabra sea mi guía diaria. Ilumina mi camino con Tu verdad. Amén.',
      pt: 'Senhor, que Tua Palavra seja meu guia diário. Ilumina meu caminho com Tua verdade. Amém.',
      en: 'Lord, may Your Word be my daily guide. Illuminate my path with Your truth. Amen.'
    }
  }
];

// Themes for generating remaining devotionals
const themesMultilang = [
  {
    tema: { es: 'Fe y confianza', pt: 'Fé e confiança', en: 'Faith and trust' },
    versiculo: {
      es: '"Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia."',
      pt: '"Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento."',
      en: '"Trust in the Lord with all your heart and lean not on your own understanding."'
    },
    cita: { es: 'Proverbios 3:5', pt: 'Provérbios 3:5', en: 'Proverbs 3:5' }
  },
  {
    tema: { es: 'Amor y compasión', pt: 'Amor e compaixão', en: 'Love and compassion' },
    versiculo: {
      es: '"Amaos los unos a los otros como yo os he amado."',
      pt: '"Amai-vos uns aos outros como eu vos amei."',
      en: '"Love one another as I have loved you."'
    },
    cita: { es: 'Juan 15:12', pt: 'João 15:12', en: 'John 15:12' }
  },
  {
    tema: { es: 'Esperanza', pt: 'Esperança', en: 'Hope' },
    versiculo: {
      es: '"El Señor es mi porción, dice mi alma; por eso en Él esperaré."',
      pt: '"O Senhor é a minha porção, diz a minha alma; portanto esperarei nele."',
      en: '"The Lord is my portion, says my soul; therefore I will hope in him."'
    },
    cita: { es: 'Lamentaciones 3:24', pt: 'Lamentações 3:24', en: 'Lamentations 3:24' }
  },
  {
    tema: { es: 'Fortaleza', pt: 'Fortaleza', en: 'Strength' },
    versiculo: {
      es: '"Todo lo puedo en Cristo que me fortalece."',
      pt: '"Posso todas as coisas naquele que me fortalece."',
      en: '"I can do all things through Christ who strengthens me."'
    },
    cita: { es: 'Filipenses 4:13', pt: 'Filipenses 4:13', en: 'Philippians 4:13' }
  },
  {
    tema: { es: 'Paz interior', pt: 'Paz interior', en: 'Inner peace' },
    versiculo: {
      es: '"Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones."',
      pt: '"E a paz de Deus, que excede todo o entendimento, guardará os vossos corações."',
      en: '"And the peace of God, which transcends all understanding, will guard your hearts."'
    },
    cita: { es: 'Filipenses 4:7', pt: 'Filipenses 4:7', en: 'Philippians 4:7' }
  },
  {
    tema: { es: 'Gratitud', pt: 'Gratidão', en: 'Gratitude' },
    versiculo: {
      es: '"Den gracias al Señor porque Él es bueno; su amor es eterno."',
      pt: '"Rendei graças ao Senhor porque ele é bom; o seu amor dura para sempre."',
      en: '"Give thanks to the Lord for he is good; his love endures forever."'
    },
    cita: { es: 'Salmos 136:1', pt: 'Salmos 136:1', en: 'Psalm 136:1' }
  },
  {
    tema: { es: 'Sabiduría', pt: 'Sabedoria', en: 'Wisdom' },
    versiculo: {
      es: '"Si alguno de vosotros tiene falta de sabiduría, pídala a Dios."',
      pt: '"Se algum de vós tem falta de sabedoria, peça-a a Deus."',
      en: '"If any of you lacks wisdom, you should ask God."'
    },
    cita: { es: 'Santiago 1:5', pt: 'Tiago 1:5', en: 'James 1:5' }
  },
  {
    tema: { es: 'Perseverancia', pt: 'Perseverança', en: 'Perseverance' },
    versiculo: {
      es: '"Mas el que persevere hasta el fin, éste será salvo."',
      pt: '"Mas aquele que perseverar até ao fim será salvo."',
      en: '"But the one who perseveres to the end will be saved."'
    },
    cita: { es: 'Mateo 24:13', pt: 'Mateus 24:13', en: 'Matthew 24:13' }
  },
  {
    tema: { es: 'Gozo', pt: 'Alegria', en: 'Joy' },
    versiculo: {
      es: '"Estad siempre gozosos. Orad sin cesar. Dad gracias en todo."',
      pt: '"Regozijai-vos sempre. Orai sem cessar. Em tudo dai graças."',
      en: '"Rejoice always, pray continually, give thanks in all circumstances."'
    },
    cita: { es: '1 Tesalonicenses 5:16-18', pt: '1 Tessalonicenses 5:16-18', en: '1 Thessalonians 5:16-18' }
  },
  {
    tema: { es: 'Perdón', pt: 'Perdão', en: 'Forgiveness' },
    versiculo: {
      es: '"Perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores."',
      pt: '"Perdoa-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores."',
      en: '"Forgive us our debts, as we also have forgiven our debtors."'
    },
    cita: { es: 'Mateo 6:12', pt: 'Mateus 6:12', en: 'Matthew 6:12' }
  },
  {
    tema: { es: 'Provisión divina', pt: 'Provisão divina', en: 'Divine provision' },
    versiculo: {
      es: '"Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria."',
      pt: '"O meu Deus suprirá todas as vossas necessidades segundo as suas riquezas na glória."',
      en: '"And my God will meet all your needs according to the riches of his glory."'
    },
    cita: { es: 'Filipenses 4:19', pt: 'Filipenses 4:19', en: 'Philippians 4:19' }
  },
  {
    tema: { es: 'Protección', pt: 'Proteção', en: 'Protection' },
    versiculo: {
      es: '"El ángel de Jehová acampa alrededor de los que le temen, y los defiende."',
      pt: '"O anjo do Senhor acampa-se ao redor dos que o temem, e os livra."',
      en: '"The angel of the Lord encamps around those who fear him, and he delivers them."'
    },
    cita: { es: 'Salmos 34:7', pt: 'Salmos 34:7', en: 'Psalm 34:7' }
  }
];

// Generate all 365 devotionals with multilingual content
export const devocionales365Multilang: DevocionalMultilang[] = [
  ...devocionalBaseMultilang,
  ...Array.from({ length: 355 }, (_, i) => {
    const dayNum = i + 11;
    const theme = themesMultilang[(dayNum - 1) % themesMultilang.length];
    return {
      id: dayNum,
      titulo: {
        es: `${theme.tema.es} - Día ${dayNum}`,
        pt: `${theme.tema.pt} - Dia ${dayNum}`,
        en: `${theme.tema.en} - Day ${dayNum}`
      },
      versiculo: theme.versiculo,
      cita: theme.cita,
      reflexion: {
        es: `Meditación del día ${dayNum} sobre ${theme.tema.es.toLowerCase()}. Dios nos invita a reflexionar sobre Su Palabra y aplicarla en nuestra vida diaria. Que este tiempo de comunión con Él fortalezca tu fe y renueve tu espíritu.`,
        pt: `Meditação do dia ${dayNum} sobre ${theme.tema.pt.toLowerCase()}. Deus nos convida a refletir sobre Sua Palavra e aplicá-la em nossa vida diária. Que este tempo de comunhão com Ele fortaleça sua fé e renove seu espírito.`,
        en: `Day ${dayNum} meditation on ${theme.tema.en.toLowerCase()}. God invites us to reflect on His Word and apply it in our daily lives. May this time of communion with Him strengthen your faith and renew your spirit.`
      },
      oracion: {
        es: `Señor, gracias por este día ${dayNum}. Ayúdame a vivir según Tu Palabra y a crecer en ${theme.tema.es.toLowerCase()}. Que mi vida refleje Tu amor. Amén.`,
        pt: `Senhor, obrigado por este dia ${dayNum}. Ajuda-me a viver segundo Tua Palavra e a crescer em ${theme.tema.pt.toLowerCase()}. Que minha vida reflita Teu amor. Amém.`,
        en: `Lord, thank You for this day ${dayNum}. Help me to live according to Your Word and grow in ${theme.tema.en.toLowerCase()}. May my life reflect Your love. Amen.`
      }
    };
  })
];

// Convert multilang to single language
function toSingleLang(dev: DevocionalMultilang, lang: Language): Devocional365 {
  return {
    id: dev.id,
    titulo: dev.titulo[lang],
    versiculo: dev.versiculo[lang],
    cita: dev.cita[lang],
    reflexion: dev.reflexion[lang],
    oracion: dev.oracion[lang]
  };
}

// Get devotional for a specific day (with language support)
export function getDevocionalDelDia(date: Date = new Date(), language: Language = 'es'): Devocional365 {
  const dayOfYear = getDayOfYear(date);
  const index = ((dayOfYear - 1) % 365);
  return toSingleLang(devocionales365Multilang[index], language);
}

// Get history of devotionals (with language support)
export function getHistorialDevocionales(daysBack: number = 30, fromDate: Date = new Date(), language: Language = 'es'): Devocional365[] {
  const result: Devocional365[] = [];
  for (let i = 1; i <= daysBack; i++) {
    const pastDate = new Date(fromDate);
    pastDate.setDate(pastDate.getDate() - i);
    result.push(getDevocionalDelDia(pastDate, language));
  }
  return result;
}

// Backward compatibility: Spanish-only array
export const devocionales365: Devocional365[] = devocionales365Multilang.map(dev => toSingleLang(dev, 'es'));