import React from 'react';
import { LLMCard } from './LLMCard';
import { AddLLMButton } from './AddLLMButton';
import { useProjectStore } from '../../store/projectStore';

export function LLMList() {
  const currentProject = useProjectStore((state) => state.currentProject);

  if (!currentProject) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active LLMs</h2>
        <AddLLMButton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProject.llms.map((llm) => (
          <LLMCard key={llm.id} llm={llm} />
        ))}
      </div>
    </div>
  );
}