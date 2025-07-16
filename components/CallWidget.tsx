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
    <section id="call-widget" className="card my-8 relative overflow-hidden shadow-md">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center md:items-stretch">
        {/* Left side: Call widget UI */}
        <div className="w-full md:w-2/5 flex items-center justify-center">
          <div className="relative w-full flex flex-col items-center max-w-xs">
            <button
              onClick={startCall}
              disabled={status === 'loading' || status === 'calling'}
              className="px-10 py-4 rounded-xl bg-[#6d72e8] text-white font-bold text-xl shadow-lg hover:bg-[#4346a6] transition duration-200 disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-[#7A7FEE] focus:ring-offset-2 w-full"
            >
              {status === 'calling'
                ? '📞 In Call...'
                : status === 'loading'
                ? 'Connecting...'
                : '🎙️ Call Now'}
            </button>
            {status === 'error' && (
              <div className="mt-6 text-red-500 dark:text-red-400 font-semibold">
                An error occurred. Please try again.
              </div>
            )}
          </div>
        </div>

        {/* Right side: Text content */}
        <div className="w-full md:w-3/5 z-10 mt-8 md:mt-0 md:pl-10 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black dark:text-white">
            Call Our AI Secretary
          </h2>
          <p className="my-6 text-base md:text-lg max-w-md text-gray-700 dark:text-gray-300">
            Try our interactive voice demo powered by Vonage!
          </p>
        </div>
      </div>
    </section>
  );
}
