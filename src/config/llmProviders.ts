import type { LLMProvider } from '../types';

export const availableProviders: Record<LLMProvider, {
  name: string;
  models: string[];
  apiUrl: string;
  maxTokens: number;
  description: string;
}> = {
  'openai': {
    name: 'OpenAI',
    models: ['gpt-3.5-turbo', 'gpt-4'],
    apiUrl: 'https://platform.openai.com/api-keys',
    maxTokens: 4096,
    description: 'Leading commercial LLM provider'
  },
  'anthropic': {
    name: 'Anthropic',
    models: ['claude-2', 'claude-instant'],
    apiUrl: 'https://console.anthropic.com/account/keys',
    maxTokens: 100000,
    description: 'Advanced AI assistant with long context windows'
  },
  'huggingface': {
    name: 'Hugging Face',
    models: ['mistral-7b', 'llama-2', 'falcon-40b'],
    apiUrl: 'https://huggingface.co/settings/tokens',
    maxTokens: 2048,
    description: 'Open-source AI community and model hub'
  },
  'ollama': {
    name: 'Ollama',
    models: ['llama2', 'mistral', 'codellama'],
    apiUrl: 'http://localhost:11434',
    maxTokens: 4096,
    description: 'Run large language models locally'
  },
  'google-palm': {
    name: 'Google PaLM',
    models: ['text-bison-001'],
    apiUrl: 'https://makersuite.google.com/app/apikey',
    maxTokens: 8192,
    description: 'Google\'s language model API'
  }
};