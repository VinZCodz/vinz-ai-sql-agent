import { groq } from '@ai-sdk/groq';
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from 'ai';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { createTools } from '../../../ai/tools';
import { DrizzleReadOnlyExecutor } from '../../../services/drizzleReadOnlyExecutor';
import { db } from '../../../db/client';
import * as schema from '../../../db/schema';
import * as prompt from '../../../ai/prompt';
import dotenv from 'dotenv'

dotenv.config();

type DrizzleDB = LibSQLDatabase<typeof schema>;
const dbInstance = db as unknown as DrizzleDB;
const queryExecutor = new DrizzleReadOnlyExecutor(dbInstance);

export const maxDuration = 30;// Allow streaming responses up to 30 seconds

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq(process.env.MODEL!),
    system: `${prompt.SYSTEM_PROMPT} \n\n Todays Date: ${new Date()}`,
    messages: convertToModelMessages(messages),
    tools: createTools({ queryExecutor }),
    stopWhen: stepCountIs(7),
  });

  return result.toUIMessageStreamResponse();
}