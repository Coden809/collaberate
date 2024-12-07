import React, { useState } from 'react';
import { Key, Plus, Trash2 } from 'lucide-react';
import { useLLMStore } from '../store/llmStore';
import { availableProviders } from '../config/llmProviders';
import type { LLMProvider } from '../types';

export function APIKeyManager() {
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider>('openai');
  const [apiKey, setApiKey] = useState('');
  const { apiKeys, setAPIKey, removeAPIKey } = useLLMStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setAPIKey(selectedProvider, apiKey.trim());
      setApiKey('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
      <div className="flex items-center space-x-2 mb-6">
        <Key className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">API Key Management</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value as LLMProvider)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {Object.entries(availableProviders).map(([id, provider]) => (
                <option key={id} value={id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key"
                className="flex-1 rounded-md border border-gray-300 p-2"
              />
              <button
                type="submit"
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Configured APIs</h3>
        <div className="space-y-2">
          {Object.entries(apiKeys).map(([provider, key]) => (
            <div
              key={provider}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
            >
              <div>
                <span className="font-medium">
                  {availableProviders[provider as LLMProvider].name}
                </span>
                <a
                  href={availableProviders[provider as LLMProvider].apiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-sm text-blue-500 hover:text-blue-600"
                >
                  Get API Key
                </a>
              </div>
              <button
                onClick={() => removeAPIKey(provider as LLMProvider)}
                className="p-1 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}