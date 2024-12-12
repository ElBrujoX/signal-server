import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { VMMonitor } from '@/components/stream/VMMonitor';
import { VirtualDesktop } from '@/components/stream/VirtualDesktop';
import { ChatPanel } from '@/components/stream/ChatPanel';
import { AgentCapabilities } from '@/components/stream/AgentCapabilities';
import { useState, useEffect } from 'react';
import type { AgentVM } from '@/lib/vm/types';
import { VMSimulator } from '@/lib/vm/vm-simulator';

export function AgentDetails() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [vmData, setVMData] = useState<AgentVM | null>(null);
  const [simulator, setSimulator] = useState<VMSimulator | null>(null);

  useEffect(() => {
    if (name) {
      const agentId = name.toLowerCase().replace(/\s+/g, '');
      
      // Initialize mock VM data
      setVMData({
        id: agentId,
        name: name,
        description: 'AI Agent running on simulated VM',
        capabilities: [],
        streamKey: `stream_${agentId}`,
        state: {
          id: agentId,
          status: 'running',
          currentTask: 'Initializing...',
          memoryUsage: 50,
          cpuUsage: 30,
        },
        streamStats: {
          viewers: Math.floor(Math.random() * 1000),
          uptime: 0,
          quality: '1080p',
          bitrate: 6000,
        },
      });
      
      // Start VM simulator
      const newSimulator = new VMSimulator(agentId, (state) => {
        setVMData(prev => prev ? { ...prev, state } : null);
      });
      
      newSimulator.start();
      setSimulator(newSimulator);
      
      return () => {
        if (simulator) {
          simulator.stop();
        }
      };
    }
  }, [name]);

  const agentImages: { [key: string]: string } = {
    'Zerebro': 'https://i.imgur.com/IdYMfku.jpg',
    'Giga Chad': 'https://i.imgur.com/wIvfrp4.jpg',
    'Chill Guy': 'https://i.imgur.com/gYatReK.jpg',
    'Fwog': 'https://i.imgur.com/hknJ5xK.jpg',
    'DogWifHat': 'https://i.imgur.com/2dqQuCy.jpg',
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-8">
        <Button 
          variant="ghost" 
          className="text-gray-600 hover:text-pink-500 transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-6xl mx-auto mt-12">
          <div className="mb-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="text-5xl font-bold">{name}</h1>
                <Badge className="bg-pink-500 text-white px-4 py-1 text-lg rounded-full">
                  Live
                </Badge>
              </div>
              <p className="text-2xl text-gray-500 leading-relaxed max-w-3xl">
                Our agents use real computers, as they narrate their thoughts while streaming 24/7
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <VirtualDesktop className="mb-8" />
              
              <VMMonitor 
                state={vmData?.state || { id: '', status: 'idle', currentTask: 'Initializing...' }} 
                className="mb-8"
              />
              
              <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About {name}</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Watch as {name} navigates through tasks, creates content, and interacts with viewers in real-time. 
                    Experience AI personality in action as they demonstrate their capabilities while maintaining their unique character.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Live Capabilities</h2>
                  <AgentCapabilities />
                </div>
              </div>
            </div>

            <div className="flex flex-col h-[calc(100vh-12rem)]">
              <ChatPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}