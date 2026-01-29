import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getInternship } from './tools/getIntership';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';

export const maxDuration = 30;

// Create Google AI provider with explicit API key
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('[CHAT-API] Incoming messages:', messages);
    
    // Check if API key is available
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY === 'your_google_ai_api_key_here') {
      console.error('[CHAT-API] Missing or invalid GOOGLE_GENERATIVE_AI_API_KEY environment variable');
      return new Response('The GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set or is invalid. Please add it to your .env.local file.', { status: 500 });
    }
    
    console.log('[CHAT-API] API key available:', process.env.GOOGLE_GENERATIVE_AI_API_KEY?.slice(0, 10) + '...');

    // Add system prompt
    messages.unshift(SYSTEM_PROMPT);

    // Add tools
    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getInternship,
    };

    console.log('[CHAT-API] About to call streamText');
    
    const result = streamText({
      model: google('gemini-2.5-flash'),
      messages,
      tools,
      maxSteps: 10,
      onError: ({ error }) => {
        console.error('[CHAT-API] Stream error:', error);
      },
    });

    console.log('[CHAT-API] streamText initiated');
    
    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        const message = errorHandler(error);
        console.error('[CHAT-API] Data stream error:', message);
        
        if (message.includes('quota') || message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
          return 'API quota exceeded. Please try again later or use preset questions.';
        }
        if (message.includes('network')) {
          return 'Network error. Please check your connection and try again.';
        }
        return `Error: ${message}`;
      },
    });
  } catch (error) {
    const errorMessage = errorHandler(error);
    console.error('Chat API error:', errorMessage);
    console.error('Error details:', error);
    
    // Handle specific error types
    if (errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      return new Response('API quota exceeded. Please try again later.', { status: 429 });
    }
    
    if (errorMessage.includes('network')) {
      return new Response('Network error. Please check your connection and try again.', { status: 503 });
    }
    
    return new Response(`Internal Server Error: ${errorMessage}`, { status: 500 });
  }
}
