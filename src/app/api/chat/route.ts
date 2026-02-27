import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history, scenario, level = 'beginner' } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Dynamic import to avoid issues
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    const zai = await ZAI.create();

    // Build the system prompt for Japanese learning
    const systemPrompt = `You are a friendly Japanese language tutor named Gambare. Help the student learn Japanese through conversation.

Student level: ${level}
Topic: ${scenario || 'General conversation'}

Rules:
- Respond in Japanese first, then add romaji in parentheses, then English translation
- Be encouraging and use emojis
- Keep responses short and helpful
- Ask follow-up questions to continue the conversation`;

    // Build messages array
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt }
    ];

    // Add history if exists
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role && msg.content) {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    console.log('Sending to AI:', { messageCount: messages.length, lastMessage: message });

    const completion = await zai.chat.completions.create({
      messages: messages as any
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      console.error('No response from AI');
      return NextResponse.json({ 
        success: false, 
        error: 'No response from AI' 
      }, { status: 500 });
    }

    console.log('AI response:', response.substring(0, 100));

    return NextResponse.json({ 
      success: true, 
      response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to get AI response',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
