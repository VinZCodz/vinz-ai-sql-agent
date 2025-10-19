import { groq } from '@ai-sdk/groq';
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from 'ai';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { createTools } from '../../../ai/tools';
import { DrizzleReadOnlyExecutor } from '../../../services/drizzleReadOnlyExecutor';
import { db } from '../../../db/client';
import * as schema from '../../../db/schema';
import * as prompt from '../../../ai/prompt';
import * as utils from '../../../ai/utils';

type DrizzleDB = LibSQLDatabase<typeof schema>;
const dbInstance = db as unknown as DrizzleDB;
const queryExecutor = new DrizzleReadOnlyExecutor(dbInstance);

const allowedSchemas=utils.generateSchemaDescription();//TODO: Can be pipelined with db:generate script and pushed to cache

export const maxDuration = 30;// Allow streaming responses up to 30 seconds

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq('moonshotai/kimi-k2-instruct'),
    system: `${prompt.SYSTEM_PROMPT} /n/n Allowed Schemas: ${allowedSchemas} /n/n Todays Date: ${new Date()}`,
    messages: convertToModelMessages(messages),
    tools: createTools({ queryExecutor }),
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}