import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Creates and returns a configured Anthropic client.
 * Reads ANTHROPIC_API_KEY from environment.
 */
export function createClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set in environment variables');
  }
  return new Anthropic({ apiKey });
}

/**
 * Extracts the text content from the first content block of a Claude response.
 */
export function extractText(response: Anthropic.Message): string {
  const block = response.content[0];
  if (block.type !== 'text') throw new Error('Expected text content block');
  return block.text;
}

/**
 * Finds the first JSON object in a string by locating '{' and '}'.
 */
export function extractJson(response: string): Record<string, unknown> {
  const start = response.indexOf('{');
  const end = response.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found in response');
  return JSON.parse(response.slice(start, end + 1));
}

/**
 * Extracts all substrings wrapped in a given XML tag.
 */
export function extractBetweenTags(tag: string, text: string, strip = false): string[] {
  const regex = new RegExp(`<${tag}>([\\s\\S]+?)<\\/${tag}>`, 'g');
  const results: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    results.push(strip ? match[1].trim() : match[1]);
  }
  return results;
}
