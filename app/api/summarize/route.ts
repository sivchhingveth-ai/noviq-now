import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key required. Get one free at aistudio.google.com/apikey' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: 'You are PulseFeed AI. Follow these rules: Be concise (under 200 words). Be factual. Use article context when provided.' }] },
        { role: 'model', parts: [{ text: 'Understood. I am PulseFeed AI, ready to summarize news and answer questions accurately and concisely.' }] },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.3,
      },
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.text);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Gemini API error:', message);
    return NextResponse.json(
      { error: `AI request failed: ${message}` },
      { status: 500 }
    );
  }
}
