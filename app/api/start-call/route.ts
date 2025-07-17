// /pages/api/start-call.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const VONAGE_API_KEY = process.env.VONAGE_API_KEY!;
  const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET!;
  const VONAGE_NUMBER = process.env.VONAGE_NUMBER!;
  const TO_NUMBER = process.env.TEST_NUMBER!; // your own number or client

  const response = await fetch(`https://api.nexmo.com/v1/calls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${VONAGE_API_KEY}:${VONAGE_API_SECRET}`).toString('base64'),
    },
    body: JSON.stringify({
      to: [{ type: 'phone', number: TO_NUMBER }],
      from: { type: 'phone', number: VONAGE_NUMBER },
      ncco: [
        {
          action: 'connect',
          endpoint: [
            {
              type: 'websocket',
              uri: 'wss://yourdomain.com/ws/voice',
              contentType: 'audio/l16;rate=16000',
              headers: { session: 'user123' },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) return res.status(500).json({ error: 'Call failed to initiate' });

  return res.status(200).json({ message: 'Call initiated' });
}
