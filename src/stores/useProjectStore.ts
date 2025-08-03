/**
 * Project store for managing design projects and collaboration
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Project {
  id: string
  name: string
  description?: string
  templateId: string
  thumbnailUrl: string
  createdAt: string
  updatedAt: string
  ownerId: string
  collaborators: string[]
  status: 'draft' | 'published' | 'archived'
  dimensions: {
    width: number
    height: number
    format: string
  }
  elements: ProjectElement[]
}

export interface ProjectElement {
  id: string
  type: 'text' | 'image' | 'shape' | 'logo'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  data: any
}

export interface Comment {
  id: string
  projectId: string
  userId: string
  userName: string
  content: string
  x: number
  y: number
  createdAt: string
  resolved: boolean
}

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  comments: Comment[]
  
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  duplicateProject: (id: string) => void
  setCurrentProject: (project: Project | null) => void
  
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void
  resolveComment: (id: string) => void
  deleteComment: (id: string) => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      comments: [],
      
      createProject: (projectData) => {
        const project: Project = {
          ...projectData,
          id: `project_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        set(state => ({ projects: [...state.projects, project] }))
      },
      
      updateProject: (id, updates) => {
        set(state => ({
          projects: state.projects.map(p => 
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
          currentProject: state.currentProject?.id === id 
            ? { ...state.currentProject, ...updates, updatedAt: new Date().toISOString() }
            : state.currentProject
        }))
      },
      
      deleteProject: (id) => {
        set(state => ({
          projects: state.projects.filter(p => p.id !== id),
          currentProject: state.currentProject?.id === id ? null : state.currentProject
        }))
      },
      
      duplicateProject: (id) => {
        const project = get().projects.find(p => p.id === id)
        if (project) {
          const duplicated: Project = {
            ...project,
            id: `project_${Date.now()}`,
            name: `${project.name} (Copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
          set(state => ({ projects: [...state.projects, duplicated] }))
        }
      },
      
      setCurrentProject: (project) => {
        set({ currentProject: project })
      },
      
      addComment: (commentData) => {
        const comment: Comment = {
          ...commentData,
          id: `comment_${Date.now()}`,
          createdAt: new Date().toISOString(),
          resolved: false
        }
        set(state => ({ comments: [...state.comments, comment] }))
      },
      
      resolveComment: (id) => {
        set(state => ({
          comments: state.comments.map(c => 
            c.id === id ? { ...c, resolved: true } : c
          )
        }))
      },
      
      deleteComment: (id) => {
        set(state => ({
          comments: state.comments.filter(c => c.id !== id)
        }))
      }
    }),
    {
      name: 'project-storage'
    }
  )
)
