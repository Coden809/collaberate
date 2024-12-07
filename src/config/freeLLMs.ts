import type { LLMProvider } from '../types';

export const freeLLMProviders: Record<string, {
  name: string;
  models: string[];
  description: string;
  setup: string;
  local: boolean;
}> = {
  'ollama': {
    name: 'Ollama',
    models: [
      'llama2',
      'mistral',
      'codellama',
      'neural-chat',
      'starling-lm',
      'phi'
    ],
    description: 'Run powerful LLMs locally on your machine',
    setup: 'https://ollama.ai/download',
    local: true
  },
  'localai': {
    name: 'LocalAI',
    models: [
      'luna-ai-llama2',
      'gpt4all-j',
      'ggml-gpt4all-j'
    ],
    description: 'Drop-in replacement for OpenAI API that runs locally',
    setup: 'https://localai.io/basics/getting_started/',
    local: true
  },
  'text-generation-webui': {
    name: 'Text Generation WebUI',
    models: [
      'vicuna-13b',
      'alpaca-7b',
      'koala-13b'
    ],
    description: 'Easy-to-use web UI for running LLMs',
    setup: 'https://github.com/oobabooga/text-generation-webui#installation',
    local: true
  }
};