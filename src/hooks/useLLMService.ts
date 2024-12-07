import { useCallback } from 'react';
import { useLLMStore } from '../store/llmStore';
import { createLLMService } from '../services/llm/factory';
import type { LLMProvider } from '../types';

export function useLLMService() {
  const apiKeys = useLLMStore((state) => state.apiKeys);

  const getService = useCallback((provider: LLMProvider) => {
    const apiKey = apiKeys[provider];
    if (!apiKey) {
      throw new Error(`No API key found for provider: ${provider}`);
    }
    return createLLMService(provider, apiKey);
  }, [apiKeys]);

  return { getService };
}