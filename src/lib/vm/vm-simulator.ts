import { BrowserEventEmitter } from './event-emitter';
import { AGENT_TASKS } from './mock-tasks';
import { VMState } from './types';

export class VMSimulator extends BrowserEventEmitter {
  private taskInterval: number;
  private updateCallback: (state: VMState) => void;
  private currentTaskIndex: number = 0;
  private agentId: string;

  constructor(agentId: string, updateCallback: (state: VMState) => void) {
    super();
    this.agentId = agentId;
    this.updateCallback = updateCallback;
    this.taskInterval = 0;
  }

  start() {
    this.taskInterval = setInterval(() => {
      const tasks = AGENT_TASKS[this.agentId as keyof typeof AGENT_TASKS] || [];
      this.currentTaskIndex = (this.currentTaskIndex + 1) % tasks.length;
      
      this.updateCallback({
        id: this.agentId,
        status: 'running',
        currentTask: tasks[this.currentTaskIndex],
        cpuUsage: 30 + Math.random() * 40,
        memoryUsage: 40 + Math.random() * 30,
      });
    }, 5000);
  }

  stop() {
    clearInterval(this.taskInterval);
  }
}