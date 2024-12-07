import React, { useState } from 'react';
import { X } from 'lucide-react';
import { availableProviders } from '../config/llmProviders';
import type { LLMProvider } from '../types';
import { useLLMStore } from '../store/llmStore';

interface AddLLMModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (provider: LLMProvider, model: string) => void;
}

export function AddLLMModal({ isOpen, onClose, onAdd }: AddLLMModalProps) {
  const [selectedProvider, setSelectedProvider] = useState<LLMProvider>('openai');
  const [selectedModel, setSelectedModel] = useState('');
  const { apiKeys } = useLLMStore();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProvider && selectedModel) {
      onAdd(selectedProvider, selectedModel);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New LLM</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Provider
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => {
                setSelectedProvider(e.target.value as LLMProvider);
                setSelectedModel('');
              }}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {Object.entries(availableProviders).map(([id, provider]) => (
                <option key={id} value={id} disabled={!apiKeys[id as LLMProvider]}>
                  {provider.name} {!apiKeys[id as LLMProvider] && '(API Key Required)'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select a model</option>
              {availableProviders[selectedProvider].models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!selectedModel || !apiKeys[selectedProvider]}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            Add LLM
          </button>
        </form>
      </div>
    </div>
  );
}