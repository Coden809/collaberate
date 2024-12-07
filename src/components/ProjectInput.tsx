import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';

export function ProjectInput() {
  const [prompt, setPrompt] = useState('');
  const createProject = useProjectStore((state) => state.createProject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      createProject(prompt);
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your project..."
          className="w-full min-h-[120px] p-4 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          className="absolute bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}