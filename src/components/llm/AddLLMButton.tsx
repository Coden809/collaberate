import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AddLLMModal } from './AddLLMModal';

export function AddLLMButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>Add LLM</span>
      </button>
      <AddLLMModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}