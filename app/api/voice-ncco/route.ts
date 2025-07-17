import { NextResponse } from 'next/server';

export async function GET() {
  const wsUrl = 'wss://www.opsly.ca/ws'; // your WebSocket server

  const ncco = [
    {
      action: 'connect',
      endpoint: [
        {
          type: 'websocket',
          uri: wsUrl,
          contentType: 'audio/l16;rate=16000',
          headers: {
            user: 'ai-agent'
          }
        }
      ]
    }
  ];

  return NextResponse.json(ncco);
}
