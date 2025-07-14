import { SignJWT, importPKCS8 } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const privateKeyPem = process.env.VONAGE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const appId = process.env.VONAGE_APP_ID;

    if (!privateKeyPem || !appId) {
      return NextResponse.json(
        { error: 'Missing Vonage configuration' },
        { status: 500 }
      );
    }

    // Convert PEM string to a usable crypto key
    const key = await importPKCS8(privateKeyPem, 'RS256');

    const jwt = await new SignJWT({ application_id: appId })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(key);

    return NextResponse.json({ token: jwt });
  } catch (error) {
    console.error('Error generating token:', error);
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    );
  }
} 