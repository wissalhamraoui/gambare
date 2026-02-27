import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { ensureConfigFile } from '@/lib/ai-config';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    // Ensure config file exists
    ensureConfigFile();

    // Convert audio file to base64
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Audio = buffer.toString('base64');

    let zai;
    try {
      zai = await ZAI.create();
    } catch (sdkInitError: unknown) {
      const err = sdkInitError as Error;
      console.error('[ASR API] SDK initialization failed:', err?.message);
      return NextResponse.json({ 
        error: 'Speech recognition service unavailable. Please check server configuration.' 
      }, { status: 503 });
    }

    // Transcribe audio
    const response = await zai.audio.asr.create({
      file_base64: base64Audio
    });

    return NextResponse.json({
      success: true,
      transcription: response.text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('ASR API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
