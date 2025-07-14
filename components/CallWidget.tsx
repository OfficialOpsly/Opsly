'use client';

import { useState } from 'react';
// @ts-ignore
import { VoiceClient } from '@vonage/client-sdk';

export default function CallWidget() {
  const [status, setStatus] = useState('idle');
  const [voiceClient, setVoiceClient] = useState<any>(null);

  const startCall = async () => {
    setStatus('loading');
    const res = await fetch('/api/vonage-token');
    const { token } = await res.json();

    let client = voiceClient;
    if (!client) {
      client = new VoiceClient();
      setVoiceClient(client);
    }

    try {
      await client.login(token);

      client.on('call:status', (payload: any) => {
        if (payload.status === 'answered') {
          setStatus('calling');
        } else if (payload.status === 'completed') {
          setStatus('idle');
        }
      });

      client.on('error', (err: any) => {
        console.error(err);
        setStatus('error');
      });

      client.callServer();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section
      id="call-widget"
      className="relative my-8 flex items-center justify-center z-20"
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse-slow border-4 border-[#7A7FEE] shadow-[0_0_40px_10px_rgba(122,127,238,0.4)]" style={{ filter: 'blur(2px)' }} />
      <div className="relative bg-gradient-to-br from-[#23242a] via-[#282a36] to-[#181924] dark:from-[#181924] dark:via-[#23242a] dark:to-[#23242a] text-white rounded-2xl shadow-2xl px-12 py-14 flex flex-col items-center max-w-lg w-full border border-[#7A7FEE]">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-lg text-center">
          Call Our AI Secretary
        </h1>
        <p className="mb-8 text-base md:text-lg max-w-md text-gray-200 text-center font-medium">
          Try our interactive voice demo powered by Vonage!
        </p>
        <button
          onClick={startCall}
          disabled={status === 'loading' || status === 'calling'}
          className="px-10 py-4 rounded-xl bg-[#5a5fcf] text-white font-bold text-xl shadow-lg hover:bg-[#4346a6] transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-[#7A7FEE] focus:ring-offset-2 animate-bounce-once"
        >
          {status === 'calling'
            ? '📞 In Call...'
            : status === 'loading'
            ? 'Connecting...'
            : '🎙️ Call Now'}
        </button>
        {status === 'error' && (
          <div className="mt-6 text-red-400 font-semibold">An error occurred. Please try again.</div>
        )}
      </div>
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; box-shadow: 0 0 40px 10px rgba(122,127,238,0.4); }
          50% { opacity: 1; box-shadow: 0 0 60px 20px rgba(122,127,238,0.7); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s infinite;
        }
        @keyframes bounce-once {
          0% { transform: scale(1); }
          20% { transform: scale(1.08); }
          40% { transform: scale(0.97); }
          60% { transform: scale(1.03); }
          80% { transform: scale(0.99); }
          100% { transform: scale(1); }
        }
        .animate-bounce-once:active {
          animation: bounce-once 0.4s;
        }
      `}</style>
    </section>
  );
}
