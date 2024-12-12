import { useEffect, useState } from 'react';
import { Activity, Cpu, HardDrive } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { VMState } from '@/lib/vm/types';

interface VMMonitorProps {
  state: VMState;
  className?: string;
}

export function VMMonitor({ state, className }: VMMonitorProps) {
  const [cpuHistory, setCpuHistory] = useState<number[]>([]);
  const [memoryHistory, setMemoryHistory] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = state.cpuUsage || Math.random() * 100;
      const newMemory = state.memoryUsage || Math.random() * 100;
      
      setCpuHistory(prev => [...prev.slice(-20), newCpu]);
      setMemoryHistory(prev => [...prev.slice(-20), newMemory]);
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  return (
    <Card className={`p-4 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">VM Status</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${
          state.status === 'running' ? 'bg-green-100 text-green-800' :
          state.status === 'error' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {state.status.toUpperCase()}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>CPU Usage</span>
          </div>
          <span>{Math.round(state.cpuUsage || 0)}%</span>
        </div>
        <Progress value={state.cpuUsage} className="h-1" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4" />
            <span>Memory Usage</span>
          </div>
          <span>{Math.round(state.memoryUsage || 0)}%</span>
        </div>
        <Progress value={state.memoryUsage} className="h-1" />
      </div>

      <div className="pt-2 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Activity className="h-4 w-4" />
          <span>{state.currentTask || 'Idle'}</span>
        </div>
      </div>
    </Card>
  );
}