export function formatSystemPrompt(role: string, context: string): string {
  return `You are an AI assistant specializing in ${role}. ${context}`;
}

export function formatUserPrompt(prompt: string, constraints: string[]): string {
  const constraintsText = constraints.length
    ? `\nConstraints:\n${constraints.map(c => `- ${c}`).join('\n')}`
    : '';
  
  return `${prompt}${constraintsText}`;
}

export function formatConversationHistory(
  messages: { role: 'user' | 'assistant'; content: string }[]
): string {
  return messages
    .map(m => `${m.role === 'user' ? 'Human' : 'Assistant'}: ${m.content}`)
    .join('\n\n');
}