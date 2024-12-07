import React from 'react';
import type { LLM } from '../../types';

interface LLMStatusProps {
  status: LLM['status'];
}

export function LLMStatus({ status }: LLMStatusProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'working':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">Status</span>
      <span className={`text-sm ${getStatusColor()}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  );
}