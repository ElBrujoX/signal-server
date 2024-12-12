import express from 'express';
import { Server } from 'ws';
import { createServer } from 'http';
import { BrowserEventEmitter } from '../lib/vm/event-emitter';

const app = express();
const server = createServer(app);
const wss = new Server({ server });

// Store active VM connections
const activeVMs = new Map<string, BrowserEventEmitter>();

wss.on('connection', (ws) => {
  let agentId: string;

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

    if (data.type === 'init') {
      agentId = data.agentId;
      console.log(`VM connection initialized for agent: ${agentId}`);
      
      // Send initial frame
      const frameData = generateMockFrame();
      ws.send(frameData);

      // Start sending periodic updates
      const updateInterval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          const frameData = generateMockFrame();
          ws.send(frameData);
        }
      }, 1000 / 30); // 30 FPS

      ws.on('close', () => {
        clearInterval(updateInterval);
        activeVMs.delete(agentId);
      });
    }
  });
});

// Helper to generate mock frame data (replace with real VM data later)
function generateMockFrame() {
  const canvas = new OffscreenCanvas(800, 600);
  const ctx = canvas.getContext('2d')!;
  
  // Draw something to simulate VM activity
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, 800, 600);
  ctx.fillStyle = '#ffffff';
  ctx.font = '20px monospace';
  ctx.fillText(`Agent Activity - ${new Date().toISOString()}`, 20, 40);
  
  return canvas.convertToBlob();
}

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`VM server running on port ${port}`);
});