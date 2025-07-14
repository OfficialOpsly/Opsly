'use client';

import { useState, useEffect } from 'react';

export default function CallWidget() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'calling' | 'error'>('idle');
  const [client, setClient] = useState<any>(null);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // Poll to detect when VonageVoiceSDK is loaded
    let interval = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).VonageVoice?.VoiceClient) {
        setSdkReady(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const startCall = async () => {
    if (!sdkReady) {
      alert('Voice SDK not loaded yet. Please wait and try again.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/vonage-token');
      const { token } = await res.json();

      let voiceClient = client;

      if (!voiceClient) {
        // Create new instance from the global SDK
        voiceClient = new (window as any).VonageVoice.VoiceClient();
        setClient(voiceClient);
      }

      await voiceClient.login(token);

      voiceClient.on('call:status', (payload: any) => {
        if (payload.status === 'answered') {
          setStatus('calling');
        } else if (payload.status === 'completed') {
          setStatus('idle');
        }
      });

      voiceClient.on('error', (err: any) => {
        console.error('Call error:', err);
        setStatus('error');
      });

      voiceClient.callServer(); // triggers your NCCO flow
    } catch (err) {
      console.error('Token fetch error:', err);
      setStatus('error');
    }
  };

  return (
    <section
      id="call-widget"
      className="relative my-8 flex items-center justify-center z-20"
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse-slow border-4 border-[#7A7FEE] shadow-[0_0_40px_10px_rgba(122,127,238,0.4)]"
        style={{ filter: 'blur(2px)' }}
      />
      <div className="relative bg-gradient-to-br from-[#23242a] via-[#282a36] to-[#181924] text-white rounded-2xl shadow-2xl px-12 py-14 flex flex-col items-center max-w-lg w-full border border-[#7A7FEE]">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-lg text-center">
          Call Our AI Secretary
        </h1>
        <p className="mb-8 text-base md:text-lg max-w-md text-gray-200 text-center font-medium">
          Try our interactive voice demo powered by Vonage!
        </p>
        <div className="relative w-full flex flex-col items-center">
          <button
            onClick={startCall}
            disabled={status === 'loading' || status === 'calling'}
            className="px-10 py-4 rounded-xl bg-[#6d72e8] text-white font-bold text-xl shadow-lg hover:bg-[#4346a6] transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-[#7A7FEE] focus:ring-offset-2 animate-bounce-once transform hover:scale-105 w-full"
          >
            {status === 'calling'
              ? '📞 In Call...'
              : status === 'loading'
              ? 'Connecting...'
              : '🎙️ Call Now'}
          </button>
        </div>
        {status === 'error' && (
          <div className="mt-6 text-red-400 font-semibold">An error occurred. Please try again.</div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.7;
            box-shadow: 0 0 40px 10px rgba(122,127,238,0.4);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 60px 20px rgba(122,127,238,0.7);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s infinite;
        }
        @keyframes bounce-once {
          0% {
            transform: scale(1);
          }
          20% {
            transform: scale(1.08);
          }
          40% {
            transform: scale(0.97);
          }
          60% {
            transform: scale(1.03);
          }
          80% {
            transform: scale(0.99);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-once:active {
          animation: bounce-once 0.4s;
        }
      `}</style>
    </section>
  );
}
