import type { LLMProvider } from '../../types';

export interface LLMResponse {
  text: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LLMService {
  provider: LLMProvider;
  generateResponse: (prompt: string) => Promise<LLMResponse>;
  estimateTokens: (text: string) => number;
}