import { SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const privateKey = process.env.VONAGE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const appId = process.env.VONAGE_APP_ID;

    if (!privateKey || !appId) {
      return NextResponse.json(
        { error: 'Missing Vonage configuration' },
        { status: 500 }
      );
    }

    // Sign JWT for Vonage Client SDK authentication
    const jwt = await new SignJWT({ application_id: appId })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(new TextEncoder().encode(privateKey));

    return NextResponse.json({ token: jwt });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
} 