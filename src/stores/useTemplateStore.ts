/**
 * Template store for managing design templates and categories
 */
import { create } from 'zustand'

export interface Template {
  id: string
  name: string
  description: string
  category: string
  thumbnailUrl: string
  previewUrl: string
  dimensions: {
    width: number
    height: number
    format: string
  }
  tags: string[]
  isPremium: boolean
  elements: any[]
}

interface TemplateState {
  templates: Template[]
  categories: string[]
  selectedCategory: string
  searchQuery: string
  
  setTemplates: (templates: Template[]) => void
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  getFilteredTemplates: () => Template[]
}

// Mock template data
const mockTemplates: Template[] = [
  {
    id: 'template_1',
    name: 'Concert Night',
    description: 'Perfect for music events and concerts',
    category: 'Concert',
    thumbnailUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/a4d2de55-77c2-4edd-81bd-e922eaf7d805.jpg',
    previewUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/a4d2de55-77c2-4edd-81bd-e922eaf7d805.jpg',
    dimensions: { width: 1080, height: 1080, format: 'Instagram Square' },
    tags: ['music', 'concert', 'event', 'night'],
    isPremium: false,
    elements: []
  },
  {
    id: 'template_2',
    name: 'Business Conference',
    description: 'Professional template for corporate events',
    category: 'Conference',
    thumbnailUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/ac657280-63d7-433b-a680-97d575594070.jpg',
    previewUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/ac657280-63d7-433b-a680-97d575594070.jpg',
    dimensions: { width: 1200, height: 630, format: 'Facebook Event' },
    tags: ['business', 'conference', 'corporate', 'professional'],
    isPremium: false,
    elements: []
  },
  {
    id: 'template_3',
    name: 'Team Meeting',
    description: 'Simple and clean for team meetings',
    category: 'Meeting',
    thumbnailUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/20027b0e-0cbe-436a-a180-549a7b2694cd.jpg',
    previewUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/20027b0e-0cbe-436a-a180-549a7b2694cd.jpg',
    dimensions: { width: 1080, height: 1920, format: 'Instagram Story' },
    tags: ['meeting', 'team', 'corporate', 'simple'],
    isPremium: false,
    elements: []
  },
  {
    id: 'template_4',
    name: 'Workshop Series',
    description: 'Educational workshop template',
    category: 'Workshop',
    thumbnailUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/f213a27e-4730-4ff9-943d-ebc762d663bf.jpg',
    previewUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/f213a27e-4730-4ff9-943d-ebc762d663bf.jpg',
    dimensions: { width: 1080, height: 1080, format: 'Instagram Square' },
    tags: ['workshop', 'education', 'learning', 'series'],
    isPremium: true,
    elements: []
  },
  {
    id: 'template_5',
    name: 'Festival Vibes',
    description: 'Colorful template for festivals',
    category: 'Festival',
    thumbnailUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/59d4fac3-e2c8-42a5-8c97-1a1da4cc38ae.jpg',
    previewUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/59d4fac3-e2c8-42a5-8c97-1a1da4cc38ae.jpg',
    dimensions: { width: 1080, height: 1350, format: 'Instagram Portrait' },
    tags: ['festival', 'music', 'colorful', 'vibrant'],
    isPremium: true,
    elements: []
  },
  {
    id: 'template_6',
    name: 'Networking Event',
    description: 'Professional networking template',
    category: 'Networking',
    thumbnailUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/2da812bc-ab74-4d75-9808-957476066d53.jpg',
    previewUrl: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/2da812bc-ab74-4d75-9808-957476066d53.jpg',
    dimensions: { width: 1200, height: 630, format: 'LinkedIn Event' },
    tags: ['networking', 'professional', 'business', 'connection'],
    isPremium: false,
    elements: []
  }
]

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: mockTemplates,
  categories: ['All', 'Concert', 'Conference', 'Meeting', 'Workshop', 'Festival', 'Networking'],
  selectedCategory: 'All',
  searchQuery: '',
  
  setTemplates: (templates) => set({ templates }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFilteredTemplates: () => {
    const { templates, selectedCategory, searchQuery } = get()
    let filtered = templates
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(t => t.category === selectedCategory)
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return filtered
  }
}))
