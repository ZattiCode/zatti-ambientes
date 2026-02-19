import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';
import { ArrowRight, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const categories: (ProjectCategory | 'Todos')[] = ['Todos', 'Cozinha', 'Quarto', 'Sala', 'Banheiro', 'Escritório'];

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'Todos'>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = activeCategory === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory);

  // Bloquear scroll do body quando modal estiver aberta
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup ao desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject || !selectedProject.gallery) return;
    setCurrentImageIndex((prev) => 
      prev === (selectedProject.gallery?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProject || !selectedProject.gallery) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? (selectedProject.gallery?.length || 1) - 1 : prev - 1
    );
  };

  const getCurrentImage = () => {
    if (!selectedProject) return '';
    if (selectedProject.gallery && selectedProject.gallery.length > 0) {
      return selectedProject.gallery[currentImageIndex];
    }
    return selectedProject.imageUrl;
  };

  const ModalContent = () => (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>
          <X size={24} />
        </button>
        
        <div className="modal-content-grid">
          {/* Left Side: Gallery */}
          <div className="modal-gallery">
            <div className="gallery-main-viewport">
              <img 
                src={getCurrentImage()} 
                alt={selectedProject?.title} 
                className="gallery-main-img loaded"
              />
              
              {/* Navigation Arrows */}
              {selectedProject?.gallery && selectedProject.gallery.length > 1 && (
                <>
                  <button className="gallery-nav-btn gallery-nav-prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                  </button>
                  <button className="gallery-nav-btn gallery-nav-next" onClick={nextImage}>
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {selectedProject?.gallery && selectedProject.gallery.length > 1 && (
              <div className="gallery-thumbnails">
                {selectedProject.gallery.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`gallery-thumb-btn ${currentImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="gallery-thumb-img" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="modal-details">
            <span className="modal-category">{selectedProject?.category}</span>
            <h3 className="modal-title">{selectedProject?.title}</h3>
            
            <p className="modal-desc-long">
              {selectedProject?.longDescription || selectedProject?.description}
            </p>

            {selectedProject?.features && (
              <div className="modal-features">
                <h4 className="feature-title">Destaques do Projeto</h4>
                <div className="feature-list">
                  {selectedProject.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            )}

            <button className="modal-cta" onClick={() => {
                closeModal();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Solicitar Orçamento Similar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Nosso Trabalho</span>
          <h2 className="section-title">Projetos Recentes</h2>
          <p className="section-desc">
            Explore nossa coleção de ambientes transformados. Cada projeto é único, desenhado para refletir a personalidade de quem vive nele.
          </p>
        </div>

        {/* Filters */}
        <div className="filters-wrapper">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : 'inactive'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => openModal(project)}>
              {/* Image */}
              <div className="project-img-wrapper">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="project-img"
                />
                <div className="project-overlay" />
              </div>

              {/* Content Overlay */}
              <div className="project-content">
                <div className="project-content-inner">
                  <span className="project-category">
                    {project.category}
                  </span>
                  <h3 className="project-title">
                    {project.title}
                  </h3>
                  <p className="project-desc">
                    {project.description}
                  </p>
                  <button className="btn-project-details">
                    Ver detalhes <ArrowRight size={16} style={{ marginLeft: '0.25rem' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal - Rendered via Portal to escape parent transforms */}
      {selectedProject && createPortal(<ModalContent />, document.body)}
    </section>
  );
};

export default Portfolio;