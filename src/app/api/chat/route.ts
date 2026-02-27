import { NextRequest, NextResponse } from 'next/server';

// Disable body parsing for edge runtime
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid JSON in request body' 
      }, { status: 400 });
    }

    const { message, history, scenario, level = 'beginner' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ 
        success: false, 
        error: 'Message is required and must be a string' 
      }, { status: 400 });
    }

    // Import AI SDK
    let zai;
    try {
      const ZAI = (await import('z-ai-web-dev-sdk')).default;
      zai = await ZAI.create();
    } catch (sdkError) {
      console.error('Failed to initialize AI SDK:', sdkError);
      return NextResponse.json({ 
        success: false, 
        error: 'AI service temporarily unavailable. Please try again later.' 
      }, { status: 503 });
    }

    // Build system prompt
    const systemPrompt = `You are Gambare (がんばれ), a friendly Japanese language tutor. Your role is to help students learn Japanese through natural conversation.

Student level: ${level}
Topic: ${scenario || 'General conversation'}

Guidelines:
1. Always respond in Japanese first, then add romaji in parentheses, then English translation
2. Be encouraging, patient, and use emojis occasionally
3. Keep responses concise but helpful
4. Ask follow-up questions to continue the conversation
5. For beginners, use simple vocabulary and provide translations`;

    // Build messages array
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt }
    ];

    // Add history if provided
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg && typeof msg.role === 'string' && typeof msg.content === 'string') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log('[Chat API] Sending request to AI with', messages.length, 'messages');

    // Call AI
    let completion;
    try {
      completion = await zai.chat.completions.create({
        messages: messages as any,
      });
    } catch (aiError: any) {
      console.error('AI completion error:', aiError);
      return NextResponse.json({ 
        success: false, 
        error: 'AI request failed: ' + (aiError.message || 'Unknown error')
      }, { status: 500 });
    }

    const response = completion?.choices?.[0]?.message?.content;

    if (!response) {
      console.error('No response from AI');
      return NextResponse.json({ 
        success: false, 
        error: 'No response received from AI' 
      }, { status: 500 });
    }

    console.log('[Chat API] Got response:', response.substring(0, 100) + '...');

    return NextResponse.json({ 
      success: true, 
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('[Chat API] Unexpected error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'An unexpected error occurred: ' + (error?.message || 'Unknown error')
    }, { status: 500 });
  }
}
