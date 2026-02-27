import { NextRequest, NextResponse } from 'next/server';
import ZAI, { ChatMessage } from 'z-ai-web-dev-sdk';
import { ensureConfigFile, getAIConfig } from '@/lib/ai-config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, scenario, level = 'beginner' } = body;

    if (!message) {
      return NextResponse.json({ 
        success: false, 
        error: 'Message is required' 
      }, { status: 400 });
    }

    // Ensure config file exists (writes from env vars if set)
    ensureConfigFile();
    
    // Get config for logging
    const config = getAIConfig();
    console.log('[Chat API] Using baseUrl:', config.baseUrl);

    // Create AI client
    let zai;
    try {
      zai = await ZAI.create();
    } catch (sdkInitError: unknown) {
      const err = sdkInitError as Error;
      console.error('[Chat API] SDK initialization failed:', err?.message);
      return NextResponse.json({ 
        success: false, 
        error: 'AI service unavailable. Please check server configuration.' 
      }, { status: 503 });
    }

    // Build system prompt - NOTE: Use 'assistant' role for system prompts with this SDK!
    const systemPrompt = `You are Gambare (がんばれ), a friendly Japanese language tutor.

Student level: ${level}
Topic: ${scenario || 'General conversation'}

Rules:
- Respond in Japanese first
- Add romaji in parentheses for key phrases
- Provide English translation
- Be encouraging and use emojis
- Keep responses short and helpful`;

    // Build messages with proper typing
    // IMPORTANT: Use 'assistant' role for system prompt per SDK documentation
    const messages: ChatMessage[] = [
      { role: 'assistant', content: systemPrompt }
    ];

    // Add history
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg?.role === 'user' || msg?.role === 'assistant') {
          messages.push({ role: msg.role, content: String(msg.content) });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log('[Chat API] Calling AI with', messages.length, 'messages');

    // Call AI with proper options
    const response = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' }
    });

    const reply = response.choices?.[0]?.message?.content;

    if (!reply) {
      console.error('[Chat API] No reply in response');
      return NextResponse.json({ 
        success: false, 
        error: 'No response from AI' 
      }, { status: 500 });
    }

    console.log('[Chat API] Success:', reply.substring(0, 50) + '...');

    return NextResponse.json({ 
      success: true, 
      response: reply 
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('[Chat API] Error:', err?.message || err);
    
    // Provide user-friendly error message
    let errorMessage = err?.message || 'Unknown error occurred';
    
    // Mask technical details for production
    if (errorMessage.includes('fetch failed') || errorMessage.includes('ECONNREFUSED')) {
      errorMessage = 'AI service is currently unavailable. Please try again later.';
    } else if (errorMessage.includes('Configuration file')) {
      errorMessage = 'AI service is not properly configured. Please contact support.';
    }
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage 
    }, { status: 500 });
  }
}
