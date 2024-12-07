import React, { useEffect } from 'react';
import { useProjectStore } from '../store/projectStore';
import { useLLMOrchestrator } from '../hooks/useLLMOrchestrator';
import { LLMCard } from './LLMCard';

export function ProjectBoard() {
  const currentProject = useProjectStore((state) => state.currentProject);
  const { orchestrateLLMs, isProcessing } = useLLMOrchestrator();

  useEffect(() => {
    if (currentProject && currentProject.status === 'pending') {
      orchestrateLLMs(currentProject);
    }
  }, [currentProject, orchestrateLLMs]);

  if (!currentProject) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Project Prompt</h2>
          {isProcessing && (
            <span className="text-sm text-blue-600 animate-pulse">
              Processing...
            </span>
          )}
        </div>
        <p className="text-gray-700">{currentProject.prompt}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProject.llms.map((llm) => (
          <LLMCard key={llm.id} llm={llm} />
        ))}
      </div>
    </div>
  );
}