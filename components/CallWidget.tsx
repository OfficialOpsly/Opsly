'use client';

import { useState, useEffect } from 'react';

export default function CallWidget() {
  const [status, setStatus] = useState('idle');
  const [voiceClient, setVoiceClient] = useState<any>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkTried, setSdkTried] = useState(false);

  // Wait for the SDK to load
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function checkSDK(attempts = 0) {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.VonageVoiceSDK && window.VonageVoiceSDK.VoiceClient) {
        setSdkReady(true);
      } else if (attempts > 100) { // 10s
        setSdkTried(true);
      } else {
        timeout = setTimeout(() => checkSDK(attempts + 1), 100);
      }
    }
    checkSDK();
    return () => clearTimeout(timeout);
  }, []);

  const startCall = async () => {
    if (!sdkReady) {
      setSdkTried(true);
      return;
    }
    setStatus('loading');
    const res = await fetch('/api/vonage-token');
    const { token } = await res.json();

    let client = voiceClient;
    if (!client) {
      // @ts-ignore
      const win: any = window;
      const VoiceClient = win.VonageVoiceSDK.VoiceClient;
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
          {!sdkReady && !sdkTried && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-16 text-sm text-gray-300 flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-[#7A7FEE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
              Loading call feature…
            </div>
          )}
          {sdkTried && !sdkReady && (
            <div className="mt-4 text-red-400 font-semibold text-center">
              The call feature could not be loaded.<br />Please check your connection or try disabling ad/script blockers.
            </div>
          )}
        </div>
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
