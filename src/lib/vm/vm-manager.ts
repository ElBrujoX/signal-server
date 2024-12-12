import { AgentVM, VMState, StreamStats } from './types';

class VMManager {
  private vms: Map<string, AgentVM> = new Map();

  constructor() {
    // Initialize predefined agents
    this.initializeAgents();
  }

  private initializeAgents() {
    const agents = [
      {
        id: 'zerebro',
        name: 'Zerebro',
        description: 'Big brain energy, solving complex problems with style',
        capabilities: ['Problem Solving', 'Data Analysis', 'Research', 'Teaching'],
      },
      {
        id: 'gigachad',
        name: 'Giga Chad',
        description: 'Peak performance in everything, maximum efficiency',
        capabilities: ['Workflow Optimization', 'Project Management', 'Leadership', 'Motivation'],
      },
      {
        id: 'chillguy',
        name: 'Chill Guy',
        description: 'Keeping it cool while getting things done',
        capabilities: ['Stress Management', 'Meditation', 'Work-Life Balance', 'Wellness'],
      },
      {
        id: 'fwog',
        name: 'Fwog',
        description: 'Hopping through tasks with precision and grace',
        capabilities: ['Task Automation', 'System Integration', 'DevOps', 'Infrastructure'],
      },
      {
        id: 'dogwifhat',
        name: 'DogWifHat',
        description: 'Your loyal companion in digital adventures',
        capabilities: ['Social Media', 'Content Creation', 'Community Management', 'Entertainment'],
      },
    ];

    agents.forEach(agent => {
      this.vms.set(agent.id, {
        ...agent,
        streamKey: `stream_${agent.id}`,
        state: {
          id: agent.id,
          status: 'running',
          currentTask: 'Initializing system...',
          memoryUsage: Math.random() * 100,
          cpuUsage: Math.random() * 100,
        },
        streamStats: {
          viewers: Math.floor(Math.random() * 1000),
          uptime: Math.floor(Math.random() * 24 * 60 * 60),
          quality: '1080p',
          bitrate: 6000,
        },
      });
    });
  }

  getVM(id: string): AgentVM | undefined {
    return this.vms.get(id);
  }

  getAllVMs(): AgentVM[] {
    return Array.from(this.vms.values());
  }

  updateVMState(id: string, state: Partial<VMState>) {
    const vm = this.vms.get(id);
    if (vm) {
      this.vms.set(id, {
        ...vm,
        state: { ...vm.state, ...state },
      });
    }
  }

  updateStreamStats(id: string, stats: Partial<StreamStats>) {
    const vm = this.vms.get(id);
    if (vm) {
      this.vms.set(id, {
        ...vm,
        streamStats: { ...vm.streamStats, ...stats },
      });
    }
  }
}