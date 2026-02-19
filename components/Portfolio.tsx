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
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-accent font-medium tracking-wider uppercase text-sm">Nosso Trabalho</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-4">Projetos Recentes</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Explore nossa coleção de ambientes transformados. Cada projeto é único, desenhado para refletir a personalidade de quem vive nele.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-accent hover:text-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-xl">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">
                    {project.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <button className="flex items-center text-sm font-semibold text-stone-900 hover:text-accent transition-colors">
                    Ver detalhes <ArrowRight size={16} className="ml-1" />
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
