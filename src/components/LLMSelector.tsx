import React from 'react';
import { Plus, Download } from 'lucide-react';
import { availableProviders } from '../config/llmProviders';
import { freeLLMProviders } from '../config/freeLLMs';
import { useLLMStore } from '../store/llmStore';
import type { LLMProvider } from '../types';

export function LLMSelector() {
  const { apiKeys } = useLLMStore();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Free Local LLMs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(freeLLMProviders).map(([id, provider]) => (
            <div key={id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{provider.name}</h4>
                <a
                  href={provider.setup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-gray-600">{provider.description}</p>
              <div className="text-sm">
                <span className="font-medium">Available Models:</span>
                <ul className="mt-1 space-y-1">
                  {provider.models.slice(0, 3).map((model) => (
                    <li key={model} className="text-gray-600">• {model}</li>
                  ))}
                  {provider.models.length > 3 && (
                    <li className="text-gray-500">
                      +{provider.models.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Cloud LLM Providers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(availableProviders).map(([id, provider]) => (
            <div key={id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{provider.name}</h4>
                <a
                  href={provider.apiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Plus className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-gray-600">{provider.description}</p>
              <div className="text-sm">
                <span className="font-medium">Status:</span>
                <span className={`ml-2 ${apiKeys[id as LLMProvider] ? 'text-green-600' : 'text-gray-500'}`}>
                  {apiKeys[id as LLMProvider] ? 'Connected' : 'API Key Required'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}