import React from 'react';
import { ProjectInput } from './components/ProjectInput';
import { ProjectBoard } from './components/ProjectBoard';
import { APIKeyManager } from './components/APIKeyManager';
import { LLMSelector } from './components/LLMSelector';
import { BrainCog } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <BrainCog className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Collaborative LLM System</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <LLMSelector />
          <APIKeyManager />
          <div className="flex flex-col items-center">
            <ProjectInput />
            <ProjectBoard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;