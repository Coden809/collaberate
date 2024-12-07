export type LLMProvider = 
  | 'openai'
  | 'anthropic'
  | 'huggingface'
  | 'ollama'
  | 'google-palm';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  apiKey?: string;
  maxTokens: number;
  usedTokens: number;
}

export interface LLM {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  response: string;
  config: LLMConfig;
}

export interface Project {
  id: string;
  prompt: string;
  llms: LLM[];
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}

export interface APIKeys {
  [key in LLMProvider]?: string;
}