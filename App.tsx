import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ChevronRight, CheckCircle2, ChevronLeft, Star, PhoneCall, PhoneIcon } from 'lucide-react';
import { NAV_LINKS, TESTIMONIALS } from './constants';
import Portfolio from './components/Portfolio';
import AIConsultant from './components/AIConsultant';

// Componente para efeito de revelação ao rolar
const RevealOnScroll = ({ children, className = "", delay = "" }: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: string 
}) => {
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
            start += 1;
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
    <div className="app-container">
      
      {/* Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-content">
          <a href="#" className="logo" style={{ color: !isScrolled && !mobileMenuOpen ? 'white' : 'var(--color-primary)' }}>
            Zatti <span className="text-accent">Ambientes</span>
          </a>

          {/* Desktop Nav */}
          <nav className="nav-desktop">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
                style={{ color: isScrolled ? 'var(--color-primary-light)' : 'rgba(255,255,255,0.9)' }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-budget"
              style={{
                backgroundColor: isScrolled ? 'var(--color-primary)' : 'var(--color-white)',
                color: isScrolled ? 'var(--color-white)' : 'var(--color-primary)'
              }}
            >
              Orçamento
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="btn-menu-mobile"
            style={{ color: (!isScrolled && !mobileMenuOpen) ? 'white' : 'var(--color-primary)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-nav-list">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg-wrapper">
          <img
            src="https://picsum.photos/1920/1080?random=20"
            alt="Interior de luxo"
            className="hero-img"
            style={{ animation: 'none' }} // Assuming animation is handled by CSS class or reset
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <RevealOnScroll>
            <span className="hero-badge">
              Móveis Planejados de Alto Padrão
            </span>
          </RevealOnScroll>
          
          <RevealOnScroll delay="delay-100">
            <h1 className="hero-title">
              Você sonha, <br />
              <span className="text-accent" style={{ fontStyle: 'italic' }}>A gente realiza.</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay="delay-200">
            <p className="hero-desc">
              A Zatti Ambientes une funcionalidade, estética e materiais nobres para criar espaços únicos que contam a sua história.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay="delay-300">
            <div className="hero-buttons">
              <a href="#portfolio" className="btn-hero-primary">
                Ver Portfólio
              </a>
              <a href="#contact" className="btn-hero-secondary">
                Falar com Designer
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            {/* Texto */}
            <div className="about-text">
              <RevealOnScroll>
                <h2 className="about-heading">
                  SOBRE NÓS
                </h2>
              </RevealOnScroll>
              
              <RevealOnScroll delay="delay-100">
                <p className="about-p">
                  A Zatti Ambientes Planejados nasceu do sonho de transformar casas e empresas em espaços que contam histórias. Fundada por profissionais que somam mais de 20 anos de experiência em móveis planejados, nossa empresa surgiu com um propósito simples e poderoso: unir qualidade, design e atendimento próximo em cada projeto.
                </p>
              </RevealOnScroll>
              
              <RevealOnScroll delay="delay-200">
                <p className="about-p">
                  Mesmo sendo uma marca jovem, carregamos uma bagagem construída ao longo de décadas de trabalho cuidadoso, atenção aos detalhes e respeito por cada cliente. Desde o primeiro dia, acreditamos que planejar um ambiente é muito mais do que fabricar móveis — é criar cenários que facilitam a rotina e traduzem o jeito de viver de cada pessoa.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay="delay-300">
                <p className="about-p">
                  Foi essa visão que nos fez conquistar rapidamente a confiança de quem nos escolhe. Ao longo dos últimos anos, ampliamos nossa estrutura, investimos em tecnologia de ponta e formamos uma equipe que compartilha o mesmo compromisso: entregar soluções personalizadas que aliam beleza, funcionalidade e qualidade.
                </p>
                <p className="about-quote">
                  "Você sonha, A gente realiza."
                </p>
              </RevealOnScroll>
            </div>

            {/* Imagem/Logo Placeholder */}
            <div className="about-logo-wrapper">
              <RevealOnScroll>
                 <div className="about-logo-box">
                   <div className="zatti-logo-large text-center">
                     <h3>ZATTI</h3>
                     <div className="zatti-line"></div>
                     <p className="zatti-sub">Ambientes Planejados</p>
                   </div>
                 </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Stats Counter */}
<div className="stats-grid">
  {[
    { number: 20, suffix: "+", label: "Anos de experiência" },
    { number: 1100, suffix: "+", label: "Clientes atendidos" },
    { number: 1600, suffix: "+", label: "Projetos entregues" },
    { number: 100, suffix: "%", label: "Satisfação garantida" },
  ].map((stat, index) => (
    <RevealOnScroll key={index} delay={`delay-${index * 100}`}>
      <div className="stat-number">
        <CountUp end={stat.number} suffix={stat.suffix} />
      </div>
      <div className="stat-label">{stat.label}</div>
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
      <section id="services" className="services-section">
        <div className="container">
          <div className="services-grid">
            <RevealOnScroll>
              <div className="services-list">
                <span className="section-subtitle">Diferenciais</span>
                <h2 className="section-title">Por que escolher a Zatti Ambientes?</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                  {[
                    { title: 'Projetos 100% Personalizados', desc: 'Cada milímetro é planejado para o seu espaço e necessidade.' },
                    { title: 'Materiais de Alta Durabilidade', desc: 'Trabalhamos apenas com MDF de primeira linha e ferragens com amortecimento.' },
                    { title: 'Garantia e Assistência', desc: 'Segurança total para seu investimento com assistência técnica garantida.' },
                    { title: 'Prazo de Entrega Rigoroso', desc: 'Respeitamos seu tempo com cronogramas transparentes.' }
                  ].map((item, idx) => (
                    <div key={idx} className="service-item">
                      <div className="service-icon">
                        <CheckCircle2 size={20} />
                      </div>
                      <div className="service-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
            
            <div className="services-images-wrapper">
              <RevealOnScroll delay="delay-200">
                <div className="services-images">
                  <img src="https://picsum.photos/400/500?random=30" alt="Detalhe móvel" className="service-img" />
                  <img src="https://picsum.photos/400/500?random=31" alt="Marcenaria" className="service-img" />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <h2 className="section-title" style={{ color: 'white' }}>O que dizem nossos clientes</h2>
              <div style={{ width: '5rem', height: '4px', backgroundColor: 'var(--color-accent)', margin: '0 auto' }}></div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="delay-100">
            <div className="carousel-container">
              {/* Carousel Container */}
              <div className="carousel-viewport">
                <div 
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentTestimonialIndex * (100 / visibleSlides)}%)` }}
                >
                  {TESTIMONIALS.map((t) => (
                    <div 
                      key={t.id} 
                      className="carousel-slide"
                      style={{ width: `${100 / visibleSlides}%` }}
                    >
                      <div className="testimonial-card">
                        <div>
                          <div className="testimonial-header">
                            <img src={t.avatarUrl} alt={t.name} className="testimonial-avatar" />
                            <div className="testimonial-info">
                              <h4>{t.name}</h4>
                              <p>{t.role}</p>
                            </div>
                          </div>
                          <p className="testimonial-text">"{t.text}"</p>
                        </div>
                        <div className="testimonial-stars">
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
              <div className="carousel-controls">
                <button 
                  onClick={prevTestimonial}
                  disabled={currentTestimonialIndex === 0}
                  className="carousel-btn"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  disabled={currentTestimonialIndex >= TESTIMONIALS.length - visibleSlides}
                  className="carousel-btn"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-grid">
            <RevealOnScroll>
              <div>
                <span className="section-subtitle">Contato</span>
                <h2 className="section-title">Vamos realizar seu sonho?</h2>
                <p className="section-desc" style={{ marginLeft: 0 }}>
                  Preencha o formulário abaixo ou entre em contato via WhatsApp.
                </p>
                
                <div className="contact-info-list" style={{ marginTop: '2rem' }}>
                  <div className="contact-item">
                    <div className="contact-icon-box"><Phone size={20}/></div>
                    <div>
                      <p className="contact-text-label">Telefone / WhatsApp</p>
                      <p className="contact-text-value"><a href="https://wa.me/5541996452421">(41) 99645-2421</a></p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon-box"><Mail size={20}/></div>
                    <div>
                      <p className="contact-text-label">Email</p>
                      <p className="contact-text-value"><a href="mailto:zattiambientesplanejados@gmail.com">
zattiambientesplanejados@gmail.com</a></p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon-box"><MapPin size={20}/></div>
                    <div>
                      <p className="contact-text-label">Endereço</p>
                      <p className="contact-text-value">Curitiba - PR</p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="map-container">
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

                <div className="contact-socials">
                  <a href="https://www.instagram.com/zattiambientesplanejados/" className="social-btn"><Instagram size={20} /></a>
                  <a href="https://www.facebook.com/people/Zatti-Ambientes-Planejados/61577355928391/" className="social-btn"><Facebook size={20} /></a>
                  <a href="https://wa.me/5541996452421" className="social-btn"><PhoneIcon size={20} /></a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay="delay-200">
              <form className="contact-form-card">
                <div className="form-group">
                  <div className="form-row">
                    <div>
                      <label className="form-label">Nome</label>
                      <input type="text" className="form-input" placeholder="Seu nome completo" />
                    </div>
                    <div>
                      <label className="form-label">Telefone</label>
                      <input type="tel" className="form-input" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="seu@email.com" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Ambiente de Interesse</label>
                    <select className="form-select">
                      <option>Cozinha Planejada</option>
                      <option>Dormitório</option>
                      <option>Home Office</option>
                      <option>Banheiros</option>
                      <option>Apartamento Completo</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Mensagem</label>
                    <textarea rows={4} className="form-textarea" placeholder="Conte um pouco sobre seu projeto..."></textarea>
                  </div>
                  <button type="submit" className="btn-submit">
                    Enviar Solicitação
                  </button>
                </div>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div>
            <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Zatti <span className="text-accent">Ambientes</span></h3>
            <p style={{ fontSize: '0.875rem' }}>© 2024 Zatti Ambientes. Todos os direitos reservados.</p>
          </div>
          <div className="footer-links">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Overlay */}
      <AIConsultant />
    </div>
  );
}

export default App;