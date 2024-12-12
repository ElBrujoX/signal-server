export interface VMState {
  id: string;
  status: 'idle' | 'running' | 'paused' | 'error';
  currentTask?: string;
  memoryUsage?: number;
  cpuUsage?: number;
  wsUrl?: string;
}

export interface StreamStats {
  viewers: number;
  uptime: number;
  quality: string;
  bitrate: number;
}

export interface AgentVM {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  streamKey: string;
  state: VMState;
  streamStats: StreamStats;
  wsConnection?: WebSocket;
}