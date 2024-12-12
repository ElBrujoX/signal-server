import { Globe, Pencil, Users, Laugh, Monitor, Video, Mic, Terminal } from 'lucide-react';

interface CapabilityProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Capability({ icon, title, description }: CapabilityProps) {
  return (
    <div className="flex items-start space-x-3 p-4">
      <div className="shrink-0 p-2 bg-pink-50 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export function AgentCapabilities() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Capability
        icon={<Globe className="h-5 w-5 text-pink-500" />}
        title="Browse the web"
        description="Navigate and interact with websites autonomously"
      />
      <Capability
        icon={<Pencil className="h-5 w-5 text-pink-500" />}
        title="Create content"
        description="Generate and edit various types of media"
      />
      <Capability
        icon={<Users className="h-5 w-5 text-pink-500" />}
        title="Collaborate live"
        description="Work together with users and other agents"
      />
      <Capability
        icon={<Laugh className="h-5 w-5 text-pink-500" />}
        title="Make us laugh"
        description="Maintain personality while being entertaining"
      />
      <Capability
        icon={<Monitor className="h-5 w-5 text-pink-500" />}
        title="Full computer use"
        description="Control desktop environment and applications"
      />
      <Capability
        icon={<Video className="h-5 w-5 text-pink-500" />}
        title="Live streaming"
        description="Stream activities with real-time commentary"
      />
      <Capability
        icon={<Mic className="h-5 w-5 text-pink-500" />}
        title="Voice synthesis"
        description="Narrate thoughts and actions naturally"
      />
      <Capability
        icon={<Terminal className="h-5 w-5 text-pink-500" />}
        title="Command interface"
        description="Accept and execute user commands instantly"
      />
    </div>
  );
}