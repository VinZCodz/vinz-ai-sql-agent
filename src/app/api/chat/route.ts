import { tools } from '@/app/utils/tools';
import { groq } from '@ai-sdk/groq';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq('moonshotai/kimi-k2-instruct'),
    messages: convertToModelMessages(messages),
    tools: tools
  });

  return result.toUIMessageStreamResponse();
}