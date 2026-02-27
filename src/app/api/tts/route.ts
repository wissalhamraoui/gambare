import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { ensureConfigFile } from '@/lib/ai-config';

// Available voices with their characteristics
const VOICE_OPTIONS = {
  // Natural and smooth - great for Japanese
  douji: { voice: 'douji', description: 'Natural & Smooth' },
  // Clear and standard - good for learning pronunciation
  kazi: { voice: 'kazi', description: 'Clear & Standard' },
  // Lively and cute - matches the app's kawaii theme
  chuichui: { voice: 'chuichui', description: 'Lively & Cute' },
  // Warm and friendly
  tongtong: { voice: 'tongtong', description: 'Warm & Friendly' },
} as const;

export async function POST(req: NextRequest) {
  try {
    const { 
      text, 
      speed = 0.85,  // Slightly slower for learning
      voice = 'douji', // Natural voice
      volume = 1.2,  // Slightly louder for clarity
    } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Ensure config file exists
    ensureConfigFile();

    // Clean and prepare text for better TTS
    let processedText = text
      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      // Remove emoji for cleaner speech (optional - can keep for fun)
      .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
      // Clean up extra whitespace
      .replace(/\s+/g, ' ')
      .trim();

    // Extract Japanese text if mixed with English
    // This helps the TTS engine pronounce Japanese correctly
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;
    const japaneseMatches = processedText.match(japaneseRegex);
    
    // If there's Japanese text, prioritize it for speech
    if (japaneseMatches && japaneseMatches.length > 0) {
      // Use the Japanese portions for clearer pronunciation
      processedText = japaneseMatches.join('、'); // Join with Japanese comma for natural pause
    }

    // Limit text length to 1024 characters (API limit)
    const truncatedText = processedText.slice(0, 1000);

    let zai;
    try {
      zai = await ZAI.create();
    } catch (sdkInitError: unknown) {
      const err = sdkInitError as Error;
      console.error('[TTS API] SDK initialization failed:', err?.message);
      return NextResponse.json({ 
        error: 'TTS service unavailable. Please check server configuration.' 
      }, { status: 503 });
    }

    // Select voice
    const selectedVoice = VOICE_OPTIONS[voice as keyof typeof VOICE_OPTIONS]?.voice || 'douji';

    // Generate TTS audio with natural settings
    const response = await zai.audio.tts.create({
      input: truncatedText,
      voice: selectedVoice,
      speed: Math.max(0.5, Math.min(2.0, speed)), // Clamp speed between 0.5-2.0
      volume: Math.max(0.1, Math.min(10, volume)), // Clamp volume between 0.1-10
      response_format: 'wav',
      stream: false,
    });

    // Get array buffer from Response object
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    // Return audio as response
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate speech' },
      { status: 500 }
    );
  }
}

// GET endpoint to list available voices
export async function GET() {
  return NextResponse.json({
    voices: [
      { id: 'douji', name: 'Natural & Smooth', recommended: true },
      { id: 'kazi', name: 'Clear & Standard', recommended: true },
      { id: 'chuichui', name: 'Lively & Cute' },
      { id: 'tongtong', name: 'Warm & Friendly' },
    ],
    defaultSpeed: 0.85,
    defaultVolume: 1.2,
  });
}
