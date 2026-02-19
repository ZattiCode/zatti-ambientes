import { Project, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Home Office Executivo',
    category: 'Escritório',
    imageUrl: '/assets/projetos/background.png',
    description: 'Armários em MDF ultra-fosco cor areia com puxadores ocultos e ilha central em quartzo.',
    longDescription: 'Este projeto prioriza a pureza visual e a funcionalidade. Utilizamos MDF Ultra-fosco na cor Areia, que proporciona um toque aveludado e não marca digitais. A bancada em Quartzo Branco Puro cria uma ilha central robusta, ideal para preparo e refeições rápidas. As ferragens Blum com amortecimento garantem silêncio e durabilidade.',
    gallery: [
      '/assets/projetos/background.png',
      '/assets/projetos/escritorio2.png',
      '/assets/projetos/escritorio3.png',
    ],
    features: ['MDF Ultra-fosco', 'Puxadores Ocultos', 'Iluminação LED embutida', 'Ilha em Quartzo']
  },
  {
    id: '2',
    title: 'Suíte Master Luxo',
    category: 'Quarto',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Composição moderna em MDF Grafite ultra-fosco com painel ripado em carvalho e nichos iluminados.',
    longDescription: 'Este projeto equilibra a sobriedade dos tons escuros com o calor da madeira natural. Utilizamos MDF Ultra-fosco na cor Grafite, que oferece um toque aveludado e resistência a digitais, em contraste com o painel ripado em Carvalho que amplia a sensação de conforto. A marcenaria inteligente inclui uma estante aérea com LED embutido e um nicho dedicado para café, otimizando cada centímetro do ambiente de trabalho.',
    gallery: [
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=201',
      'https://picsum.photos/800/600?random=202'
    ],
    features: ['MDF Grafite Matte', 'Painel Ripado Carvalho', 'Iluminação LED Linear', 'Nicho para Café']
  },
  {
    id: '3',
    title: 'Home Office Executivo',
    category: 'Escritório',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Mesa ampla em madeira nobre, estante vazada com estrutura metálica preta.',
    longDescription: 'Para este escritório, unimos o rústico da madeira Freijó com o industrial da serralheria preta. A estante vazada serve como divisória de ambiente sem bloquear a luz natural. A mesa possui calha para organização de cabos e carregamento por indução embutido na marcenaria.',
    gallery: [
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=301',
      'https://picsum.photos/800/600?random=302'
    ],
    features: ['Madeira Freijó', 'Serralheria Industrial', 'Gestão de Cabos', 'Iluminação Focal']
  },
  {
    id: '4',
    title: 'Living Integrado',
    category: 'Sala',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    description: 'Painel ripado em freijó integrando sala de TV e jantar com bar oculto.',
    longDescription: 'A integração foi a chave deste projeto. O painel ripado percorre toda a parede principal, camuflando a porta de entrada e o acesso ao lavabo. Um nicho iluminado em mármore Travertino serve de apoio para a TV, enquanto um bar oculto se revela ao abrir as portas coplanares.',
    gallery: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=401',
      'https://picsum.photos/800/600?random=402'
    ],
    features: ['Painel Ripado', 'Portas Coplanares', 'Mármore Travertino', 'Camuflagem de Portas']
  },
  {
    id: '5',
    title: 'Banheiro Spa',
    category: 'Banheiro',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    description: 'Gabinete suspenso com cuba esculpida e espelho orgânico com backlight.',
    longDescription: 'Transformamos um banheiro comum em um SPA particular. O gabinete em MDF Naval (resistente à umidade) sustenta uma cuba esculpida em porcelanato. O espelho com formato orgânico possui retroiluminação em LED 3000k, criando uma atmosfera relaxante para o banho.',
    gallery: [
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=501',
      'https://picsum.photos/800/600?random=502'
    ],
    features: ['MDF Naval', 'Cuba Esculpida', 'Espelho Orgânico', 'LED 3000k']
  },
  {
    id: '6',
    title: 'Cozinha Gourmet Dark',
    category: 'Cozinha',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    description: 'Tons de cinza chumbo e preto, eletrodomésticos embutidos e bancada em granito preto absoluto.',
    longDescription: 'Uma cozinha ousada e sofisticada. Utilizamos o padrão Grafite Intenso em toda a marcenaria, contrastando com puxadores em Cobre. A torre quente abriga forno e micro-ondas embutidos. A cristaleira com portas de vidro fumê traz leveza ao conjunto robusto.',
    gallery: [
      'https://picsum.photos/800/600?random=6',
      'https://picsum.photos/800/600?random=601',
      'https://picsum.photos/800/600?random=602',
      'https://picsum.photos/800/600?random=603'
    ],
    features: ['Padrão Grafite', 'Vidro Fumê', 'Torre Quente', 'Puxadores Cobre']
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