import { NextResponse } from 'next/server';

export async function POST() {
  const VONAGE_API_KEY = process.env.VONAGE_API_KEY!;
  const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET!;
  const VONAGE_VIRTUAL_NUMBER = process.env.VONAGE_VIRTUAL_NUMBER!;
  const TO_NUMBER = process.env.TO_NUMBER!; // or omit if using WebSocket

  const nccoUrl = 'https://www.opsly.ca/api/voice-ncco'; // we’ll build this next

  const body = {
    to: [{ type: 'phone', number: TO_NUMBER }],
    from: { type: 'phone', number: VONAGE_VIRTUAL_NUMBER },
    answer_url: [nccoUrl],
  };

  try {
    const res = await fetch('https://api.nexmo.com/v1/calls', {
      method: 'POST',
      headers: {
        'Authorization':
          'Basic ' +
          Buffer.from(`${VONAGE_API_KEY}:${VONAGE_API_SECRET}`).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error('Vonage API error:', result);
      return NextResponse.json({ error: 'Vonage API error', details: result }, { status: 500 });
    }

    return NextResponse.json({ message: 'Call initiated!', callId: result.uuid });
  } catch (err) {
    console.error('Error starting call:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}