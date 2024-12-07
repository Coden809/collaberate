import { useState, useCallback } from 'react';
import { useLLMService } from './useLLMService';
import { useProjectStore } from '../store/projectStore';
import { handleLLMError } from '../utils/errorHandler';
import { formatSystemPrompt, formatUserPrompt } from '../utils/promptFormatter';
import type { LLM, Project } from '../types';

export function useLLMOrchestrator() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { getService } = useLLMService();
  const updateLLMResponse = useProjectStore((state) => state.updateLLMResponse);
  const syncLLMResponses = useProjectStore((state) => state.syncLLMResponses);

  const processLLM = useCallback(async (
    project: Project,
    llm: LLM,
    previousResponses: string[]
  ) => {
    try {
      const service = getService(llm.config.provider);
      
      const systemPrompt = formatSystemPrompt(
        llm.name,
        llm.description
      );
      
      const userPrompt = formatUserPrompt(
        project.prompt,
        previousResponses.length ? [`Consider previous responses: ${previousResponses.join('\n')}`] : []
      );

      const response = await service.generateResponse(
        `${systemPrompt}\n\n${userPrompt}`
      );

      updateLLMResponse(project.id, llm.id, response.text);
      return response.text;
    } catch (error) {
      const llmError = handleLLMError(error, llm.config.provider);
      updateLLMResponse(
        project.id,
        llm.id,
        `Error: ${llmError.message}`
      );
      throw llmError;
    }
  }, [getService, updateLLMResponse]);

  const orchestrateLLMs = useCallback(async (project: Project) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const responses: string[] = [];
      
      for (const llm of project.llms) {
        const response = await processLLM(project, llm, responses);
        responses.push(response);
      }

      syncLLMResponses(project.id);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, processLLM, syncLLMResponses]);

  return {
    orchestrateLLMs,
    isProcessing
  };
}