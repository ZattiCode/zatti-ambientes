import { Project, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cozinha Minimalista Areia',
    category: 'Cozinha',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    description: 'Armários em MDF ultra-fosco cor areia com puxadores ocultos e ilha central em quartzo.'
  },
  {
    id: '2',
    title: 'Suíte Master Luxo',
    category: 'Quarto',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Guarda-roupas com portas de vidro reflecta bronze e iluminação interna em LED.'
  },
  {
    id: '3',
    title: 'Home Office Executivo',
    category: 'Escritório',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Mesa ampla em madeira nobre, estante vazada com estrutura metálica preta.'
  },
  {
    id: '4',
    title: 'Living Integrado',
    category: 'Sala',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    description: 'Painel ripado em freijó integrando sala de TV e jantar com bar oculto.'
  },
  {
    id: '5',
    title: 'Banheiro Spa',
    category: 'Banheiro',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    description: 'Gabinete suspenso com cuba esculpida e espelho orgânico com backlight.'
  },
  {
    id: '6',
    title: 'Cozinha Gourmet Dark',
    category: 'Cozinha',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    description: 'Tons de cinza chumbo e preto, eletrodomésticos embutidos e bancada em granito preto absoluto.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Gohu Chagas',
    role: 'Cliente Residencial',
    text: 'Empresa simplesmente fantástica, cumpriram a entrega e montagem do meu home office muito antes do prazo! A equipe comercial é excelente, sempre respondem de prontidão e tiram todas as dúvidas! E quanto ao material me surpreendi positivamente, tudo de excelente qualidade, recomendo fortemente a Zatti!',
    avatarUrl: '/avatars/cliente 1.png',
  },
  {
    id: '2',
    name: 'Juliana Antunes',
    role: 'Cliente Residencial',
    text: 'Lucas e sua equipe são profissionais impecáveis! Atendimento primoroso e pra mim o maior diferencial é entrega. Com prazo definido e sem atrasos. Adoramos os trabalhos que realizamos com a Zatti e certamente faremos novos projetos!',
    avatarUrl: '/avatars/cliente 2.png',
  },
  {
    id: '3',
    name: 'Silvia Di Buenno',
    role: 'Empresária',
    text: 'Sonhei muitos anos com a minha casa, minha cozinha, meus móveis, até que comprei meu apartamento, fechei com outra empresa pois ainda não conhecia a Zatti, levei um golpe e fiquei algum tempo sem móveis. Este mês minha cozinha foi montada pela equipe da Patrícia e Lucas da Zatti e estou me sentindo realizada, cada pedacinho planejado com carinho, montado do jeitinho que eu esperava, com estilo, qualidade e muito carinho. Eu só tenho a agradecer por participarem da realização de um sonho. Deus abençoe sempre. Super recomendo!',
    avatarUrl: '/avatars/cliente 3.png',
  },
  {
    id: '4',
    name: 'Atomic MotorSport',
    role: 'Empresa',
    text: 'Lucas e toda equipe Entregam um serviço de primeira, tanto na parte de material, e mao de obra. Os móveis da nossa empresa ficaram muito lindos e bem acabados. Sempre recomendo.',
    avatarUrl: '/avatars/cliente 4.png',
  },
  {
    id: '5',
    name: 'Carol Schmidt',
    role: 'Dentista',
    text: 'Eu não tenho palavras para expressar minha satisfação com a Zatti ambientes. A Patrícia do início ao fim foi super atenciosa dando atenção a cada detalhe. Eu não conseguia fechar minha agenda de segunda a quinta para montagem dos móveis, o montador se dispôs a fazer a montagem no sábado a terça para que eu conseguisse trabalhar na quarta, isso só mostra a importância que a empresa dá a seus clientes. Agora a parte do acabamento dos móveis, superou qualquer expectativa, eu recomendo eles de olhos fechados, atendimento, atenção, qualidade impecável dos móveis',
    avatarUrl: '/avatars/cliente 5.png',
  },
  {
    id: '6',
    name: 'Gustavo Duarte',
    role: 'Cliente Residencial',
    text: 'Fui muito bem atendido pelo Lucas, me entregaram os móveis dentro do prazo e qualidade no geral me agradou muito, desde o atendimento, material e instalação, muito bom mesmo, recomendo.',
    avatarUrl: '/avatars/cliente 6.png',
  },
  {
    id: '7',
    name: 'Vinicius Silva',
    role: 'Empresário',
    text: 'Melhor empresa de móveis de Curitiba e Santa Catarina! Foram incríveis e me auxiliaram desde o início e ainda com um preço incrível, condição de pagamento excelente. Com certeza farei meus próximos móveis com eles !',
    avatarUrl: '/avatars/cliente 7.png',
  },
  {
    id: '8',
    name: 'Luiza Ferreira',
    role: 'Empresário',
    text: 'Tivemos uma excelente experiência com a Zatti em atendimento, cumprimento de prazos, resolução de problemas de maneira rápida.. apenas elogios! Indico demais',
    avatarUrl: '/avatars/cliente 8.png',
  },
  {
    id: '9',
    name: 'Ana Carolina',
    role: 'Cliente Residencial',
    text: 'O atendimento foi ótimo desde o início do projeto até a entrega e a montagem. Cumpriram com o prazo e a qualidade é ótima. Toda a equipe é muito gentil e prestativa. Super recomendo.',
    avatarUrl: '/avatars/cliente 9.png',
  },
  {
    id: '10',
    name: 'Manoel Oliveira',
    role: 'Empresário',
    text: 'Foi perfeita! Já fiz dois negócios com a empresa. Cumpre o prazo de entrega. Os montadores são educados e deixam o ambiente limpo. Super recomendo. Não vão se arrepender.',
    avatarUrl: '/avatars/cliente 10.png',
  }
];

export const NAV_LINKS = [
  { name: 'Início', href: '#home' },
  { name: 'Sobre Nós', href: '#about' },
  { name: 'Portfólio', href: '#portfolio' },
  { name: 'Serviços', href: '#services' },
  { name: 'Depoimentos', href: '#testimonials' },
  { name: 'Contato', href: '#contact' },
];