export function estimateTokens(text: string): number {
  // More accurate token estimation based on GPT tokenization rules
  const words = text.trim().split(/\s+/);
  const punctuation = text.match(/[.,!?;:'"()\[\]{}]/g)?.length || 0;
  
  // Average word length in tokens (1.3) plus punctuation
  return Math.ceil(words.length * 1.3 + punctuation * 0.3);
}

export function isWithinTokenLimit(text: string, maxTokens: number): boolean {
  return estimateTokens(text) <= maxTokens;
}

export function truncateToTokenLimit(text: string, maxTokens: number): string {
  if (isWithinTokenLimit(text, maxTokens)) {
    return text;
  }

  const words = text.split(/\s+/);
  let result = '';
  let currentTokens = 0;

  for (const word of words) {
    const wordTokens = estimateTokens(word);
    if (currentTokens + wordTokens > maxTokens) {
      break;
    }
    result += (result ? ' ' : '') + word;
    currentTokens += wordTokens;
  }

  return result.trim() + '...';
}