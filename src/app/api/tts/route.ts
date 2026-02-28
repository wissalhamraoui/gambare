import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    let cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;
    const japaneseMatches = cleanText.match(japaneseRegex);
    
    if (japaneseMatches && japaneseMatches.length > 0) {
      cleanText = japaneseMatches.join(' ');
    }

    cleanText = cleanText.slice(0, 500);

    return NextResponse.json({ success: true, text: cleanText, lang: 'ja-JP' });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ voices: [{ id: 'browser', name: 'Browser TTS' }] });
}
