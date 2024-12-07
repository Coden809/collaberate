import { HfInference } from '@huggingface/inference';
import type { LLMService, LLMResponse } from './types';
import type { LLMProvider } from '../../types';

export class HuggingFaceService implements LLMService {
  private client: HfInference;
  public provider: LLMProvider = 'huggingface';

  constructor(apiKey: string) {
    this.client = new HfInference(apiKey);
  }

  async generateResponse(prompt: string): Promise<LLMResponse> {
    const response = await this.client.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.7,
      },
    });

    return {
      text: response.generated_text,
      usage: {
        promptTokens: this.estimateTokens(prompt),
        completionTokens: this.estimateTokens(response.generated_text),
        totalTokens: 0, // Will be calculated in the service
      },
    };
  }

  estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}