import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';
import { ArrowRight } from 'lucide-react';

const categories: (ProjectCategory | 'Todos')[] = ['Todos', 'Cozinha', 'Quarto', 'Sala', 'Banheiro', 'Escritório'];

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'Todos'>('Todos');

  const filteredProjects = activeCategory === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === activeCategory);

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
            <div key={project.id} className="project-card">
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
    </section>
  );
};

export default Portfolio;