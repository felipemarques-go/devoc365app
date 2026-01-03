import { Language } from '@/context/LanguageContext';
import { getDayOfYear } from './devocionales365';

interface GuideContent {
  protection: {
    title: string;
    content: string;
    prayer: string;
  };
  prosperity: {
    title: string;
    content: string;
    prayer: string;
  };
}

// Protection verses and content
const protectionVerses = {
  es: [
    { verse: 'Salmos 91:1-2', content: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.' },
    { verse: 'Salmos 34:7', content: 'El ángel de Jehová acampa alrededor de los que le temen, y los defiende.' },
    { verse: 'Isaías 54:17', content: 'Ninguna arma forjada contra ti prosperará, y condenarás toda lengua que se levante contra ti en juicio.' },
    { verse: 'Salmos 121:7-8', content: 'Jehová te guardará de todo mal; él guardará tu alma. Jehová guardará tu salida y tu entrada desde ahora y para siempre.' },
    { verse: 'Proverbios 18:10', content: 'Torre fuerte es el nombre de Jehová; a él correrá el justo, y será levantado.' },
    { verse: '2 Tesalonicenses 3:3', content: 'Pero fiel es el Señor, que os afirmará y guardará del mal.' },
    { verse: 'Salmos 46:1', content: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.' },
    { verse: 'Deuteronomio 31:6', content: 'Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo.' },
    { verse: 'Salmos 27:1', content: 'Jehová es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?' },
    { verse: 'Romanos 8:31', content: 'Si Dios es por nosotros, ¿quién contra nosotros?' },
    { verse: 'Nahúm 1:7', content: 'Jehová es bueno, fortaleza en el día de la angustia; y conoce a los que en él confían.' },
    { verse: 'Salmos 91:11', content: 'Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.' },
  ],
  pt: [
    { verse: 'Salmos 91:1-2', content: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.' },
    { verse: 'Salmos 34:7', content: 'O anjo do Senhor acampa-se ao redor dos que o temem, e os livra.' },
    { verse: 'Isaías 54:17', content: 'Toda arma forjada contra ti não prosperará, e toda língua que se levantar contra ti em juízo tu a condenarás.' },
    { verse: 'Salmos 121:7-8', content: 'O Senhor te guardará de todo o mal; guardará a tua alma. O Senhor guardará a tua entrada e a tua saída, desde agora e para sempre.' },
    { verse: 'Provérbios 18:10', content: 'O nome do Senhor é uma torre forte; a ela corre o justo, e está em alto refúgio.' },
    { verse: '2 Tessalonicenses 3:3', content: 'Mas fiel é o Senhor, que vos confirmará, e guardará do maligno.' },
    { verse: 'Salmos 46:1', content: 'Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.' },
    { verse: 'Deuteronômio 31:6', content: 'Esforçai-vos, e animai-vos; não temais, nem vos espanteis diante deles, porque o Senhor teu Deus é o que vai contigo.' },
    { verse: 'Salmos 27:1', content: 'O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?' },
    { verse: 'Romanos 8:31', content: 'Se Deus é por nós, quem será contra nós?' },
    { verse: 'Naum 1:7', content: 'O Senhor é bom, uma fortaleza no dia da angústia, e conhece os que confiam nele.' },
    { verse: 'Salmos 91:11', content: 'Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos.' },
  ],
  en: [
    { verse: 'Psalm 91:1-2', content: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, "He is my refuge and my fortress, my God, in whom I trust."' },
    { verse: 'Psalm 34:7', content: 'The angel of the Lord encamps around those who fear him, and he delivers them.' },
    { verse: 'Isaiah 54:17', content: 'No weapon forged against you will prevail, and you will refute every tongue that accuses you.' },
    { verse: 'Psalm 121:7-8', content: 'The Lord will keep you from all harm—he will watch over your life; the Lord will watch over your coming and going both now and forevermore.' },
    { verse: 'Proverbs 18:10', content: 'The name of the Lord is a fortified tower; the righteous run to it and are safe.' },
    { verse: '2 Thessalonians 3:3', content: 'But the Lord is faithful, and he will strengthen you and protect you from the evil one.' },
    { verse: 'Psalm 46:1', content: 'God is our refuge and strength, an ever-present help in trouble.' },
    { verse: 'Deuteronomy 31:6', content: 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you.' },
    { verse: 'Psalm 27:1', content: 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?' },
    { verse: 'Romans 8:31', content: 'If God is for us, who can be against us?' },
    { verse: 'Nahum 1:7', content: 'The Lord is good, a refuge in times of trouble. He cares for those who trust in him.' },
    { verse: 'Psalm 91:11', content: 'For he will command his angels concerning you to guard you in all your ways.' },
  ],
};

// Prosperity verses and content
const prosperityVerses = {
  es: [
    { verse: 'Jeremías 29:11', content: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.' },
    { verse: 'Filipenses 4:19', content: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.' },
    { verse: 'Deuteronomio 28:12', content: 'Te abrirá Jehová su buen tesoro, el cielo, para enviar la lluvia a tu tierra en su tiempo, y para bendecir toda obra de tus manos.' },
    { verse: 'Proverbios 10:22', content: 'La bendición de Jehová es la que enriquece, y no añade tristeza con ella.' },
    { verse: 'Josué 1:8', content: 'Este libro de la ley no se apartará de tu boca... entonces harás prosperar tu camino, y todo te saldrá bien.' },
    { verse: 'Malaquías 3:10', content: 'Traed todos los diezmos al alfolí... y probadme ahora en esto, si no os abriré las ventanas de los cielos.' },
    { verse: '3 Juan 1:2', content: 'Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud, así como prospera tu alma.' },
    { verse: 'Salmos 1:3', content: 'Será como árbol plantado junto a corrientes de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace, prosperará.' },
    { verse: 'Proverbios 3:9-10', content: 'Honra a Jehová con tus bienes... y serán satisfechos tus graneros con abundancia.' },
    { verse: 'Isaías 48:17', content: 'Yo soy Jehová Dios tuyo, que te enseña provechosamente, que te encamina por el camino que debes seguir.' },
    { verse: 'Deuteronomio 8:18', content: 'Acuérdate de Jehová tu Dios, porque él te da el poder para hacer las riquezas.' },
    { verse: 'Salmos 37:4', content: 'Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón.' },
  ],
  pt: [
    { verse: 'Jeremias 29:11', content: 'Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de lhes causar dano, planos de dar-lhes esperança e um futuro.' },
    { verse: 'Filipenses 4:19', content: 'O meu Deus suprirá todas as necessidades de vocês, de acordo com as suas gloriosas riquezas em Cristo Jesus.' },
    { verse: 'Deuteronômio 28:12', content: 'O Senhor abrirá o céu, o seu bom tesouro, para enviar chuva à sua terra no tempo certo e para abençoar todo o trabalho das suas mãos.' },
    { verse: 'Provérbios 10:22', content: 'A bênção do Senhor traz riqueza, e ele não acrescenta a ela nenhum pesar.' },
    { verse: 'Josué 1:8', content: 'Não deixe de falar as palavras deste Livro da Lei... Então você prosperará e será bem-sucedido.' },
    { verse: 'Malaquias 3:10', content: 'Tragam o dízimo todo ao depósito do templo... Vejam se não vou abrir as comportas dos céus.' },
    { verse: '3 João 1:2', content: 'Amado, desejo que você tenha boa saúde e prosperidade em tudo, assim como sua alma prospera.' },
    { verse: 'Salmos 1:3', content: 'Ele é como árvore plantada à beira de águas correntes: Dá fruto no tempo certo e suas folhas não murcham. Tudo o que ele faz prospera!' },
    { verse: 'Provérbios 3:9-10', content: 'Honre o Senhor com todos os seus recursos... os seus celeiros ficarão cheios.' },
    { verse: 'Isaías 48:17', content: 'Eu sou o Senhor, o seu Deus, que lhe ensina o que é melhor para você, que o guia pelo caminho por onde você deve ir.' },
    { verse: 'Deuteronômio 8:18', content: 'Lembre-se do Senhor, o seu Deus, pois é ele que lhe dá a capacidade de produzir riqueza.' },
    { verse: 'Salmos 37:4', content: 'Deleite-se no Senhor, e ele atenderá aos desejos do seu coração.' },
  ],
  en: [
    { verse: 'Jeremiah 29:11', content: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' },
    { verse: 'Philippians 4:19', content: 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.' },
    { verse: 'Deuteronomy 28:12', content: 'The Lord will open the heavens, the storehouse of his bounty, to send rain on your land in season and to bless all the work of your hands.' },
    { verse: 'Proverbs 10:22', content: 'The blessing of the Lord brings wealth, without painful toil for it.' },
    { verse: 'Joshua 1:8', content: 'Keep this Book of the Law always on your lips... Then you will be prosperous and successful.' },
    { verse: 'Malachi 3:10', content: 'Bring the whole tithe into the storehouse... See if I will not throw open the floodgates of heaven.' },
    { verse: '3 John 1:2', content: 'Dear friend, I pray that you may enjoy good health and that all may go well with you, even as your soul is getting along well.' },
    { verse: 'Psalm 1:3', content: 'That person is like a tree planted by streams of water, which yields its fruit in season. Whatever they do prospers.' },
    { verse: 'Proverbs 3:9-10', content: 'Honor the Lord with your wealth... then your barns will be filled to overflowing.' },
    { verse: 'Isaiah 48:17', content: 'I am the Lord your God, who teaches you what is best for you, who directs you in the way you should go.' },
    { verse: 'Deuteronomy 8:18', content: 'Remember the Lord your God, for it is he who gives you the ability to produce wealth.' },
    { verse: 'Psalm 37:4', content: 'Take delight in the Lord, and he will give you the desires of your heart.' },
  ],
};

// Prayers for protection
const protectionPrayers = {
  es: [
    'Padre celestial, te pido que cubras mi vida, mi familia y todo lo que amo con Tu manto protector. Declaro que ningún arma forjada contra nosotros prosperará. Envía Tus ángeles a acampar alrededor nuestro. Amén.',
    'Señor, Tú eres mi refugio y fortaleza. Me escondo bajo la sombra de Tus alas. Protégeme del mal visible e invisible. Guarda mis pasos y dirige mi camino en seguridad. Amén.',
    'Dios todopoderoso, levanta un cerco de protección alrededor de mi hogar. Que Tu presencia sea nuestra defensa. Aleja de nosotros todo peligro y maldad. En el nombre de Jesús. Amén.',
  ],
  pt: [
    'Pai celestial, peço que cubras minha vida, minha família e tudo o que amo com Teu manto protetor. Declaro que nenhuma arma forjada contra nós prosperará. Envia Teus anjos para acampar ao nosso redor. Amém.',
    'Senhor, Tu és meu refúgio e fortaleza. Me escondo sob a sombra das Tuas asas. Protege-me do mal visível e invisível. Guarda meus passos e dirige meu caminho em segurança. Amém.',
    'Deus todo-poderoso, levanta uma cerca de proteção ao redor do meu lar. Que Tua presença seja nossa defesa. Afasta de nós todo perigo e maldade. Em nome de Jesus. Amém.',
  ],
  en: [
    'Heavenly Father, I ask that You cover my life, my family, and everything I love with Your protective mantle. I declare that no weapon formed against us shall prosper. Send Your angels to camp around us. Amen.',
    'Lord, You are my refuge and fortress. I hide under the shadow of Your wings. Protect me from visible and invisible evil. Guard my steps and direct my path in safety. Amen.',
    'Almighty God, raise a hedge of protection around my home. May Your presence be our defense. Keep all danger and evil away from us. In Jesus name. Amen.',
  ],
};

// Prayers for prosperity
const prosperityPrayers = {
  es: [
    'Señor, abre las ventanas de los cielos sobre mi vida. Derrama bendiciones que no pueda contener. Dame sabiduría para administrar los recursos que me das y un corazón generoso para bendecir a otros. Amén.',
    'Padre, Tú conoces mis necesidades antes de que las pida. Confío en que suplirás todo conforme a Tus riquezas en gloria. Bendice el trabajo de mis manos y hazme prosperar para Tu gloria. Amén.',
    'Dios de abundancia, enséñame a honrarte con mis bienes. Que la prosperidad de mi alma se refleje en todas las áreas de mi vida. Guíame por el camino de la verdadera riqueza que viene de Ti. Amén.',
  ],
  pt: [
    'Senhor, abre as janelas do céu sobre minha vida. Derrama bênçãos que eu não possa conter. Dá-me sabedoria para administrar os recursos que me dás e um coração generoso para abençoar outros. Amém.',
    'Pai, Tu conheces minhas necessidades antes de eu pedir. Confio que suprirás tudo conforme as Tuas riquezas na glória. Abençoa o trabalho das minhas mãos e faze-me prosperar para Tua glória. Amém.',
    'Deus de abundância, ensina-me a Te honrar com meus bens. Que a prosperidade da minha alma se reflita em todas as áreas da minha vida. Guia-me pelo caminho da verdadeira riqueza que vem de Ti. Amém.',
  ],
  en: [
    'Lord, open the windows of heaven over my life. Pour out blessings I cannot contain. Give me wisdom to manage the resources You provide and a generous heart to bless others. Amen.',
    'Father, You know my needs before I ask. I trust that You will supply all according to Your riches in glory. Bless the work of my hands and make me prosper for Your glory. Amen.',
    'God of abundance, teach me to honor You with my possessions. May the prosperity of my soul be reflected in every area of my life. Guide me on the path of true wealth that comes from You. Amen.',
  ],
};

export function getGuidesForDay(date: Date = new Date(), language: Language): GuideContent {
  const dayOfYear = getDayOfYear(date);
  const protectionIndex = (dayOfYear - 1) % protectionVerses[language].length;
  const prosperityIndex = (dayOfYear - 1) % prosperityVerses[language].length;
  const prayerIndex = (dayOfYear - 1) % protectionPrayers[language].length;

  const protection = protectionVerses[language][protectionIndex];
  const prosperity = prosperityVerses[language][prosperityIndex];

  const titles = {
    es: { protection: 'Guía de Protección', prosperity: 'Guía de Prosperidad' },
    pt: { protection: 'Guia de Proteção', prosperity: 'Guia de Prosperidade' },
    en: { protection: 'Protection Guide', prosperity: 'Prosperity Guide' },
  };

  return {
    protection: {
      title: titles[language].protection,
      content: `${protection.verse}\n\n"${protection.content}"`,
      prayer: protectionPrayers[language][prayerIndex],
    },
    prosperity: {
      title: titles[language].prosperity,
      content: `${prosperity.verse}\n\n"${prosperity.content}"`,
      prayer: prosperityPrayers[language][prayerIndex],
    },
  };
}
