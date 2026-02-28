import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], scenario, level = 'beginner' } = body;

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message required' }, { status: 400 });
    }

    let systemPrompt = '';
    
    if (scenario === 'tutor_session') {
      systemPrompt = `You are Sensei, a Japanese teacher in a LIVE VOICE lesson.

CRITICAL RULES:
1. NEVER say "Nice to meet you" - you ALREADY KNOW the student
2. NEVER introduce yourself again
3. REMEMBER what student said earlier
4. Keep responses SHORT (1-2 sentences for voice)
5. Respond to what they said, then ask ONE question

TEACHING:
- Correct answer -> Praise + teach new word
- Wrong answer -> Correct gently + ask to repeat
- Always show: Japanese (romaji) = English

Level: ${level}`;
    } else {
      systemPrompt = `Japanese conversation partner. Japanese + romaji + English. Short responses.`;
    }

    const messages = [{ role: 'system', content: systemPrompt }];
    
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg?.role && msg?.content) {
          messages.push({ role: msg.role, content: String(msg.content) });
        }
      }
    }
    messages.push({ role: 'user', content: message });

    // Try Groq API
    let response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ZAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        max_tokens: 150
      })
    });

    // Fallback to internal AI if Groq fails
    if (!response.ok) {
      response = await fetch('http://172.25.136.193:8080/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer Z.ai',
          'X-Z-AI-From': 'Z'
        },
        body: JSON.stringify({ messages, max_tokens: 150 })
      });
    }

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'AI error' }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return NextResponse.json({ success: true, response: reply || 'No response' });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
