import { BrowserEventEmitter } from './event-emitter';

interface Point {
  x: number;
  y: number;
}

interface WindowState {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  isActive: boolean;
}

export class DesktopSimulator extends BrowserEventEmitter {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cursorPos: Point = { x: 0, y: 0 };
  private targetPos: Point = { x: 0, y: 0 };
  private windows: WindowState[] = [];
  private animationFrame: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    super();
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.initializeWindows();
    this.startSimulation();
  }

  private initializeWindows() {
    this.windows = [
      {
        id: 'terminal',
        title: 'Terminal',
        x: 50,
        y: 50,
        width: 600,
        height: 400,
        content: '',
        isActive: true,
      },
      {
        id: 'browser',
        title: 'Web Browser',
        x: 200,
        y: 100,
        width: 800,
        height: 600,
        content: '',
        isActive: false,
      },
    ];
  }

  private startSimulation() {
    const animate = () => {
      this.updateCursorPosition();
      this.render();
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  private updateCursorPosition() {
    // Smooth cursor movement
    this.cursorPos.x += (this.targetPos.x - this.cursorPos.x) * 0.1;
    this.cursorPos.y += (this.targetPos.y - this.cursorPos.y) * 0.1;
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw windows
    this.windows.forEach(window => {
      this.drawWindow(window);
    });
    
    // Draw cursor
    this.drawCursor();
  }

  private drawWindow({ x, y, width, height, title, isActive }: WindowState) {
    this.ctx.fillStyle = isActive ? '#ffffff' : '#f0f0f0';
    this.ctx.strokeStyle = isActive ? '#2563eb' : '#d1d5db';
    this.ctx.lineWidth = 2;
    
    // Window background
    this.ctx.fillRect(x, y, width, height);
    this.ctx.strokeRect(x, y, width, height);
    
    // Title bar
    this.ctx.fillStyle = isActive ? '#2563eb' : '#9ca3af';
    this.ctx.fillRect(x, y, width, 30);
    
    // Title text
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '14px system-ui';
    this.ctx.fillText(title, x + 10, y + 20);
  }

  private drawCursor() {
    this.ctx.fillStyle = '#000000';
    this.ctx.beginPath();
    this.ctx.moveTo(this.cursorPos.x, this.cursorPos.y);
    this.ctx.lineTo(this.cursorPos.x + 12, this.cursorPos.y + 12);
    this.ctx.lineTo(this.cursorPos.x + 4, this.cursorPos.y + 12);
    this.ctx.lineTo(this.cursorPos.x + 4, this.cursorPos.y + 20);
    this.ctx.lineTo(this.cursorPos.x, this.cursorPos.y + 16);
    this.ctx.closePath();
    this.ctx.fill();
  }

  moveTo(x: number, y: number) {
    this.targetPos = { x, y };
  }

  clickAt(x: number, y: number) {
    this.moveTo(x, y);
    this.windows.forEach(window => {
      const isInWindow = 
        x >= window.x && 
        x <= window.x + window.width && 
        y >= window.y && 
        y <= window.y + window.height;
      
      window.isActive = isInWindow;
    });
  }

  cleanup() {
    cancelAnimationFrame(this.animationFrame);
  }
}