import React from 'react';
import { Brain } from 'lucide-react';
import type { LLM } from '../types';

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
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Status</span>
          <span className={`text-sm ${
            llm.status === 'completed' 
              ? 'text-green-600' 
              : llm.status === 'working' 
                ? 'text-yellow-600' 
                : 'text-gray-600'
          }`}>
            {llm.status.charAt(0).toUpperCase() + llm.status.slice(1)}
          </span>
        </div>
        
        {llm.response && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <pre className="text-sm whitespace-pre-wrap">{llm.response}</pre>
          </div>
        )}
      </div>
    </div>
  );
}