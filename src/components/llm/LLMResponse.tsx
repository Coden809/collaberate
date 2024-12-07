import React from 'react';

interface LLMResponseProps {
  response: string;
}

export function LLMResponse({ response }: LLMResponseProps) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-md">
      <pre className="text-sm whitespace-pre-wrap overflow-auto">{response}</pre>
    </div>
  );
}