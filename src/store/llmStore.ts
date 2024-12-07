import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { APIKeys, LLMProvider } from '../types';

interface LLMState {
  apiKeys: APIKeys;
  setAPIKey: (provider: LLMProvider, key: string) => void;
  removeAPIKey: (provider: LLMProvider) => void;
}

export const useLLMStore = create<LLMState>()(
  persist(
    (set) => ({
      apiKeys: {},
      setAPIKey: (provider, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key }
        })),
      removeAPIKey: (provider) =>
        set((state) => {
          const newKeys = { ...state.apiKeys };
          delete newKeys[provider];
          return { apiKeys: newKeys };
        }),
    }),
    {
      name: 'llm-api-keys',
    }
  )
);