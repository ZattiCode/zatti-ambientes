export type ProjectCategory = 'Cozinha' | 'Quarto' | 'Banheiro' | 'Escritório' | 'Sala';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  imageUrl: string;
  description: string;
  // Novos campos para detalhes
  longDescription?: string;
  gallery?: string[];
  features?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatarUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}