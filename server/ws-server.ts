// import WebSocket, { WebSocketServer } from 'ws';
// import http from 'http';
// import { Buffer } from 'buffer';
// import * as sdk from 'openai';
// import { TextToSpeechClient } from '@google-cloud/text-to-speech';
// import speech from '@google-cloud/speech';

// const PORT = 3001;

// // --- 1. GPT Client ---
// const openai = new sdk.OpenAI();

// async function generateGptResponse(text: string): Promise<string> {
//   const res = await openai.chat.completions.create({
//     model: 'gpt-4',
//     messages: [{ role: 'user', content: text }],
//   });
//   return res.choices[0].message.content || '';
// }

// // --- 2. Speech-to-Text (Google Cloud) ---
// const speechClient = new speech.SpeechClient();

// async function transcribe(audioBuffer: Buffer): Promise<string> {
//   const audioBytes = audioBuffer.toString('base64');
//   const [response] = await speechClient.recognize({
//     audio: { content: audioBytes },
//     config: {
//       encoding: 'LINEAR16',
//       sampleRateHertz: 16000,
//       languageCode: 'en-US',
//     },
//   });

//   return response.results?.map(r => r.alternatives?.[0].transcript).join('\n') || '';
// }

// // --- 3. Text-to-Speech ---
// const ttsClient = new TextToSpeechClient();

// async function synthesizeSpeech(text: string): Promise<Buffer> {
//   const [response] = await ttsClient.synthesizeSpeech({
//     input: { text },
//     voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
//     audioConfig: { audioEncoding: 'LINEAR16' },
//   });

//   return Buffer.from(response.audioContent as Uint8Array);
// }

// // --- 4. WebSocket Audio Handler ---
// const server = http.createServer();
// const wss = new WebSocketServer({ server });

// wss.on('connection', (ws) => {
//   let audioChunks: Buffer[] = [];

//   ws.on('message', async (data) => {
//     if (typeof data === 'string') return; // ignore text messages

//     audioChunks.push(data as Buffer);

//     // Short debounce: after ~2s of audio, transcribe
//     if (audioChunks.length > 30) {
//       const buffer = audioChunks;
//       audioChunks = []; // reset for next batch

//       const transcript = await transcribe(buffer);
//       console.log('User said:', transcript);

//       const reply = await generateGptResponse(transcript);
//       console.log('AI reply:', reply);

//       const replyAudio = await synthesizeSpeech(reply);

//       // Send synthesized audio back to Vonage
//       ws.send(replyAudio);
//     }
//   });

//   ws.on('close', () => console.log('Connection closed'));
// });

// server.listen(PORT, () => console.log(`🔊 AI WebSocket server running on :${PORT}`));
