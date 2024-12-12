import { useEffect, useRef, useState } from 'react';
import { VMClient } from '@/lib/vm/vm-connection';
import { Loader2 } from 'lucide-react';

interface VirtualDesktopProps {
  className?: string;
  agentId: string;
}

export function VirtualDesktop({ className, agentId }: VirtualDesktopProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vmClientRef = useRef<VMClient | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    try {
      vmClientRef.current = new VMClient(canvas, agentId);
      vmClientRef.current.connect();
      setIsConnecting(false);
    } catch (err) {
      setError('Failed to connect to VM');
      setIsConnecting(false);
    }

    const handleMouseEvent = (event: MouseEvent) => {
      vmClientRef.current?.sendMouseEvent(event);
    };

    const handleKeyEvent = (event: KeyboardEvent) => {
      vmClientRef.current?.sendKeyEvent(event);
    };

    canvas.addEventListener('mousedown', handleMouseEvent);
    canvas.addEventListener('mouseup', handleMouseEvent);
    canvas.addEventListener('mousemove', handleMouseEvent);
    window.addEventListener('keydown', handleKeyEvent);
    window.addEventListener('keyup', handleKeyEvent);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseEvent);
      canvas.removeEventListener('mouseup', handleMouseEvent);
      canvas.removeEventListener('mousemove', handleMouseEvent);
      window.removeEventListener('keydown', handleKeyEvent);
      window.removeEventListener('keyup', handleKeyEvent);
      vmClientRef.current?.disconnect();
    };
  }, [agentId]);

  return (
    <div className={`relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg ${className}`}>
      {isConnecting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <p className="text-white">{error}</p>
        </div>
      )}
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        tabIndex={0}
      />
    </div>
  );
}