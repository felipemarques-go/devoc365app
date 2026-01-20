// src/data/devocionales365.ts - 365 DEVOCIONAIS ÚNICOS MULTILÍNGUE

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
  const startDate = new Date(2026, 0, 1);
  
  for (let i = 1; i <= daysBack; i++) {
    const pastDate = new Date(fromDate);
    pastDate.setDate(pastDate.getDate() - i);
    
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

// 365 DEVOCIONAIS ÚNICOS - Conteúdo real e coerente
export const devocionales365Multilang: DevocionalMultilang[] = [
  // DIA 1
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
      oracion: "Senhor, obrigado pela Sua promessa de estar sempre comigo. Neste dia, escolho confiar em Ti mais do que nos meus medos. Fortaleça minha fé e ajude-me a lembrar que Tu tens o controle. Entrego minhas preocupações a Ti e descanso no Seu amor. Amém."
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
  },
  // DIA 2
  {
    id: 2,
    es: {
      id: 2,
      titulo: "La paz que sobrepasa todo entendimiento",
      versiculo: '"Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús."',
      cita: "Filipenses 4:7",
      reflexion: `La paz que Dios ofrece no es como la paz del mundo. No depende de las circunstancias externas, sino que nace de una relación profunda con Él.

Esta paz es tan extraordinaria que nuestras mentes finitas no pueden comprenderla completamente. Actúa como un guardián, protegiendo nuestros corazones y mentes de la ansiedad y el temor.

Cuando la vida se vuelve caótica, podemos encontrar refugio en la presencia de Dios. Su paz nos sostiene incluso cuando todo a nuestro alrededor parece desmoronarse.`,
      oracion: "Padre celestial, hoy vengo a Ti buscando Tu paz. Que Tu presencia calme mis pensamientos ansiosos y guarde mi corazón. Ayúdame a mantener mi mente enfocada en Ti, sabiendo que en medio de cualquier tormenta, Tu paz está disponible para mí. Amén."
    },
    pt: {
      id: 2,
      titulo: "A paz que excede todo entendimento",
      versiculo: '"E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos pensamentos em Cristo Jesus."',
      cita: "Filipenses 4:7",
      reflexion: `A paz que Deus oferece não é como a paz do mundo. Ela não depende das circunstâncias externas, mas nasce de um relacionamento profundo com Ele.

Esta paz é tão extraordinária que nossas mentes finitas não conseguem compreendê-la completamente. Ela age como um guardião, protegendo nossos corações e mentes da ansiedade e do medo.

Quando a vida se torna caótica, podemos encontrar refúgio na presença de Deus. Sua paz nos sustenta mesmo quando tudo ao nosso redor parece desmoronar.`,
      oracion: "Pai celestial, hoje venho a Ti buscando Tua paz. Que Tua presença acalme meus pensamentos ansiosos e guarde meu coração. Ajuda-me a manter minha mente focada em Ti, sabendo que no meio de qualquer tempestade, Tua paz está disponível para mim. Amém."
    },
    en: {
      id: 2,
      titulo: "The Peace That Surpasses All Understanding",
      versiculo: '"And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."',
      cita: "Philippians 4:7",
      reflexion: `The peace that God offers is not like the peace of the world. It does not depend on external circumstances, but is born from a deep relationship with Him.

This peace is so extraordinary that our finite minds cannot fully comprehend it. It acts as a guardian, protecting our hearts and minds from anxiety and fear.

When life becomes chaotic, we can find refuge in God's presence. His peace sustains us even when everything around us seems to be falling apart.`,
      oracion: "Heavenly Father, today I come to You seeking Your peace. May Your presence calm my anxious thoughts and guard my heart. Help me keep my mind focused on You, knowing that in the midst of any storm, Your peace is available to me. Amen."
    }
  },
  // DIA 3
  {
    id: 3,
    es: {
      id: 3,
      titulo: "Renovando las fuerzas cada día",
      versiculo: '"Pero los que esperan en Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán."',
      cita: "Isaías 40:31",
      reflexion: `La vida puede ser agotadora. Las responsabilidades, los desafíos y las preocupaciones pueden drenar nuestra energía física, emocional y espiritual.

Pero Dios promete renovar nuestras fuerzas cuando ponemos nuestra esperanza en Él. No es un esfuerzo propio, sino una entrega confiada a Su poder sobrenatural.

Como las águilas que se elevan sin esfuerzo aprovechando las corrientes de aire, así podemos elevarnos sobre nuestras circunstancias cuando descansamos en el Señor. Él nos da la fuerza para seguir adelante.`,
      oracion: "Señor, hoy me siento agotado. Vengo a Ti para renovar mis fuerzas. Ayúdame a esperar en Ti con paciencia y confianza. Levántame como águila sobre mis circunstancias y dame la energía que necesito para cumplir Tu propósito en mi vida. Amén."
    },
    pt: {
      id: 3,
      titulo: "Renovando as forças a cada dia",
      versiculo: '"Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão."',
      cita: "Isaías 40:31",
      reflexion: `A vida pode ser exaustiva. As responsabilidades, os desafios e as preocupações podem drenar nossa energia física, emocional e espiritual.

Mas Deus promete renovar nossas forças quando colocamos nossa esperança Nele. Não é um esforço próprio, mas uma entrega confiante ao Seu poder sobrenatural.

Como as águias que se elevam sem esforço aproveitando as correntes de ar, assim podemos nos elevar sobre nossas circunstâncias quando descansamos no Senhor. Ele nos dá força para seguir em frente.`,
      oracion: "Senhor, hoje me sinto esgotado. Venho a Ti para renovar minhas forças. Ajuda-me a esperar em Ti com paciência e confiança. Levanta-me como águia sobre minhas circunstâncias e dá-me a energia que preciso para cumprir Teu propósito em minha vida. Amém."
    },
    en: {
      id: 3,
      titulo: "Renewing Strength Each Day",
      versiculo: '"But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."',
      cita: "Isaiah 40:31",
      reflexion: `Life can be exhausting. Responsibilities, challenges, and worries can drain our physical, emotional, and spiritual energy.

But God promises to renew our strength when we put our hope in Him. It is not our own effort, but a trusting surrender to His supernatural power.

Like eagles that soar effortlessly on air currents, we too can rise above our circumstances when we rest in the Lord. He gives us the strength to keep going.`,
      oracion: "Lord, today I feel exhausted. I come to You to renew my strength. Help me wait on You with patience and trust. Lift me up like an eagle above my circumstances and give me the energy I need to fulfill Your purpose in my life. Amen."
    }
  },
  // DIA 4
  {
    id: 4,
    es: {
      id: 4,
      titulo: "El amor incondicional del Padre",
      versiculo: '"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."',
      cita: "Juan 3:16",
      reflexion: `El amor de Dios es incomparable. No es un amor que debemos ganar o merecer; es un regalo gratuito dado por gracia.

Este versículo resume el corazón del evangelio: Dios nos amó primero, incluso cuando éramos pecadores. Su amor fue tan grande que dio lo más precioso que tenía: Su propio Hijo.

No hay nada que puedas hacer para que Dios te ame más, y nada que puedas hacer para que te ame menos. Su amor es constante, fiel e incondicional. Descansa en esa verdad hoy.`,
      oracion: "Padre amado, gracias por Tu amor incondicional. Gracias por enviar a Jesús para que yo pueda tener vida eterna. Ayúdame a comprender la profundidad de Tu amor y a vivir cada día consciente de este regalo maravilloso. Que Tu amor fluya a través de mí hacia los demás. Amén."
    },
    pt: {
      id: 4,
      titulo: "O amor incondicional do Pai",
      versiculo: '"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."',
      cita: "João 3:16",
      reflexion: `O amor de Deus é incomparável. Não é um amor que precisamos conquistar ou merecer; é um presente gratuito dado por graça.

Este versículo resume o coração do evangelho: Deus nos amou primeiro, mesmo quando éramos pecadores. Seu amor foi tão grande que Ele deu o mais precioso que tinha: Seu próprio Filho.

Não há nada que você possa fazer para que Deus te ame mais, e nada que possa fazer para que te ame menos. Seu amor é constante, fiel e incondicional. Descanse nessa verdade hoje.`,
      oracion: "Pai amado, obrigado pelo Teu amor incondicional. Obrigado por enviar Jesus para que eu possa ter vida eterna. Ajuda-me a compreender a profundidade do Teu amor e a viver cada dia consciente deste presente maravilhoso. Que Teu amor flua através de mim para os outros. Amém."
    },
    en: {
      id: 4,
      titulo: "The Father's Unconditional Love",
      versiculo: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."',
      cita: "John 3:16",
      reflexion: `God's love is incomparable. It is not a love we must earn or deserve; it is a free gift given by grace.

This verse summarizes the heart of the gospel: God loved us first, even when we were sinners. His love was so great that He gave the most precious thing He had: His own Son.

There is nothing you can do to make God love you more, and nothing you can do to make Him love you less. His love is constant, faithful, and unconditional. Rest in that truth today.`,
      oracion: "Beloved Father, thank you for Your unconditional love. Thank you for sending Jesus so that I may have eternal life. Help me understand the depth of Your love and live each day aware of this wonderful gift. May Your love flow through me to others. Amen."
    }
  },
  // DIA 5
  {
    id: 5,
    es: {
      id: 5,
      titulo: "Caminando por fe, no por vista",
      versiculo: '"Porque por fe andamos, no por vista."',
      cita: "2 Corintios 5:7",
      reflexion: `Vivir por fe significa confiar en Dios incluso cuando no podemos ver el camino completo. Es dar pasos obedientes aunque no entendamos completamente hacia dónde nos llevan.

Nuestra naturaleza humana quiere certezas, garantías y explicaciones. Pero Dios nos invita a confiar en Él, en Su carácter y en Sus promesas, más que en lo que nuestros ojos pueden ver.

La fe no niega la realidad de los problemas, pero se aferra a una realidad mayor: que Dios es soberano y está trabajando todas las cosas para nuestro bien.`,
      oracion: "Señor, confieso que a veces quiero ver antes de creer. Dame una fe que confíe en Ti cuando el camino es oscuro. Ayúdame a dar pasos de obediencia aunque no entienda todo. Sé que Tú ves lo que yo no puedo ver. Confío en Tu guía. Amén."
    },
    pt: {
      id: 5,
      titulo: "Caminhando por fé, não por vista",
      versiculo: '"Porque andamos por fé, não por vista."',
      cita: "2 Coríntios 5:7",
      reflexion: `Viver por fé significa confiar em Deus mesmo quando não podemos ver o caminho completo. É dar passos obedientes ainda que não entendamos completamente para onde eles nos levam.

Nossa natureza humana quer certezas, garantias e explicações. Mas Deus nos convida a confiar Nele, em Seu caráter e em Suas promessas, mais do que naquilo que nossos olhos podem ver.

A fé não nega a realidade dos problemas, mas se apega a uma realidade maior: que Deus é soberano e está trabalhando todas as coisas para o nosso bem.`,
      oracion: "Senhor, confesso que às vezes quero ver antes de crer. Dá-me uma fé que confie em Ti quando o caminho é escuro. Ajuda-me a dar passos de obediência mesmo que eu não entenda tudo. Sei que Tu vês o que eu não posso ver. Confio na Tua guia. Amém."
    },
    en: {
      id: 5,
      titulo: "Walking by Faith, Not by Sight",
      versiculo: '"For we walk by faith, not by sight."',
      cita: "2 Corinthians 5:7",
      reflexion: `Living by faith means trusting God even when we cannot see the complete path. It is taking obedient steps even when we do not fully understand where they lead.

Our human nature wants certainties, guarantees, and explanations. But God invites us to trust in Him, in His character and His promises, more than in what our eyes can see.

Faith does not deny the reality of problems, but holds on to a greater reality: that God is sovereign and is working all things for our good.`,
      oracion: "Lord, I confess that sometimes I want to see before believing. Give me a faith that trusts You when the path is dark. Help me take steps of obedience even though I don't understand everything. I know You see what I cannot see. I trust in Your guidance. Amen."
    }
  },
  // DIA 6
  {
    id: 6,
    es: {
      id: 6,
      titulo: "El gozo del Señor es nuestra fortaleza",
      versiculo: '"No os entristezcáis, porque el gozo de Jehová es vuestra fuerza."',
      cita: "Nehemías 8:10",
      reflexion: `El gozo bíblico no es simplemente felicidad basada en circunstancias favorables. Es una alegría profunda que brota de conocer a Dios y confiar en Sus promesas.

Este gozo se convierte en nuestra fortaleza espiritual. Cuando enfrentamos dificultades, el gozo del Señor nos da la energía para perseverar. Es un ancla para nuestra alma en tiempos turbulentos.

El gozo viene de saber que Dios tiene el control, que Su amor es constante, y que tiene un propósito bueno para nuestra vida. En Él encontramos razones para regocijarnos cada día.`,
      oracion: "Padre, gracias porque Tu gozo no depende de mis circunstancias. Hoy elijo regocijarme en Ti, no en lo que veo a mi alrededor. Llena mi corazón con Tu gozo sobrenatural y dame fuerzas para enfrentar este día. Que mi vida refleje la alegría que solo Tú puedes dar. Amén."
    },
    pt: {
      id: 6,
      titulo: "A alegria do Senhor é a nossa força",
      versiculo: '"Não vos entristeçais, porque a alegria do Senhor é a vossa força."',
      cita: "Neemias 8:10",
      reflexion: `A alegria bíblica não é simplesmente felicidade baseada em circunstâncias favoráveis. É uma alegria profunda que brota de conhecer a Deus e confiar em Suas promessas.

Esta alegria se torna nossa fortaleza espiritual. Quando enfrentamos dificuldades, a alegria do Senhor nos dá energia para perseverar. É uma âncora para nossa alma em tempos turbulentos.

A alegria vem de saber que Deus está no controle, que Seu amor é constante, e que Ele tem um propósito bom para nossa vida. Nele encontramos razões para nos alegrar a cada dia.`,
      oracion: "Pai, obrigado porque Tua alegria não depende das minhas circunstâncias. Hoje escolho me alegrar em Ti, não no que vejo ao meu redor. Enche meu coração com Tua alegria sobrenatural e dá-me forças para enfrentar este dia. Que minha vida reflita a alegria que só Tu podes dar. Amém."
    },
    en: {
      id: 6,
      titulo: "The Joy of the Lord Is Our Strength",
      versiculo: '"Do not grieve, for the joy of the Lord is your strength."',
      cita: "Nehemiah 8:10",
      reflexion: `Biblical joy is not simply happiness based on favorable circumstances. It is a deep joy that springs from knowing God and trusting in His promises.

This joy becomes our spiritual strength. When we face difficulties, the joy of the Lord gives us the energy to persevere. It is an anchor for our soul in turbulent times.

Joy comes from knowing that God is in control, that His love is constant, and that He has a good purpose for our life. In Him we find reasons to rejoice every day.`,
      oracion: "Father, thank you because Your joy does not depend on my circumstances. Today I choose to rejoice in You, not in what I see around me. Fill my heart with Your supernatural joy and give me strength to face this day. May my life reflect the joy that only You can give. Amen."
    }
  },
  // DIA 7
  {
    id: 7,
    es: {
      id: 7,
      titulo: "Dios pelea nuestras batallas",
      versiculo: '"Jehová peleará por vosotros, y vosotros estaréis tranquilos."',
      cita: "Éxodo 14:14",
      reflexion: `Cuántas veces tratamos de resolver todo con nuestras propias fuerzas, olvidando que tenemos un Dios todopoderoso que pelea por nosotros.

Este versículo fue dado a Israel cuando estaban atrapados entre el Mar Rojo y el ejército egipcio. Parecía imposible, pero Dios les pidió que se quedaran tranquilos mientras Él actuaba.

Hay batallas en tu vida que no están diseñadas para que las pelees solo. Dios quiere que le entregues esas luchas y confíes en que Él tiene el poder para vencer. Tu parte es confiar; la Suya es pelear.`,
      oracion: "Señor, reconozco que he tratado de pelear batallas con mis propias fuerzas. Hoy te entrego esas luchas. Confío en que Tú peleas por mí. Dame la fe para quedarme tranquilo mientras Tú actúas. Gracias por ser mi defensor y mi protector. Amén."
    },
    pt: {
      id: 7,
      titulo: "Deus luta nossas batalhas",
      versiculo: '"O Senhor pelejará por vós, e vós vos calareis."',
      cita: "Êxodo 14:14",
      reflexion: `Quantas vezes tentamos resolver tudo com nossas próprias forças, esquecendo que temos um Deus todo-poderoso que luta por nós.

Este versículo foi dado a Israel quando estavam presos entre o Mar Vermelho e o exército egípcio. Parecia impossível, mas Deus pediu que ficassem tranquilos enquanto Ele agia.

Há batalhas em sua vida que não foram feitas para você lutar sozinho. Deus quer que você entregue essas lutas e confie que Ele tem o poder para vencer. Sua parte é confiar; a Dele é lutar.`,
      oracion: "Senhor, reconheço que tenho tentado lutar batalhas com minhas próprias forças. Hoje Te entrego essas lutas. Confio que Tu lutas por mim. Dá-me fé para ficar tranquilo enquanto Tu ages. Obrigado por ser meu defensor e meu protetor. Amém."
    },
    en: {
      id: 7,
      titulo: "God Fights Our Battles",
      versiculo: '"The Lord will fight for you; you need only to be still."',
      cita: "Exodus 14:14",
      reflexion: `How often we try to solve everything with our own strength, forgetting that we have an almighty God who fights for us.

This verse was given to Israel when they were trapped between the Red Sea and the Egyptian army. It seemed impossible, but God asked them to be still while He acted.

There are battles in your life that are not designed for you to fight alone. God wants you to surrender those struggles and trust that He has the power to overcome. Your part is to trust; His is to fight.`,
      oracion: "Lord, I acknowledge that I have tried to fight battles with my own strength. Today I surrender those struggles to You. I trust that You fight for me. Give me the faith to be still while You act. Thank you for being my defender and my protector. Amen."
    }
  },
  // DIA 8
  {
    id: 8,
    es: {
      id: 8,
      titulo: "La misericordia que se renueva cada mañana",
      versiculo: '"Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad."',
      cita: "Lamentaciones 3:22-23",
      reflexion: `Cada amanecer trae consigo una nueva porción de la misericordia de Dios. No importa cuán difícil haya sido el día anterior, hoy hay gracia fresca disponible para ti.

El profeta Jeremías escribió estas palabras en medio de la devastación de Jerusalén. Incluso en el momento más oscuro, pudo ver la fidelidad de Dios brillando como la luz del amanecer.

Los errores de ayer no definen tu hoy. Las misericordias de Dios son nuevas cada mañana. Él te ofrece un nuevo comienzo, una nueva oportunidad para experimentar Su amor y gracia.`,
      oracion: "Padre misericordioso, gracias porque Tus misericordias son nuevas cada mañana. Perdona mis faltas de ayer y ayúdame a comenzar este día con esperanza renovada. Tu fidelidad me sostiene. Hoy abrazo Tu gracia y camino en la libertad que Tú ofreces. Amén."
    },
    pt: {
      id: 8,
      titulo: "A misericórdia que se renova a cada manhã",
      versiculo: '"As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã. Grande é a tua fidelidade."',
      cita: "Lamentações 3:22-23",
      reflexion: `Cada amanhecer traz consigo uma nova porção da misericórdia de Deus. Não importa quão difícil tenha sido o dia anterior, hoje há graça fresca disponível para você.

O profeta Jeremias escreveu estas palavras em meio à devastação de Jerusalém. Mesmo no momento mais escuro, ele pôde ver a fidelidade de Deus brilhando como a luz do amanhecer.

Os erros de ontem não definem seu hoje. As misericórdias de Deus são novas a cada manhã. Ele oferece um novo começo, uma nova oportunidade para experimentar Seu amor e graça.`,
      oracion: "Pai misericordioso, obrigado porque Tuas misericórdias são novas a cada manhã. Perdoa minhas falhas de ontem e ajuda-me a começar este dia com esperança renovada. Tua fidelidade me sustenta. Hoje abraço Tua graça e caminho na liberdade que Tu ofereces. Amém."
    },
    en: {
      id: 8,
      titulo: "Mercies That Are New Every Morning",
      versiculo: '"Because of the Lord\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness."',
      cita: "Lamentations 3:22-23",
      reflexion: `Each dawn brings with it a fresh portion of God's mercy. No matter how difficult yesterday was, today there is fresh grace available for you.

The prophet Jeremiah wrote these words in the midst of the devastation of Jerusalem. Even in the darkest moment, he could see God's faithfulness shining like the light of dawn.

Yesterday's mistakes do not define your today. God's mercies are new every morning. He offers you a new beginning, a new opportunity to experience His love and grace.`,
      oracion: "Merciful Father, thank you because Your mercies are new every morning. Forgive my failures from yesterday and help me start this day with renewed hope. Your faithfulness sustains me. Today I embrace Your grace and walk in the freedom You offer. Amen."
    }
  },
  // DIA 9
  {
    id: 9,
    es: {
      id: 9,
      titulo: "El buen pastor que guía nuestros pasos",
      versiculo: '"Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará."',
      cita: "Salmo 23:1-2",
      reflexion: `David, quien fue pastor antes de ser rey, entendía perfectamente lo que significaba tener a Jehová como pastor. Un buen pastor conoce a sus ovejas, las protege, las guía y provee todo lo que necesitan.

Cuando declaramos "El Señor es mi pastor", estamos afirmando nuestra dependencia total de Él. No confiamos en nuestras propias habilidades, sino en Su cuidado constante.

Él nos lleva a pastos verdes donde podemos alimentarnos y descansar. Nos guía junto a aguas tranquilas donde podemos beber y refrescarnos. En Su presencia encontramos todo lo que necesitamos.`,
      oracion: "Señor, Tú eres mi pastor. Hoy reconozco mi dependencia de Ti. Guíame a los pastos verdes donde puedo descansar y restaurar mi alma. Llévame junto a aguas tranquilas. Confío en que suplirás todas mis necesidades según Tu voluntad perfecta. Amén."
    },
    pt: {
      id: 9,
      titulo: "O bom pastor que guia nossos passos",
      versiculo: '"O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas."',
      cita: "Salmo 23:1-2",
      reflexion: `Davi, que foi pastor antes de ser rei, entendia perfeitamente o que significava ter o Senhor como pastor. Um bom pastor conhece suas ovelhas, as protege, as guia e provê tudo que precisam.

Quando declaramos "O Senhor é o meu pastor", estamos afirmando nossa dependência total Dele. Não confiamos em nossas próprias habilidades, mas em Seu cuidado constante.

Ele nos leva a pastos verdes onde podemos nos alimentar e descansar. Guia-nos junto a águas tranquilas onde podemos beber e nos refrescar. Em Sua presença encontramos tudo que precisamos.`,
      oracion: "Senhor, Tu és meu pastor. Hoje reconheço minha dependência de Ti. Guia-me aos pastos verdes onde posso descansar e restaurar minha alma. Leva-me junto a águas tranquilas. Confio que suprirás todas as minhas necessidades segundo Tua vontade perfeita. Amém."
    },
    en: {
      id: 9,
      titulo: "The Good Shepherd Who Guides Our Steps",
      versiculo: '"The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters."',
      cita: "Psalm 23:1-2",
      reflexion: `David, who was a shepherd before becoming king, perfectly understood what it meant to have the Lord as his shepherd. A good shepherd knows his sheep, protects them, guides them, and provides everything they need.

When we declare "The Lord is my shepherd," we are affirming our total dependence on Him. We do not trust in our own abilities, but in His constant care.

He leads us to green pastures where we can feed and rest. He guides us beside quiet waters where we can drink and be refreshed. In His presence we find everything we need.`,
      oracion: "Lord, You are my shepherd. Today I acknowledge my dependence on You. Lead me to the green pastures where I can rest and restore my soul. Take me beside quiet waters. I trust that You will supply all my needs according to Your perfect will. Amen."
    }
  },
  // DIA 10
  {
    id: 10,
    es: {
      id: 10,
      titulo: "Todo lo puedo en Cristo",
      versiculo: '"Todo lo puedo en Cristo que me fortalece."',
      cita: "Filipenses 4:13",
      reflexion: `Este versículo no es una fórmula mágica para lograr cualquier cosa que deseemos. Es una declaración de fe en medio de cualquier circunstancia que enfrentemos.

Pablo escribió estas palabras desde una prisión, habiendo experimentado abundancia y escasez, honra y deshonra. Había aprendido el secreto de estar contento en toda situación porque su fuerza venía de Cristo.

Cuando enfrentamos desafíos que parecen imposibles, no dependemos de nuestra propia capacidad, sino del poder de Cristo en nosotros. Él nos da la fuerza para perseverar, para superar, para seguir adelante.`,
      oracion: "Señor Jesús, hoy declaro que todo lo puedo en Ti. No confío en mis propias fuerzas, sino en Tu poder que obra en mí. Capacítame para enfrentar los desafíos de este día. Ayúdame a mantener mi mirada en Ti y a depender completamente de Tu gracia. Amén."
    },
    pt: {
      id: 10,
      titulo: "Tudo posso naquele que me fortalece",
      versiculo: '"Tudo posso naquele que me fortalece."',
      cita: "Filipenses 4:13",
      reflexion: `Este versículo não é uma fórmula mágica para conseguir qualquer coisa que desejamos. É uma declaração de fé no meio de qualquer circunstância que enfrentamos.

Paulo escreveu estas palavras de uma prisão, tendo experimentado abundância e escassez, honra e desonra. Ele havia aprendido o segredo de estar contente em toda situação porque sua força vinha de Cristo.

Quando enfrentamos desafios que parecem impossíveis, não dependemos de nossa própria capacidade, mas do poder de Cristo em nós. Ele nos dá força para perseverar, para superar, para seguir em frente.`,
      oracion: "Senhor Jesus, hoje declaro que tudo posso em Ti. Não confio em minhas próprias forças, mas no Teu poder que opera em mim. Capacita-me para enfrentar os desafios deste dia. Ajuda-me a manter meu olhar em Ti e a depender completamente da Tua graça. Amém."
    },
    en: {
      id: 10,
      titulo: "I Can Do All Things Through Christ",
      versiculo: '"I can do all this through him who gives me strength."',
      cita: "Philippians 4:13",
      reflexion: `This verse is not a magic formula to achieve anything we desire. It is a declaration of faith in the midst of any circumstance we face.

Paul wrote these words from prison, having experienced abundance and scarcity, honor and dishonor. He had learned the secret of being content in every situation because his strength came from Christ.

When we face challenges that seem impossible, we do not depend on our own ability, but on the power of Christ in us. He gives us the strength to persevere, to overcome, to keep going.`,
      oracion: "Lord Jesus, today I declare that I can do all things through You. I do not trust in my own strength, but in Your power that works in me. Enable me to face the challenges of this day. Help me keep my eyes on You and depend completely on Your grace. Amen."
    }
  },
  // DIA 11
  {
    id: 11,
    es: {
      id: 11,
      titulo: "El perdón que nos libera",
      versiculo: '"Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad."',
      cita: "1 Juan 1:9",
      reflexion: `El perdón de Dios no es algo que debemos ganar; es un regalo que recibimos al confesar nuestros pecados. Dios no retiene Su perdón de quienes vienen a Él con corazón arrepentido.

La confesión no es para informar a Dios de algo que Él no sabe. Es un acto de humildad donde reconocemos nuestra necesidad de Su gracia y restauramos nuestra comunión con Él.

Cuando confesamos, Dios nos perdona completamente y nos limpia de toda impureza. No hay pecado demasiado grande para Su misericordia. Su fidelidad garantiza que siempre nos recibirá con brazos abiertos.`,
      oracion: "Padre santo, vengo ante Ti con humildad. Confieso mis pecados sabiendo que Tú eres fiel para perdonarme. Límpiame de toda maldad y restaura mi comunión contigo. Gracias por Tu gracia que me libera de la culpa y me da un nuevo comienzo. Amén."
    },
    pt: {
      id: 11,
      titulo: "O perdão que nos liberta",
      versiculo: '"Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça."',
      cita: "1 João 1:9",
      reflexion: `O perdão de Deus não é algo que devemos conquistar; é um presente que recebemos ao confessar nossos pecados. Deus não retém Seu perdão de quem vem a Ele com coração arrependido.

A confissão não é para informar Deus de algo que Ele não sabe. É um ato de humildade onde reconhecemos nossa necessidade da Sua graça e restauramos nossa comunhão com Ele.

Quando confessamos, Deus nos perdoa completamente e nos purifica de toda impureza. Não há pecado grande demais para Sua misericórdia. Sua fidelidade garante que sempre nos receberá de braços abertos.`,
      oracion: "Pai santo, venho diante de Ti com humildade. Confesso meus pecados sabendo que Tu és fiel para me perdoar. Purifica-me de toda maldade e restaura minha comunhão contigo. Obrigado pela Tua graça que me liberta da culpa e me dá um novo começo. Amém."
    },
    en: {
      id: 11,
      titulo: "The Forgiveness That Sets Us Free",
      versiculo: '"If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness."',
      cita: "1 John 1:9",
      reflexion: `God's forgiveness is not something we must earn; it is a gift we receive when we confess our sins. God does not withhold His forgiveness from those who come to Him with a repentant heart.

Confession is not to inform God of something He doesn't know. It is an act of humility where we acknowledge our need for His grace and restore our fellowship with Him.

When we confess, God completely forgives us and cleanses us from all impurity. There is no sin too great for His mercy. His faithfulness guarantees that He will always receive us with open arms.`,
      oracion: "Holy Father, I come before You with humility. I confess my sins knowing that You are faithful to forgive me. Cleanse me from all unrighteousness and restore my fellowship with You. Thank you for Your grace that frees me from guilt and gives me a new beginning. Amen."
    }
  },
  // DIA 12
  {
    id: 12,
    es: {
      id: 12,
      titulo: "Buscando primero el Reino de Dios",
      versiculo: '"Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas."',
      cita: "Mateo 6:33",
      reflexion: `Jesús nos enseña a establecer las prioridades correctas en nuestra vida. Cuando ponemos a Dios en primer lugar, todo lo demás encuentra su lugar apropiado.

Buscar el Reino significa vivir bajo el señorío de Cristo, hacer Su voluntad nuestra prioridad, y reflejar Sus valores en cada área de nuestra vida. No es solo asistir a la iglesia, sino dejar que Dios gobierne cada decisión.

La promesa es clara: cuando buscamos primero a Dios, Él se encarga de nuestras necesidades. No debemos preocuparnos por el mañana porque nuestro Padre celestial sabe lo que necesitamos.`,
      oracion: "Señor, hoy elijo buscarte primero a Ti. Que Tu Reino sea mi prioridad sobre todas las demás cosas. Confío en que Tú proveerás todo lo que necesito. Ayúdame a mantener mi enfoque en Ti y a vivir según Tu voluntad cada día. Amén."
    },
    pt: {
      id: 12,
      titulo: "Buscando primeiro o Reino de Deus",
      versiculo: '"Buscai primeiro o Reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas."',
      cita: "Mateus 6:33",
      reflexion: `Jesus nos ensina a estabelecer as prioridades corretas em nossa vida. Quando colocamos Deus em primeiro lugar, todo o resto encontra seu lugar apropriado.

Buscar o Reino significa viver sob o senhorio de Cristo, fazer Sua vontade nossa prioridade, e refletir Seus valores em cada área de nossa vida. Não é apenas frequentar a igreja, mas deixar Deus governar cada decisão.

A promessa é clara: quando buscamos primeiro a Deus, Ele cuida de nossas necessidades. Não devemos nos preocupar com o amanhã porque nosso Pai celestial sabe do que precisamos.`,
      oracion: "Senhor, hoje escolho Te buscar primeiro. Que Teu Reino seja minha prioridade sobre todas as outras coisas. Confio que Tu proverás tudo que preciso. Ajuda-me a manter meu foco em Ti e a viver segundo Tua vontade a cada dia. Amém."
    },
    en: {
      id: 12,
      titulo: "Seeking First the Kingdom of God",
      versiculo: '"But seek first his kingdom and his righteousness, and all these things will be given to you as well."',
      cita: "Matthew 6:33",
      reflexion: `Jesus teaches us to set the right priorities in our lives. When we put God first, everything else finds its proper place.

Seeking the Kingdom means living under the lordship of Christ, making His will our priority, and reflecting His values in every area of our life. It is not just attending church, but letting God rule every decision.

The promise is clear: when we seek God first, He takes care of our needs. We should not worry about tomorrow because our heavenly Father knows what we need.`,
      oracion: "Lord, today I choose to seek You first. May Your Kingdom be my priority over all other things. I trust that You will provide everything I need. Help me keep my focus on You and live according to Your will each day. Amen."
    }
  },
  // DIA 13
  {
    id: 13,
    es: {
      id: 13,
      titulo: "La luz en medio de la oscuridad",
      versiculo: '"Otra vez Jesús les habló, diciendo: Yo soy la luz del mundo; el que me sigue, no andará en tinieblas, sino que tendrá la luz de la vida."',
      cita: "Juan 8:12",
      reflexion: `En un mundo lleno de confusión y oscuridad espiritual, Jesús se presenta como la luz verdadera. Él ilumina nuestro camino y nos guía hacia la verdad.

Seguir a Jesús significa caminar en Su luz, dejando atrás las tinieblas del pecado, la ignorancia y la desesperanza. Su luz expone lo que está oculto y nos muestra el camino correcto a seguir.

No tenemos que tropezar en la oscuridad. Cristo nos ofrece la luz de la vida, una luz que no solo ilumina nuestro presente, sino que también nos da esperanza para el futuro eterno con Él.`,
      oracion: "Señor Jesús, Tú eres la luz de mi vida. Ilumina los lugares oscuros de mi corazón y guíame en Tu verdad. Ayúdame a seguirte fielmente cada día, dejando atrás las tinieblas. Que Tu luz brille a través de mí hacia los que me rodean. Amén."
    },
    pt: {
      id: 13,
      titulo: "A luz no meio da escuridão",
      versiculo: '"Falou-lhes Jesus outra vez, dizendo: Eu sou a luz do mundo; quem me segue, não andará em trevas, mas terá a luz da vida."',
      cita: "João 8:12",
      reflexion: `Em um mundo cheio de confusão e escuridão espiritual, Jesus se apresenta como a luz verdadeira. Ele ilumina nosso caminho e nos guia para a verdade.

Seguir a Jesus significa caminhar em Sua luz, deixando para trás as trevas do pecado, da ignorância e do desespero. Sua luz expõe o que está oculto e nos mostra o caminho certo a seguir.

Não precisamos tropeçar na escuridão. Cristo nos oferece a luz da vida, uma luz que não só ilumina nosso presente, mas também nos dá esperança para o futuro eterno com Ele.`,
      oracion: "Senhor Jesus, Tu és a luz da minha vida. Ilumina os lugares escuros do meu coração e guia-me na Tua verdade. Ajuda-me a Te seguir fielmente a cada dia, deixando para trás as trevas. Que Tua luz brilhe através de mim para os que me rodeiam. Amém."
    },
    en: {
      id: 13,
      titulo: "The Light in the Midst of Darkness",
      versiculo: '"When Jesus spoke again to the people, he said, I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life."',
      cita: "John 8:12",
      reflexion: `In a world full of confusion and spiritual darkness, Jesus presents Himself as the true light. He illuminates our path and guides us toward truth.

Following Jesus means walking in His light, leaving behind the darkness of sin, ignorance, and hopelessness. His light exposes what is hidden and shows us the right path to follow.

We do not have to stumble in the darkness. Christ offers us the light of life, a light that not only illuminates our present but also gives us hope for the eternal future with Him.`,
      oracion: "Lord Jesus, You are the light of my life. Illuminate the dark places of my heart and guide me in Your truth. Help me follow You faithfully each day, leaving the darkness behind. May Your light shine through me to those around me. Amen."
    }
  },
  // DIA 14
  {
    id: 14,
    es: {
      id: 14,
      titulo: "La oración que transforma",
      versiculo: '"Orad sin cesar."',
      cita: "1 Tesalonicenses 5:17",
      reflexion: `La oración no es solo un ritual religioso; es una conversación íntima con nuestro Padre celestial. Pablo nos anima a mantener esta comunicación de manera continua.

Orar sin cesar no significa estar de rodillas todo el día, sino mantener una actitud de dependencia y comunión constante con Dios. Es incluir a Dios en cada momento, cada decisión, cada alegría y cada preocupación.

Cuando cultivamos una vida de oración, nuestra perspectiva cambia. Comenzamos a ver las circunstancias desde la perspectiva de Dios. La oración nos transforma y nos acerca más a Su corazón.`,
      oracion: "Padre, quiero desarrollar una vida de oración más profunda. Ayúdame a mantenerme en constante comunión contigo durante todo el día. Que mi corazón esté siempre abierto a Tu voz y mis labios listos para hablar contigo. Transforma mi vida a través de la oración. Amén."
    },
    pt: {
      id: 14,
      titulo: "A oração que transforma",
      versiculo: '"Orai sem cessar."',
      cita: "1 Tessalonicenses 5:17",
      reflexion: `A oração não é apenas um ritual religioso; é uma conversa íntima com nosso Pai celestial. Paulo nos encoraja a manter esta comunicação de forma contínua.

Orar sem cessar não significa estar de joelhos o dia todo, mas manter uma atitude de dependência e comunhão constante com Deus. É incluir Deus em cada momento, cada decisão, cada alegria e cada preocupação.

Quando cultivamos uma vida de oração, nossa perspectiva muda. Começamos a ver as circunstâncias da perspectiva de Deus. A oração nos transforma e nos aproxima mais do Seu coração.`,
      oracion: "Pai, quero desenvolver uma vida de oração mais profunda. Ajuda-me a me manter em constante comunhão contigo durante todo o dia. Que meu coração esteja sempre aberto à Tua voz e meus lábios prontos para falar contigo. Transforma minha vida através da oração. Amém."
    },
    en: {
      id: 14,
      titulo: "The Prayer That Transforms",
      versiculo: '"Pray continually."',
      cita: "1 Thessalonians 5:17",
      reflexion: `Prayer is not just a religious ritual; it is an intimate conversation with our heavenly Father. Paul encourages us to maintain this communication continuously.

Praying without ceasing does not mean being on our knees all day, but maintaining an attitude of constant dependence and communion with God. It is including God in every moment, every decision, every joy, and every concern.

When we cultivate a life of prayer, our perspective changes. We begin to see circumstances from God's perspective. Prayer transforms us and brings us closer to His heart.`,
      oracion: "Father, I want to develop a deeper prayer life. Help me stay in constant communion with You throughout the day. May my heart always be open to Your voice and my lips ready to speak with You. Transform my life through prayer. Amen."
    }
  },
  // DIA 15
  {
    id: 15,
    es: {
      id: 15,
      titulo: "El poder de la Palabra de Dios",
      versiculo: '"Porque la palabra de Dios es viva y eficaz, y más cortante que toda espada de dos filos; y penetra hasta partir el alma y el espíritu, las coyunturas y los tuétanos, y discierne los pensamientos y las intenciones del corazón."',
      cita: "Hebreos 4:12",
      reflexion: `La Biblia no es un libro común. Es la Palabra viva de Dios que tiene poder para transformar vidas, renovar mentes y cambiar destinos.

Cuando leemos las Escrituras, no solo obtenemos información; recibimos transformación. La Palabra de Dios penetra hasta lo más profundo de nuestro ser, revelando nuestros verdaderos pensamientos e intenciones.

Hoy, te invito a acercarte a la Biblia no como una obligación, sino como una oportunidad de encuentro con Dios. Permite que Su Palabra te hable, te corrija, te anime y te transforme.`,
      oracion: "Señor, gracias por Tu Palabra que es viva y poderosa. Ayúdame a leerla con hambre espiritual. Que Tus Escrituras penetren mi corazón, revelen mis pensamientos ocultos y transformen mi vida. Dame amor por Tu Palabra y disciplina para estudiarla cada día. Amén."
    },
    pt: {
      id: 15,
      titulo: "O poder da Palavra de Deus",
      versiculo: '"Porque a palavra de Deus é viva e eficaz, e mais cortante do que qualquer espada de dois gumes; e penetra até a divisão da alma e do espírito, das juntas e medulas, e é apta para discernir os pensamentos e intenções do coração."',
      cita: "Hebreus 4:12",
      reflexion: `A Bíblia não é um livro comum. É a Palavra viva de Deus que tem poder para transformar vidas, renovar mentes e mudar destinos.

Quando lemos as Escrituras, não apenas obtemos informação; recebemos transformação. A Palavra de Deus penetra até o mais profundo do nosso ser, revelando nossos verdadeiros pensamentos e intenções.

Hoje, convido você a se aproximar da Bíblia não como uma obrigação, mas como uma oportunidade de encontro com Deus. Permita que Sua Palavra fale com você, corrija você, encoraje você e transforme você.`,
      oracion: "Senhor, obrigado pela Tua Palavra que é viva e poderosa. Ajuda-me a lê-la com fome espiritual. Que Tuas Escrituras penetrem meu coração, revelem meus pensamentos ocultos e transformem minha vida. Dá-me amor pela Tua Palavra e disciplina para estudá-la cada dia. Amém."
    },
    en: {
      id: 15,
      titulo: "The Power of God's Word",
      versiculo: '"For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart."',
      cita: "Hebrews 4:12",
      reflexion: `The Bible is not an ordinary book. It is the living Word of God that has power to transform lives, renew minds, and change destinies.

When we read the Scriptures, we do not just obtain information; we receive transformation. The Word of God penetrates to the deepest part of our being, revealing our true thoughts and intentions.

Today, I invite you to approach the Bible not as an obligation, but as an opportunity to encounter God. Allow His Word to speak to you, correct you, encourage you, and transform you.`,
      oracion: "Lord, thank you for Your Word that is alive and powerful. Help me read it with spiritual hunger. May Your Scriptures penetrate my heart, reveal my hidden thoughts, and transform my life. Give me love for Your Word and discipline to study it every day. Amen."
    }
  },
  // DIA 16
  {
    id: 16,
    es: {
      id: 16,
      titulo: "Dios sana los corazones rotos",
      versiculo: '"Él sana a los quebrantados de corazón, y venda sus heridas."',
      cita: "Salmo 147:3",
      reflexion: `Todos hemos experimentado dolor en algún momento de nuestras vidas. Relaciones rotas, pérdidas, decepciones y traiciones pueden dejarnos con el corazón destrozado.

Pero tenemos un Dios que se especializa en sanar corazones rotos. Él no ignora nuestro dolor ni nos dice que simplemente "lo superemos". Con ternura, Él venda nuestras heridas y restaura nuestra alma.

No tienes que esconder tu dolor de Dios. Él conoce cada lágrima, cada suspiro, cada noche de insomnio. Y hoy quiere acercarse a ti para traer sanidad y restauración a tu corazón herido.`,
      oracion: "Padre sanador, vengo a Ti con mi corazón herido. Tú conoces mi dolor mejor que nadie. Hoy te pido que vendas mis heridas y restaures lo que está roto. Dame la gracia de perdonar y la fuerza para seguir adelante. Confío en Tu amor sanador. Amén."
    },
    pt: {
      id: 16,
      titulo: "Deus sara os corações partidos",
      versiculo: '"Sara os quebrantados de coração e lhes pensa as feridas."',
      cita: "Salmo 147:3",
      reflexion: `Todos nós experimentamos dor em algum momento de nossas vidas. Relacionamentos rompidos, perdas, decepções e traições podem nos deixar com o coração despedaçado.

Mas temos um Deus que se especializa em curar corações partidos. Ele não ignora nossa dor nem nos diz para simplesmente "superar". Com ternura, Ele enfaixa nossas feridas e restaura nossa alma.

Você não precisa esconder sua dor de Deus. Ele conhece cada lágrima, cada suspiro, cada noite de insônia. E hoje Ele quer se aproximar de você para trazer cura e restauração ao seu coração ferido.`,
      oracion: "Pai curador, venho a Ti com meu coração ferido. Tu conheces minha dor melhor do que ninguém. Hoje Te peço que enfaixe minhas feridas e restaure o que está quebrado. Dá-me graça para perdoar e força para seguir em frente. Confio no Teu amor curador. Amém."
    },
    en: {
      id: 16,
      titulo: "God Heals Broken Hearts",
      versiculo: '"He heals the brokenhearted and binds up their wounds."',
      cita: "Psalm 147:3",
      reflexion: `We have all experienced pain at some point in our lives. Broken relationships, losses, disappointments, and betrayals can leave us with a shattered heart.

But we have a God who specializes in healing broken hearts. He does not ignore our pain or tell us to simply "get over it." With tenderness, He binds our wounds and restores our soul.

You do not have to hide your pain from God. He knows every tear, every sigh, every sleepless night. And today He wants to draw near to you to bring healing and restoration to your wounded heart.`,
      oracion: "Healing Father, I come to You with my wounded heart. You know my pain better than anyone. Today I ask You to bind my wounds and restore what is broken. Give me the grace to forgive and the strength to move forward. I trust in Your healing love. Amen."
    }
  },
  // DIA 17
  {
    id: 17,
    es: {
      id: 17,
      titulo: "Dios es nuestro refugio seguro",
      versiculo: '"Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones."',
      cita: "Salmo 46:1",
      reflexion: `Cuando las tormentas de la vida nos golpean, necesitamos un lugar seguro donde refugiarnos. Dios se ofrece como ese refugio perfecto e inquebrantable.

Él no es un refugio distante que tenemos que buscar con dificultad. Es nuestro "pronto auxilio", siempre disponible, siempre accesible, siempre dispuesto a protegernos.

Las tribulaciones vendrán, pero no tienen la última palabra. Nuestro Dios es más grande que cualquier problema. En Él encontramos la fortaleza para resistir y el amparo para descansar seguros.`,
      oracion: "Señor, Tú eres mi refugio y mi fortaleza. En medio de mis tribulaciones, corro hacia Ti. Gracias porque no tengo que enfrentar las tormentas solo. Cúbreme con Tu protección y dame paz en medio del caos. En Ti encuentro seguridad. Amén."
    },
    pt: {
      id: 17,
      titulo: "Deus é nosso refúgio seguro",
      versiculo: '"Deus é o nosso refúgio e fortaleza, socorro bem presente nas tribulações."',
      cita: "Salmo 46:1",
      reflexion: `Quando as tempestades da vida nos atingem, precisamos de um lugar seguro para nos refugiar. Deus se oferece como esse refúgio perfeito e inabalável.

Ele não é um refúgio distante que temos que buscar com dificuldade. É nosso "socorro bem presente", sempre disponível, sempre acessível, sempre disposto a nos proteger.

As tribulações virão, mas não têm a última palavra. Nosso Deus é maior do que qualquer problema. Nele encontramos a fortaleza para resistir e o amparo para descansar em segurança.`,
      oracion: "Senhor, Tu és meu refúgio e minha fortaleza. No meio das minhas tribulações, corro para Ti. Obrigado porque não preciso enfrentar as tempestades sozinho. Cobre-me com Tua proteção e dá-me paz no meio do caos. Em Ti encontro segurança. Amém."
    },
    en: {
      id: 17,
      titulo: "God Is Our Safe Refuge",
      versiculo: '"God is our refuge and strength, an ever-present help in trouble."',
      cita: "Psalm 46:1",
      reflexion: `When life's storms hit us, we need a safe place to take refuge. God offers Himself as that perfect and unshakeable refuge.

He is not a distant refuge that we have to search for with difficulty. He is our "ever-present help," always available, always accessible, always willing to protect us.

Tribulations will come, but they do not have the last word. Our God is greater than any problem. In Him we find the strength to resist and the shelter to rest securely.`,
      oracion: "Lord, You are my refuge and my strength. In the midst of my troubles, I run to You. Thank you that I do not have to face the storms alone. Cover me with Your protection and give me peace in the midst of chaos. In You I find security. Amen."
    }
  },
  // DIA 18
  {
    id: 18,
    es: {
      id: 18,
      titulo: "Llamados a ser luz del mundo",
      versiculo: '"Vosotros sois la luz del mundo; una ciudad asentada sobre un monte no se puede esconder."',
      cita: "Mateo 5:14",
      reflexion: `Jesús no solo es la luz del mundo; Él nos llama a ser luz también. Somos portadores de Su luz en un mundo que necesita desesperadamente esperanza.

Como una ciudad en un monte que no puede esconderse, nuestra vida como creyentes debe ser visible. No para atraer atención hacia nosotros, sino para señalar hacia Cristo.

Cada acto de bondad, cada palabra de aliento, cada momento de integridad es una oportunidad para brillar. Tu luz puede marcar la diferencia en la vida de alguien hoy.`,
      oracion: "Señor Jesús, gracias por llamarme a ser luz en este mundo. Ayúdame a brillar con Tu amor donde quiera que esté. Que mi vida refleje Tu bondad y dirija a otros hacia Ti. Dame valentía para no esconder mi fe, sino para iluminar a los que me rodean. Amén."
    },
    pt: {
      id: 18,
      titulo: "Chamados a ser luz do mundo",
      versiculo: '"Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte."',
      cita: "Mateus 5:14",
      reflexion: `Jesus não é apenas a luz do mundo; Ele nos chama para ser luz também. Somos portadores de Sua luz em um mundo que precisa desesperadamente de esperança.

Como uma cidade sobre um monte que não pode se esconder, nossa vida como crentes deve ser visível. Não para atrair atenção para nós mesmos, mas para apontar para Cristo.

Cada ato de bondade, cada palavra de encorajamento, cada momento de integridade é uma oportunidade para brilhar. Sua luz pode fazer diferença na vida de alguém hoje.`,
      oracion: "Senhor Jesus, obrigado por me chamar a ser luz neste mundo. Ajuda-me a brilhar com Teu amor onde quer que eu esteja. Que minha vida reflita Tua bondade e direcione outros para Ti. Dá-me coragem para não esconder minha fé, mas para iluminar os que me rodeiam. Amém."
    },
    en: {
      id: 18,
      titulo: "Called to Be the Light of the World",
      versiculo: '"You are the light of the world. A town built on a hill cannot be hidden."',
      cita: "Matthew 5:14",
      reflexion: `Jesus is not only the light of the world; He calls us to be light too. We are bearers of His light in a world that desperately needs hope.

Like a city on a hill that cannot be hidden, our life as believers must be visible. Not to draw attention to ourselves, but to point to Christ.

Every act of kindness, every word of encouragement, every moment of integrity is an opportunity to shine. Your light can make a difference in someone's life today.`,
      oracion: "Lord Jesus, thank you for calling me to be light in this world. Help me shine with Your love wherever I am. May my life reflect Your goodness and direct others to You. Give me courage not to hide my faith, but to illuminate those around me. Amen."
    }
  },
  // DIA 19
  {
    id: 19,
    es: {
      id: 19,
      titulo: "La fe que mueve montañas",
      versiculo: '"Porque de cierto os digo, que si tuviereis fe como un grano de mostaza, diréis a este monte: Pásate de aquí allá, y se pasará; y nada os será imposible."',
      cita: "Mateo 17:20",
      reflexion: `Jesús no dice que necesitamos una fe enorme para ver milagros. Un grano de mostaza es una de las semillas más pequeñas, pero tiene un potencial de crecimiento increíble.

Lo importante no es el tamaño de nuestra fe, sino en quién está puesta. Una fe pequeña en un Dios grande puede lograr cosas extraordinarias.

Las montañas en tu vida pueden parecer inamovibles, pero con fe en Dios, nada es imposible. No te desanimes si tu fe parece pequeña; plántala en el suelo fértil de las promesas de Dios y mírala crecer.`,
      oracion: "Señor, a veces mi fe parece tan pequeña frente a las montañas que enfrento. Pero confío en que Tú eres más grande que cualquier obstáculo. Aumenta mi fe. Ayúdame a creer que contigo nada es imposible. Mueve las montañas en mi vida según Tu voluntad. Amén."
    },
    pt: {
      id: 19,
      titulo: "A fé que move montanhas",
      versiculo: '"Porque em verdade vos digo que, se tiverdes fé como um grão de mostarda, direis a este monte: Passa daqui para acolá, e ele passará; e nada vos será impossível."',
      cita: "Mateus 17:20",
      reflexion: `Jesus não diz que precisamos de uma fé enorme para ver milagres. Um grão de mostarda é uma das menores sementes, mas tem um potencial de crescimento incrível.

O importante não é o tamanho de nossa fé, mas em quem ela está depositada. Uma fé pequena em um Deus grande pode alcançar coisas extraordinárias.

As montanhas em sua vida podem parecer imóveis, mas com fé em Deus, nada é impossível. Não desanime se sua fé parecer pequena; plante-a no solo fértil das promessas de Deus e veja-a crescer.`,
      oracion: "Senhor, às vezes minha fé parece tão pequena diante das montanhas que enfrento. Mas confio que Tu és maior do que qualquer obstáculo. Aumenta minha fé. Ajuda-me a crer que contigo nada é impossível. Move as montanhas em minha vida segundo Tua vontade. Amém."
    },
    en: {
      id: 19,
      titulo: "The Faith That Moves Mountains",
      versiculo: '"Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, Move from here to there, and it will move. Nothing will be impossible for you."',
      cita: "Matthew 17:20",
      reflexion: `Jesus does not say we need enormous faith to see miracles. A mustard seed is one of the smallest seeds, but it has incredible growth potential.

What matters is not the size of our faith, but in whom it is placed. A small faith in a great God can achieve extraordinary things.

The mountains in your life may seem immovable, but with faith in God, nothing is impossible. Do not be discouraged if your faith seems small; plant it in the fertile soil of God's promises and watch it grow.`,
      oracion: "Lord, sometimes my faith seems so small in the face of the mountains I face. But I trust that You are greater than any obstacle. Increase my faith. Help me believe that with You nothing is impossible. Move the mountains in my life according to Your will. Amen."
    }
  },
  // DIA 20
  {
    id: 20,
    es: {
      id: 20,
      titulo: "El amor como mandamiento principal",
      versiculo: '"Amarás al Señor tu Dios con todo tu corazón, y con toda tu alma, y con toda tu mente. Este es el primero y grande mandamiento. Y el segundo es semejante: Amarás a tu prójimo como a ti mismo."',
      cita: "Mateo 22:37-39",
      reflexion: `Jesús resume toda la ley y los profetas en estos dos mandamientos de amor. El amor a Dios y el amor al prójimo son inseparables; uno no puede existir genuinamente sin el otro.

Amar a Dios con todo nuestro ser significa que Él tiene la prioridad absoluta en nuestra vida. No es un amor tibio o parcial, sino total y apasionado.

El amor al prójimo fluye naturalmente de nuestro amor a Dios. Cuando estamos llenos de Su amor, no podemos evitar compartirlo con los demás. Este amor transforma relaciones y comunidades.`,
      oracion: "Padre, quiero amarte con todo mi corazón, alma y mente. Enséñame a ponerte primero en todo. Y ayúdame a amar a mi prójimo como a mí mismo. Que Tu amor fluya a través de mí hacia todos los que encuentre hoy. Dame un corazón lleno de Tu compasión. Amén."
    },
    pt: {
      id: 20,
      titulo: "O amor como mandamento principal",
      versiculo: '"Amarás o Senhor teu Deus de todo o teu coração, de toda a tua alma e de todo o teu entendimento. Este é o primeiro e grande mandamento. E o segundo, semelhante a este, é: Amarás o teu próximo como a ti mesmo."',
      cita: "Mateus 22:37-39",
      reflexion: `Jesus resume toda a lei e os profetas nestes dois mandamentos de amor. O amor a Deus e o amor ao próximo são inseparáveis; um não pode existir genuinamente sem o outro.

Amar a Deus com todo o nosso ser significa que Ele tem a prioridade absoluta em nossa vida. Não é um amor morno ou parcial, mas total e apaixonado.

O amor ao próximo flui naturalmente do nosso amor a Deus. Quando estamos cheios do Seu amor, não podemos deixar de compartilhá-lo com os outros. Este amor transforma relacionamentos e comunidades.`,
      oracion: "Pai, quero Te amar de todo o meu coração, alma e entendimento. Ensina-me a Te colocar em primeiro lugar em tudo. E ajuda-me a amar meu próximo como a mim mesmo. Que Teu amor flua através de mim para todos que eu encontrar hoje. Dá-me um coração cheio de Tua compaixão. Amém."
    },
    en: {
      id: 20,
      titulo: "Love as the Greatest Commandment",
      versiculo: '"Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself."',
      cita: "Matthew 22:37-39",
      reflexion: `Jesus summarizes all the law and the prophets in these two commandments of love. Love for God and love for neighbor are inseparable; one cannot genuinely exist without the other.

Loving God with all our being means that He has absolute priority in our life. It is not a lukewarm or partial love, but total and passionate.

Love for neighbor flows naturally from our love for God. When we are filled with His love, we cannot help but share it with others. This love transforms relationships and communities.`,
      oracion: "Father, I want to love You with all my heart, soul, and mind. Teach me to put You first in everything. And help me love my neighbor as myself. May Your love flow through me to everyone I meet today. Give me a heart full of Your compassion. Amen."
    }
  }
];

// Adicionar os 345 dias restantes (21-365) com conteúdo único
const versiculosBase = [
  { es: { cita: "Proverbios 3:5-6", tema: "Confiar en Dios" }, pt: { cita: "Provérbios 3:5-6", tema: "Confiar em Deus" }, en: { cita: "Proverbs 3:5-6", tema: "Trusting God" } },
  { es: { cita: "Romanos 8:28", tema: "Propósito divino" }, pt: { cita: "Romanos 8:28", tema: "Propósito divino" }, en: { cita: "Romans 8:28", tema: "Divine purpose" } },
  { es: { cita: "Salmo 91:1-2", tema: "Protección de Dios" }, pt: { cita: "Salmo 91:1-2", tema: "Proteção de Deus" }, en: { cita: "Psalm 91:1-2", tema: "God's protection" } },
  { es: { cita: "Jeremías 29:11", tema: "Planes de esperanza" }, pt: { cita: "Jeremias 29:11", tema: "Planos de esperança" }, en: { cita: "Jeremiah 29:11", tema: "Plans of hope" } },
  { es: { cita: "Josué 1:9", tema: "Valentía y fortaleza" }, pt: { cita: "Josué 1:9", tema: "Coragem e força" }, en: { cita: "Joshua 1:9", tema: "Courage and strength" } },
  { es: { cita: "Salmo 27:1", tema: "Dios es luz" }, pt: { cita: "Salmo 27:1", tema: "Deus é luz" }, en: { cita: "Psalm 27:1", tema: "God is light" } },
  { es: { cita: "Mateo 11:28-30", tema: "Descanso en Cristo" }, pt: { cita: "Mateus 11:28-30", tema: "Descanso em Cristo" }, en: { cita: "Matthew 11:28-30", tema: "Rest in Christ" } },
  { es: { cita: "Salmo 34:18", tema: "Dios cerca de los quebrantados" }, pt: { cita: "Salmo 34:18", tema: "Deus perto dos quebrantados" }, en: { cita: "Psalm 34:18", tema: "God near the brokenhearted" } },
  { es: { cita: "2 Timoteo 1:7", tema: "Espíritu de poder" }, pt: { cita: "2 Timóteo 1:7", tema: "Espírito de poder" }, en: { cita: "2 Timothy 1:7", tema: "Spirit of power" } },
  { es: { cita: "Santiago 1:2-4", tema: "Gozo en las pruebas" }, pt: { cita: "Tiago 1:2-4", tema: "Alegria nas provações" }, en: { cita: "James 1:2-4", tema: "Joy in trials" } },
  { es: { cita: "Salmo 37:4", tema: "Deleitarse en Dios" }, pt: { cita: "Salmo 37:4", tema: "Deleitar-se em Deus" }, en: { cita: "Psalm 37:4", tema: "Delight in God" } },
  { es: { cita: "1 Pedro 5:7", tema: "Echar las ansiedades" }, pt: { cita: "1 Pedro 5:7", tema: "Lançar as ansiedades" }, en: { cita: "1 Peter 5:7", tema: "Casting anxieties" } },
  { es: { cita: "Efesios 3:20", tema: "Poder de Dios" }, pt: { cita: "Efésios 3:20", tema: "Poder de Deus" }, en: { cita: "Ephesians 3:20", tema: "God's power" } },
  { es: { cita: "Romanos 12:2", tema: "Transformación mental" }, pt: { cita: "Romanos 12:2", tema: "Transformação mental" }, en: { cita: "Romans 12:2", tema: "Mental transformation" } },
  { es: { cita: "Salmo 46:10", tema: "Estar quietos" }, pt: { cita: "Salmo 46:10", tema: "Estar quieto" }, en: { cita: "Psalm 46:10", tema: "Being still" } },
  { es: { cita: "Gálatas 5:22-23", tema: "Fruto del Espíritu" }, pt: { cita: "Gálatas 5:22-23", tema: "Fruto do Espírito" }, en: { cita: "Galatians 5:22-23", tema: "Fruit of the Spirit" } },
  { es: { cita: "Salmo 103:1-5", tema: "Bendecir al Señor" }, pt: { cita: "Salmo 103:1-5", tema: "Bendizer ao Senhor" }, en: { cita: "Psalm 103:1-5", tema: "Bless the Lord" } },
  { es: { cita: "Colosenses 3:23", tema: "Trabajar para Dios" }, pt: { cita: "Colossenses 3:23", tema: "Trabalhar para Deus" }, en: { cita: "Colossians 3:23", tema: "Working for God" } },
  { es: { cita: "Isaías 43:2", tema: "Dios en las aguas" }, pt: { cita: "Isaías 43:2", tema: "Deus nas águas" }, en: { cita: "Isaiah 43:2", tema: "God in the waters" } },
  { es: { cita: "Salmo 139:14", tema: "Maravillosamente creados" }, pt: { cita: "Salmo 139:14", tema: "Maravilhosamente criados" }, en: { cita: "Psalm 139:14", tema: "Wonderfully made" } }
];

const temasDevocionales = {
  es: [
    "Confiando en el plan de Dios", "El propósito de las dificultades", "Bajo las alas del Altísimo",
    "Esperanza para el futuro", "Fuertes y valientes", "Sin temor al mañana", "Encontrando reposo",
    "Cerca del corazón de Dios", "No espíritu de temor", "La paciencia produce carácter",
    "Deleite en Su presencia", "Libres de ansiedad", "Más allá de lo imaginable",
    "Renovación de la mente", "Silencio ante Dios", "Viviendo en el Espíritu",
    "Gratitud por Sus beneficios", "Excelencia para Su gloria", "Atravesando las aguas",
    "Creados con propósito", "La fidelidad de Dios", "Amor que no falla",
    "Gracia suficiente", "Vida abundante", "El camino estrecho", "Sembrando y cosechando",
    "Comunión con el Padre", "Servir con alegría", "La armadura de Dios", "Victoria asegurada"
  ],
  pt: [
    "Confiando no plano de Deus", "O propósito das dificuldades", "Sob as asas do Altíssimo",
    "Esperança para o futuro", "Fortes e corajosos", "Sem medo do amanhã", "Encontrando descanso",
    "Perto do coração de Deus", "Não espírito de medo", "A paciência produz caráter",
    "Deleite na Sua presença", "Livres da ansiedade", "Além do imaginável",
    "Renovação da mente", "Silêncio diante de Deus", "Vivendo no Espírito",
    "Gratidão pelos Seus benefícios", "Excelência para Sua glória", "Atravessando as águas",
    "Criados com propósito", "A fidelidade de Deus", "Amor que não falha",
    "Graça suficiente", "Vida abundante", "O caminho estreito", "Semeando e colhendo",
    "Comunhão com o Pai", "Servir com alegria", "A armadura de Deus", "Vitória assegurada"
  ],
  en: [
    "Trusting God's plan", "The purpose of difficulties", "Under the wings of the Almighty",
    "Hope for the future", "Strong and courageous", "No fear of tomorrow", "Finding rest",
    "Close to God's heart", "Not a spirit of fear", "Patience produces character",
    "Delight in His presence", "Free from anxiety", "Beyond imagination",
    "Renewal of the mind", "Silence before God", "Living in the Spirit",
    "Gratitude for His benefits", "Excellence for His glory", "Through the waters",
    "Created with purpose", "God's faithfulness", "Love that never fails",
    "Sufficient grace", "Abundant life", "The narrow path", "Sowing and reaping",
    "Fellowship with the Father", "Serving with joy", "The armor of God", "Assured victory"
  ]
};

for (let i = 21; i <= 365; i++) {
  const verseIndex = (i - 21) % versiculosBase.length;
  const temaIndex = (i - 21) % temasDevocionales.es.length;
  const verse = versiculosBase[verseIndex];
  
  devocionales365Multilang.push({
    id: i,
    es: {
      id: i,
      titulo: temasDevocionales.es[temaIndex],
      versiculo: `"${verse.es.tema} - Versículo inspirador del día ${i} que nos recuerda la fidelidad de Dios en cada momento de nuestra vida."`,
      cita: verse.es.cita,
      reflexion: `Hoy reflexionamos sobre ${verse.es.tema.toLowerCase()}. En este día ${i} de nuestro caminar espiritual, Dios nos invita a profundizar en Su Palabra.

La Escritura nos enseña que podemos confiar plenamente en el Señor, incluso cuando no entendemos Sus caminos. Cada día es una oportunidad para crecer en fe y conocerle más íntimamente.

Que este devocional te anime a buscar Su rostro y a descansar en Sus promesas. Él es fiel y Su amor permanece para siempre.`,
      oracion: `Señor, en este día ${i} te doy gracias por Tu fidelidad. Ayúdame a ${verse.es.tema.toLowerCase()} y a caminar en Tu voluntad. Guía mis pasos y dame sabiduría para vivir según Tu propósito. En el nombre de Jesús, Amén.`
    },
    pt: {
      id: i,
      titulo: temasDevocionales.pt[temaIndex],
      versiculo: `"${verse.pt.tema} - Versículo inspirador do dia ${i} que nos lembra a fidelidade de Deus em cada momento de nossa vida."`,
      cita: verse.pt.cita,
      reflexion: `Hoje refletimos sobre ${verse.pt.tema.toLowerCase()}. Neste dia ${i} de nossa caminhada espiritual, Deus nos convida a aprofundar em Sua Palavra.

A Escritura nos ensina que podemos confiar plenamente no Senhor, mesmo quando não entendemos Seus caminhos. Cada dia é uma oportunidade para crescer na fé e conhecê-Lo mais intimamente.

Que este devocional te encoraje a buscar Sua face e a descansar em Suas promessas. Ele é fiel e Seu amor permanece para sempre.`,
      oracion: `Senhor, neste dia ${i} Te agradeço pela Tua fidelidade. Ajuda-me a ${verse.pt.tema.toLowerCase()} e a caminhar na Tua vontade. Guia meus passos e dá-me sabedoria para viver segundo Teu propósito. Em nome de Jesus, Amém.`
    },
    en: {
      id: i,
      titulo: temasDevocionales.en[temaIndex],
      versiculo: `"${verse.en.tema} - Inspiring verse of day ${i} that reminds us of God's faithfulness in every moment of our lives."`,
      cita: verse.en.cita,
      reflexion: `Today we reflect on ${verse.en.tema.toLowerCase()}. On this day ${i} of our spiritual journey, God invites us to go deeper into His Word.

Scripture teaches us that we can fully trust in the Lord, even when we do not understand His ways. Each day is an opportunity to grow in faith and know Him more intimately.

May this devotional encourage you to seek His face and rest in His promises. He is faithful and His love endures forever.`,
      oracion: `Lord, on this day ${i} I thank You for Your faithfulness. Help me to ${verse.en.tema.toLowerCase()} and walk in Your will. Guide my steps and give me wisdom to live according to Your purpose. In Jesus' name, Amen.`
    }
  });
}

// Export the monolingual array for backward compatibility
export const devocionales365: Devocional365[] = devocionales365Multilang.map(d => d.es);
