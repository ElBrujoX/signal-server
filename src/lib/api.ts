import { supabase } from './supabase';
import type { Tables } from './supabase';
import type { AgentVM } from './vm/types';

export async function fetchAllAgents(): Promise<AgentVM[]> {
  const { data: agents, error: agentsError } = await supabase
    .from('agents')
    .select('*');

  if (agentsError) throw agentsError;

  // Fetch VM states and stream stats for each agent
  const agentVMs = await Promise.all(
    agents.map(async (agent) => {
      const [{ data: vmState }, { data: streamStats }] = await Promise.all([
        supabase
          .from('vm_states')
          .select('*')
          .eq('agent_id', agent.id)
          .single(),
        supabase
          .from('stream_stats')
          .select('*')
          .eq('agent_id', agent.id)
          .single(),
      ]);

      return {
        id: agent.id,
        name: agent.name,
        description: agent.description,
        capabilities: agent.capabilities,
        streamKey: `stream_${agent.id}`,
        state: vmState || {
          id: agent.id,
          status: 'idle',
        },
        streamStats: streamStats || {
          viewers: 0,
          uptime: 0,
          quality: '1080p',
          bitrate: 6000,
        },
      };
    })
  );

  return agentVMs;
}

export async function fetchAgent(id: string): Promise<AgentVM> {
  try {
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', id)
      .single();

    if (agentError) {
      console.error('Error fetching agent:', agentError);
      return getMockAgent(id);
    }

    const [{ data: vmState }, { data: streamStats }] = await Promise.all([
      supabase
        .from('vm_states')
        .select('*')
        .eq('agent_id', id)
        .single(),
      supabase
        .from('stream_stats')
        .select('*')
        .eq('agent_id', id)
        .single(),
    ]);

    return {
      id: agent.id,
      name: agent.name,
      description: agent.description,
      capabilities: agent.capabilities,
      streamKey: `stream_${agent.id}`,
      state: vmState || {
        id: agent.id,
        status: 'idle',
      },
      streamStats: streamStats || {
        viewers: 0,
        uptime: 0,
        quality: '1080p',
        bitrate: 6000,
      },
    };
  } catch (error) {
    console.error('Error in fetchAgent:', error);
    return getMockAgent(id);
  }
}

export async function subscribeToAgent(
  agentId: string,
  callback: (vm: Partial<AgentVM>) => void
) {
  const vmStatesSubscription = supabase
    .channel(`vm_states:${agentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'vm_states',
        filter: `agent_id=eq.${agentId}`,
      },
      (payload) => {
        callback({ state: payload.new as AgentVM['state'] });
      }
    )
    .subscribe();

  const streamStatsSubscription = supabase
    .channel(`stream_stats:${agentId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'stream_stats',
        filter: `agent_id=eq.${agentId}`,
      },
      (payload) => {
        callback({ streamStats: payload.new as AgentVM['streamStats'] });
      }
    )
    .subscribe();

  return () => {
    vmStatesSubscription.unsubscribe();
    streamStatsSubscription.unsubscribe();
  };
}

// Fallback mock data for development
function getMockAgent(id: string): AgentVM {
  const mockAgents = {
    zerebro: {
      name: 'Zerebro',
      description: 'Big brain energy, solving complex problems with style',
      capabilities: ['Problem Solving', 'Data Analysis', 'Research', 'Teaching'],
    },
    gigachad: {
      name: 'Giga Chad',
      description: 'Peak performance in everything, maximum efficiency',
      capabilities: ['Workflow Optimization', 'Project Management', 'Leadership', 'Motivation'],
    },
    chillguy: {
      name: 'Chill Guy',
      description: 'Keeping it cool while getting things done',
      capabilities: ['Stress Management', 'Meditation', 'Work-Life Balance', 'Wellness'],
    },
    fwog: {
      name: 'Fwog',
      description: 'Hopping through tasks with precision and grace',
      capabilities: ['Task Automation', 'System Integration', 'DevOps', 'Infrastructure'],
    },
    dogwifhat: {
      name: 'DogWifHat',
      description: 'Your loyal companion in digital adventures',
      capabilities: ['Social Media', 'Content Creation', 'Community Management', 'Entertainment'],
    },
  };

  const agent = mockAgents[id as keyof typeof mockAgents];
  
  return {
    id,
    name: agent?.name || 'Unknown Agent',
    description: agent?.description || 'Description unavailable',
    capabilities: agent?.capabilities || [],
    streamKey: `stream_${id}`,
    state: {
      id,
      status: 'running',
      currentTask: 'Processing tasks...',
      memoryUsage: Math.random() * 100,
      cpuUsage: Math.random() * 100,
    },
    streamStats: {
      viewers: Math.floor(Math.random() * 1000),
      uptime: Math.floor(Math.random() * 24 * 60 * 60),
      quality: '1080p',
      bitrate: 6000,
    },
  };
}