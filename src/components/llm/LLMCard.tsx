import React from 'react';
import { Brain } from 'lucide-react';
import type { LLM } from '../../types';
import { LLMStatus } from './LLMStatus';
import { LLMResponse } from './LLMResponse';

interface LLMCardProps {
  llm: LLM;
}

export function LLMCard({ llm }: LLMCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-full">
          <Brain className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{llm.name}</h3>
          <p className="text-sm text-gray-600">{llm.description}</p>
        </div>
      </div>
      
      <LLMStatus status={llm.status} />
      {llm.response && <LLMResponse response={llm.response} />}
    </div>
  );
}