import Anthropic from 'anthropic';
import type { LLMService, LLMResponse } from './types';
import type { LLMProvider } from '../../types';

export class AnthropicService implements LLMService {
  private client: Anthropic;
  public provider: LLMProvider = 'anthropic';

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateResponse(prompt: string): Promise<LLMResponse> {
    const response = await this.client.messages.create({
      model: 'claude-2',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    return {
      text: response.content[0]?.text || '',
      usage: {
        promptTokens: this.estimateTokens(prompt),
        completionTokens: this.estimateTokens(response.content[0]?.text || ''),
        totalTokens: 0, // Will be calculated in the service
      },
    };
  }

  estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}