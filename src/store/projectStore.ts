import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Project, LLM } from '../types';

interface ProjectState {
  currentProject: Project | null;
  projects: Project[];
  createProject: (prompt: string) => void;
  updateLLMResponse: (projectId: string, llmId: string, response: string) => void;
  syncLLMResponses: (projectId: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  projects: [],
  
  createProject: (prompt) => {
    const newProject: Project = {
      id: nanoid(),
      prompt,
      llms: [
        {
          id: nanoid(),
          name: 'Code Architect',
          description: 'Specializes in system design and architecture',
          status: 'idle',
          response: '',
          config: {
            provider: 'openai',
            model: 'gpt-4',
            maxTokens: 4096,
            usedTokens: 0
          }
        },
        {
          id: nanoid(),
          name: 'UI Expert',
          description: 'Focuses on user interface and experience',
          status: 'idle',
          response: '',
          config: {
            provider: 'anthropic',
            model: 'claude-2',
            maxTokens: 100000,
            usedTokens: 0
          }
        },
        {
          id: nanoid(),
          name: 'Logic Builder',
          description: 'Handles business logic and data flow',
          status: 'idle',
          response: '',
          config: {
            provider: 'huggingface',
            model: 'mistral-7b',
            maxTokens: 2048,
            usedTokens: 0
          }
        },
      ],
      status: 'pending',
      createdAt: new Date(),
    };

    set((state) => ({
      projects: [...state.projects, newProject],
      currentProject: newProject,
    }));
  },

  updateLLMResponse: (projectId, llmId, response) => {
    set((state) => ({
      projects: state.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            llms: project.llms.map((llm) => {
              if (llm.id === llmId) {
                return {
                  ...llm,
                  response,
                  status: 'completed',
                };
              }
              return llm;
            }),
          };
        }
        return project;
      }),
    }));
  },

  syncLLMResponses: (projectId) => {
    set((state) => ({
      projects: state.projects.map((project) => {
        if (project.id === projectId) {
          const allCompleted = project.llms.every(
            (llm) => llm.status === 'completed'
          );
          return {
            ...project,
            status: allCompleted ? 'completed' : 'in-progress',
          };
        }
        return project;
      }),
    }));
  },
}));