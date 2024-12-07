export class LLMError extends Error {
  constructor(
    message: string,
    public provider: string,
    public code: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'LLMError';
  }
}

export function handleLLMError(error: unknown, provider: string): LLMError {
  if (error instanceof LLMError) {
    return error;
  }

  if (error instanceof Error) {
    if (error.message.includes('API key')) {
      return new LLMError(
        'Invalid API key provided',
        provider,
        'INVALID_API_KEY',
        error
      );
    }
    if (error.message.includes('rate limit')) {
      return new LLMError(
        'Rate limit exceeded',
        provider,
        'RATE_LIMIT_EXCEEDED',
        error
      );
    }
  }

  return new LLMError(
    'An unexpected error occurred',
    provider,
    'UNKNOWN_ERROR',
    error
  );
}