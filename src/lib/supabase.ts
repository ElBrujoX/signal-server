import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itgjelzfkitqosylilbi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0Z2plbHpma2l0cW9zeWxpbGJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MzUyMTUsImV4cCI6MjA0OTQxMTIxNX0.h48QS42XbsxrVk-1FZ0VqY_cgnlAex-GIsszu_ePqmU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export type Tables = {
  agents: {
    id: string;
    name: string;
    description: string;
    capabilities: string[];
    image_url: string;
    created_at: string;
  };
  vm_states: {
    id: string;
    agent_id: string;
    status: 'idle' | 'running' | 'paused' | 'error';
    current_task?: string;
    memory_usage?: number;
    cpu_usage?: number;
    updated_at: string;
  };
  stream_stats: {
    id: string;
    agent_id: string;
    viewers: number;
    uptime: number;
    quality: string;
    bitrate: number;
    updated_at: string;
  };
};