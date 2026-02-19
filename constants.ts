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
    name: 'Ana Souza',
    role: 'Arquiteta',
    text: 'A precisão nos acabamentos da Zatti Ambientes e o cumprimento dos prazos tornam a marca minha parceira número um.',
    avatarUrl: 'https://picsum.photos/100/100?random=10'
  },
  {
    id: '2',
    name: 'Roberto Campos',
    role: 'Cliente Residencial',
    text: 'Minha cozinha ficou exatamente como sonhei. O projeto 3D da Zatti bateu perfeitamente com a realidade.',
    avatarUrl: 'https://picsum.photos/100/100?random=11'
  },
  {
    id: '3',
    name: 'Mariana Lima',
    role: 'Empresária',
    text: 'O escritório da minha empresa ganhou outra vida com os móveis da Zatti. Funcionalidade e beleza unidas.',
    avatarUrl: 'https://picsum.photos/100/100?random=12'
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    role: 'Advogado',
    text: 'Profissionalismo do início ao fim. A montagem foi limpa e rápida. Recomendo de olhos fechados.',
    avatarUrl: 'https://picsum.photos/100/100?random=13'
  },
  {
    id: '5',
    name: 'Fernanda Oliveira',
    role: 'Médica',
    text: 'Amei meu closet! Cada detalhe foi pensado para aproveitar o espaço. O LED interno deu um toque especial.',
    avatarUrl: 'https://picsum.photos/100/100?random=14'
  },
  {
    id: '6',
    name: 'Lucas Pereira',
    role: 'Chef de Cozinha',
    text: 'Como chef, preciso de funcionalidade. A Zatti entendeu minha rotina e criou uma cozinha perfeita.',
    avatarUrl: 'https://picsum.photos/100/100?random=15'
  },
  {
    id: '7',
    name: 'Patrícia Santos',
    role: 'Designer de Interiores',
    text: 'A qualidade do MDF e das ferragens é superior. Meus clientes sempre ficam satisfeitos com a durabilidade.',
    avatarUrl: 'https://picsum.photos/100/100?random=16'
  },
  {
    id: '8',
    name: 'Ricardo Alves',
    role: 'Empresário',
    text: 'Fizemos toda a mobília da sede nova. O ambiente corporativo ficou moderno e acolhedor.',
    avatarUrl: 'https://picsum.photos/100/100?random=17'
  },
  {
    id: '9',
    name: 'Juliana Costa',
    role: 'Cliente Residencial',
    text: 'O atendimento pós-venda é excelente. Tive um pequeno ajuste e resolveram no dia seguinte.',
    avatarUrl: 'https://picsum.photos/100/100?random=18'
  },
  {
    id: '10',
    name: 'Eduardo Rocha',
    role: 'Engenheiro',
    text: 'Precisão milimétrica. Encaixaram os móveis em paredes fora de esquadro com perfeição.',
    avatarUrl: 'https://picsum.photos/100/100?random=19'
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