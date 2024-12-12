const VM_SERVER_URL = import.meta.env.VITE_VM_SERVER_URL || 'ws://localhost:3001';

export class VMClient {
  private ws: WebSocket | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private agentId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(canvas: HTMLCanvasElement, agentId: string) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.agentId = agentId;
  }

  connect() {
    try {
      this.ws = new WebSocket(`${VM_SERVER_URL}/vm/${this.agentId}`);
      
      this.ws.onopen = () => {
        console.log('Connected to VM');
        this.sendInitMessage();
      };

      this.ws.onmessage = (event) => {
        if (event.data instanceof Blob) {
          this.handleVideoFrame(event.data);
        } else {
          this.handleControlMessage(JSON.parse(event.data));
        }
      };

      this.ws.onclose = () => {
        console.log('Disconnected from VM');
        this.attemptReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('VM WebSocket error:', error);
      };

    } catch (error) {
      console.error('Failed to connect to VM:', error);
    }
  }

  private sendInitMessage() {
    if (!this.ws) return;
    
    this.ws.send(JSON.stringify({
      type: 'init',
      agentId: this.agentId
    }));
  }

  private async handleVideoFrame(blob: Blob) {
    const bitmap = await createImageBitmap(blob);
    this.ctx.drawImage(bitmap, 0, 0, this.canvas.width, this.canvas.height);
  }

  private handleControlMessage(message: any) {
    switch (message.type) {
      case 'vm_stats':
        // Handle VM statistics (CPU, memory, etc.)
        break;
      case 'error':
        console.error('VM error:', message.error);
        break;
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.connect();
    }, 1000 * Math.pow(2, this.reconnectAttempts));
  }

  sendMouseEvent(event: MouseEvent) {
    if (!this.ws) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    this.ws.send(JSON.stringify({
      type: 'mouse',
      x,
      y,
      button: event.button,
      eventType: event.type
    }));
  }

  sendKeyEvent(event: KeyboardEvent) {
    if (!this.ws) return;
    
    this.ws.send(JSON.stringify({
      type: 'keyboard',
      key: event.key,
      code: event.code,
      eventType: event.type
    }));
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}