import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ChevronRight, CheckCircle2, ChevronLeft, Star } from 'lucide-react';
import { NAV_LINKS, TESTIMONIALS } from './constants';
import Portfolio from './components/Portfolio';
import AIConsultant from './components/AIConsultant';

// Componente para efeito de revelação ao rolar
const RevealOnScroll = ({ children, className = "", delay = "" }: { children: React.ReactNode, className?: string, delay?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className={`fade-up-element ${delay} ${className}`}>
      {children}
    </div>
  );
};

// Componente de Contador Animado
const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const stepTime = Math.abs(Math.floor(duration / end));
          const timer = setInterval(() => {
            start += 1; // Incremento simples, poderia ser acelerado para números grandes
            // Ajuste para números grandes para não demorar demais
            const increment = end > 1000 ? 25 : end > 100 ? 5 : 1; 
            if (start < end) {
               setCount(prev => {
                 const next = prev + increment;
                 return next > end ? end : next;
               });
            } else {
               setCount(end);
               clearInterval(timer);
            }
          }, 10);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // States for Carousel
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  // Resize listener for carousel responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleSlides(3);
      else if (window.innerWidth >= 768) setVisibleSlides(2);
      else setVisibleSlides(1);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      (prev + 1) % (TESTIMONIALS.length - visibleSlides + 1)
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev === 0 ? 0 : prev - 1
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans text-stone-800">
      
      {/* Navigation */}
      <header
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`font-serif text-2xl font-bold tracking-tight transition-colors ${!isScrolled && mobileMenuOpen ? 'text-stone-900' : (!isScrolled ? 'text-white' : 'text-stone-900')}`}>
            Zatti <span className="text-accent">Ambientes</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium hover:text-accent transition-colors ${
                  isScrolled ? 'text-stone-700' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                 isScrolled 
                 ? 'bg-stone-900 text-white hover:bg-accent' 
                 : 'bg-white text-stone-900 hover:bg-stone-100'
              }`}
            >
              Orçamento
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden z-50 ${(!isScrolled && !mobileMenuOpen) ? 'text-white' : 'text-stone-800'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full bg-white shadow-lg border-b border-stone-100 pt-20 pb-6 animate-in slide-in-from-top-5">
            <div className="flex flex-col p-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-800 font-medium py-2 border-b border-stone-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-accent text-white px-6 py-3 rounded-lg text-center font-medium mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/1920/1080?random=20"
            alt="Interior de luxo"
            className="w-full h-full object-cover animate-[pulse_10s_ease-in-out_infinite]"
            style={{ animation: 'none', transition: 'transform 10s ease', transform: 'scale(1.05)' }}
          />
          <div className="absolute inset-0 bg-stone-900/50"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <RevealOnScroll>
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
              Móveis Planejados de Alto Padrão
            </span>
          </RevealOnScroll>
          
          <RevealOnScroll delay="delay-100">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Design que transforma <br />
              <span className="text-accent italic">sua vida</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay="delay-200">
            <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light">
              A Zatti Ambientes une funcionalidade, estética e materiais nobres para criar espaços únicos que contam a sua história.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay="delay-300">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#portfolio"
                className="bg-white text-stone-900 px-8 py-4 rounded-full font-semibold hover:bg-stone-100 transition-colors"
              >
                Ver Portfólio
              </a>
              <a
                href="#contact"
                className="bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-colors backdrop-blur-sm bg-opacity-90"
              >
                Falar com Designer
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* About Us Section (NOVO) */}
      <section id="about" className="py-24 bg-[#333333] text-stone-300">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Texto */}
            <div className="lg:w-1/2 space-y-6">
              <RevealOnScroll>
                <h2 className="font-serif text-4xl font-bold text-white mb-8 border-b border-accent pb-4 inline-block">
                  SOBRE NÓS
                </h2>
              </RevealOnScroll>
              
              <RevealOnScroll delay="delay-100">
                <p className="leading-relaxed">
                  A Zatti Ambientes Planejados nasceu do sonho de transformar casas e empresas em espaços que contam histórias. Fundada por profissionais que somam mais de 20 anos de experiência em móveis planejados, nossa empresa surgiu com um propósito simples e poderoso: unir qualidade, design e atendimento próximo em cada projeto.
                </p>
              </RevealOnScroll>
              
              <RevealOnScroll delay="delay-200">
                <p className="leading-relaxed">
                  Mesmo sendo uma marca jovem, carregamos uma bagagem construída ao longo de décadas de trabalho cuidadoso, atenção aos detalhes e respeito por cada cliente. Desde o primeiro dia, acreditamos que planejar um ambiente é muito mais do que fabricar móveis — é criar cenários que facilitam a rotina e traduzem o jeito de viver de cada pessoa.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay="delay-300">
                <p className="leading-relaxed">
                  Foi essa visão que nos fez conquistar rapidamente a confiança de quem nos escolhe. Ao longo dos últimos anos, ampliamos nossa estrutura, investimos em tecnologia de ponta e formamos uma equipe que compartilha o mesmo compromisso: entregar soluções personalizadas que aliam beleza, funcionalidade e qualidade.
                </p>
                <p className="mt-4 font-serif italic text-white text-lg">
                  "Você sonha. A gente realiza."
                </p>
              </RevealOnScroll>
            </div>

            {/* Imagem/Logo Placeholder */}
            <div className="lg:w-1/2 flex justify-center">
              <RevealOnScroll className="w-full max-w-md bg-[#2a2a2a] p-12 rounded-lg shadow-2xl border border-stone-700 aspect-square flex items-center justify-center">
                 <div className="text-center">
                   <h3 className="font-serif text-5xl text-white tracking-widest mb-2">ZATTI</h3>
                   <div className="h-px w-full bg-accent mb-2"></div>
                   <p className="text-xs tracking-[0.3em] text-stone-400 uppercase">Ambientes Planejados</p>
                 </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Stats Counter */}
          <div className="mt-20 pt-10 border-t border-stone-700 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: 20, suffix: "+", label: "Anos de experiência" },
              { number: 1100, suffix: "+", label: "Clientes atendidos" },
              { number: 1600, suffix: "+", label: "Projetos entregues" },
              { number: 100, suffix: "%", label: "Satisfação garantida" },
            ].map((stat, index) => (
              <RevealOnScroll key={index} delay={`delay-${index * 100}`} className="p-4">
                <div className="font-bold text-4xl md:text-5xl text-white mb-2 font-serif">
                  <CountUp end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-stone-400 uppercase tracking-wide">{stat.label}</div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Component */}
      <RevealOnScroll>
        <Portfolio />
      </RevealOnScroll>

      {/* Services Section */}
      <section id="services" className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <span className="text-accent font-medium tracking-wider uppercase text-sm">Diferenciais</span>
                <h2 className="font-serif text-4xl font-bold text-stone-900 mt-2 mb-6">Por que escolher a Zatti Ambientes?</h2>
                <div className="space-y-6">
                  {[
                    { title: 'Projetos 100% Personalizados', desc: 'Cada milímetro é planejado para o seu espaço e necessidade.' },
                    { title: 'Materiais de Alta Durabilidade', desc: 'Trabalhamos apenas com MDF de primeira linha e ferragens com amortecimento.' },
                    { title: 'Garantia e Assistência', desc: 'Segurança total para seu investimento com assistência técnica garantida.' },
                    { title: 'Prazo de Entrega Rigoroso', desc: 'Respeitamos seu tempo com cronogramas transparentes.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="mt-1 bg-white p-2 rounded-full h-fit shadow-sm text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900">{item.title}</h4>
                        <p className="text-stone-600 text-sm mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
            
            <div className="relative">
              <RevealOnScroll delay="delay-200">
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://picsum.photos/400/500?random=30" alt="Detalhe móvel" className="rounded-2xl shadow-lg mt-8 hover:scale-105 transition-transform duration-500" />
                  <img src="https://picsum.photos/400/500?random=31" alt="Marcenaria" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section id="testimonials" className="py-20 bg-stone-900 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4">O que dizem nossos clientes</h2>
              <div className="w-20 h-1 bg-accent mx-auto"></div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="delay-100">
            <div className="relative max-w-6xl mx-auto">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonialIndex * (100 / visibleSlides)}%)` }}
                >
                  {TESTIMONIALS.map((t) => (
                    <div 
                      key={t.id} 
                      className={`flex-shrink-0 px-4 box-border`}
                      style={{ width: `${100 / visibleSlides}%` }}
                    >
                      <div className="bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-accent transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-2">
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <img src={t.avatarUrl} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/50" />
                            <div>
                              <h4 className="font-bold text-lg">{t.name}</h4>
                              <p className="text-xs text-stone-400 uppercase tracking-wider">{t.role}</p>
                            </div>
                          </div>
                          <p className="text-stone-300 italic leading-relaxed">"{t.text}"</p>
                        </div>
                        <div className="flex text-accent mt-6 gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center mt-10 gap-4">
                <button 
                  onClick={prevTestimonial}
                  disabled={currentTestimonialIndex === 0}
                  className="p-3 rounded-full border border-stone-600 hover:bg-accent hover:border-accent hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  disabled={currentTestimonialIndex >= TESTIMONIALS.length - visibleSlides}
                  className="p-3 rounded-full border border-stone-600 hover:bg-accent hover:border-accent hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <RevealOnScroll>
              <div>
                <span className="text-accent font-medium tracking-wider uppercase text-sm">Contato</span>
                <h2 className="font-serif text-4xl font-bold text-stone-900 mt-2 mb-6">Vamos realizar seu sonho?</h2>
                <p className="text-stone-600 mb-8">
                  Preencha o formulário para agendar uma visita técnica ou solicitar um orçamento preliminar com a equipe Zatti Ambientes.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-stone-700 group">
                    <div className="bg-stone-100 p-3 rounded-full group-hover:bg-accent group-hover:text-white transition-colors"><Phone size={20}/></div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase">Telefone / WhatsApp</p>
                      <p className="font-medium hover:text-accent transition-colors cursor-pointer">(11) 99999-9999</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-stone-700 group">
                    <div className="bg-stone-100 p-3 rounded-full group-hover:bg-accent group-hover:text-white transition-colors"><Mail size={20}/></div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase">Email</p>
                      <p className="font-medium hover:text-accent transition-colors cursor-pointer">contato@zattiambientes.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-stone-700 group">
                    <div className="bg-stone-100 p-3 rounded-full group-hover:bg-accent group-hover:text-white transition-colors"><MapPin size={20}/></div>
                    <div>
                      <p className="text-xs text-stone-500 uppercase">Endereço</p>
                      <p className="font-medium">Curitiba - PR</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-8 rounded-2xl overflow-hidden shadow-lg border border-stone-200 h-[250px] w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.761710829158!2d-49.350899299999995!3d-25.412785799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce15585aec8fd%3A0x12555fa0b5ae795d!2sZatti%20Ambientes%20Planejados!5e0!3m2!1spt-BR!2sbr!4v1752003972329!5m2!1spt-BR!2sbr" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização Zatti Ambientes"
                  ></iframe>
                </div>

                <div className="flex gap-4 mt-8">
                  <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"><Instagram size={20} /></a>
                  <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"><Facebook size={20} /></a>
                  <a href="#" className="p-3 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors"><Linkedin size={20} /></a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay="delay-200">
              <form className="bg-stone-50 p-8 md:p-10 rounded-3xl shadow-sm border border-stone-100 h-full">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Nome</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white transition-all" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Telefone</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white transition-all" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white transition-all" placeholder="seu@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Ambiente de Interesse</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white transition-all text-stone-600">
                      <option>Cozinha Planejada</option>
                      <option>Dormitório</option>
                      <option>Home Office</option>
                      <option>Banheiros</option>
                      <option>Apartamento Completo</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Mensagem</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white transition-all" placeholder="Conte um pouco sobre seu projeto..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl mt-2 transform hover:-translate-y-1">
                    Enviar Solicitação
                  </button>
                </div>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Zatti <span className="text-accent">Ambientes</span></h3>
            <p className="text-sm">© 2024 Zatti Ambientes. Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Overlay */}
      <AIConsultant />
    </div>
  );
}

export default App;