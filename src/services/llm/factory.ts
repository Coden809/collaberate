import type { LLMProvider } from '../../types';
import type { LLMService } from './types';
import { OpenAIService } from './openai';
import { AnthropicService } from './anthropic';
import { HuggingFaceService } from './huggingface';

export function createLLMService(provider: LLMProvider, apiKey: string): LLMService {
  switch (provider) {
    case 'openai':
      return new OpenAIService(apiKey);
    case 'anthropic':
      return new AnthropicService(apiKey);
    case 'huggingface':
      return new HuggingFaceService(apiKey);
    default:
      throw new Error(`Unsupported LLM provider: ${provider}`);
  }
}