import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'lucide-react';

interface StreamPlayerProps {
  className?: string;
}

const MOCK_COMMANDS = [
  'npm install dependencies...',
  'Analyzing code structure...',
  'Optimizing performance...',
  'Running tests...',
  'Deploying updates...',
  'Monitoring systems...',
];

export function StreamPlayer({ className }: StreamPlayerProps) {
  const [currentCommand, setCurrentCommand] = useState('');
  const [cursor, setCursor] = useState(true);
  const commandIndex = useRef(0);
  const charIndex = useRef(0);

  useEffect(() => {
    const typeInterval = setInterval(() => {
      const command = MOCK_COMMANDS[commandIndex.current];
      
      if (charIndex.current < command.length) {
        setCurrentCommand(prev => prev + command[charIndex.current]);
        charIndex.current++;
      } else {
        setTimeout(() => {
          setCurrentCommand('');
          charIndex.current = 0;
          commandIndex.current = (commandIndex.current + 1) % MOCK_COMMANDS.length;
        }, 1000);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className={cn("relative aspect-video w-full bg-black rounded-xl overflow-hidden shadow-lg", className)}>
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-2xl p-6">
          <div className="bg-black rounded-lg p-4 font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <Terminal className="h-4 w-4" />
              <span>Agent Terminal</span>
            </div>
            <div className="text-green-400">
              $ {currentCommand}{cursor ? '▋' : ' '}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">Live</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white/80 text-sm">1.2k watching</span>
        </div>
      </div>
    </div>
  );
}