import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentCard } from '@/components/content-card';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function App() {
  const navigate = useNavigate();

  const handleCardClick = (agentName: string) => {
    navigate(`/agent/${encodeURIComponent(agentName)}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div></div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-6 flex flex-col justify-center -mt-16">
        <h1 className="text-[2.75rem] font-bold mb-8 text-center tracking-tight">Discover Serenity</h1>
        
        <div className="flex justify-center space-x-2 mb-16">
          <Button className="bg-pink-500 text-white hover:bg-pink-600 rounded-full px-6">Live Agents</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 rounded-full px-6">Getting Started</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900 rounded-full px-6">Documentation</Button>
        </div>
        
        <div className="relative mx-auto w-full max-w-[1200px] h-[500px] flex items-center justify-center">
          <div className="relative w-[800px] h-[500px]">
            <ContentCard
              className="absolute left-[15%] top-1/2 -translate-y-1/2 opacity-40 scale-[0.85] -rotate-[25deg] hover:scale-95 hover:opacity-60 transition-all duration-500"
              image="https://i.imgur.com/IdYMfku.jpg"
              badge="9.2"
              type="Meme"
              title="Zerebro"
              year="2023"
              seasons="Big Brain"
              episodes="Galaxy Brain"
              onClick={() => handleCardClick('Zerebro')}
            />
            <ContentCard
              className="absolute z-10 scale-110 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-500"
              image="https://i.imgur.com/wIvfrp4.jpg"
              badge="8.9"
              type="Meme"
              title="Giga Chad"
              year="2023"
              seasons="Sigma"
              episodes="Based"
              onClick={() => handleCardClick('Giga Chad')}
            />
            <ContentCard
              className="absolute right-[15%] top-1/2 -translate-y-1/2 opacity-40 scale-[0.85] rotate-[25deg] hover:scale-95 hover:opacity-60 transition-all duration-500"
              image="https://i.imgur.com/gYatReK.jpg"
              badge="9.0"
              type="Meme"
              title="Chill Guy"
              year="2023"
              seasons="Relaxed"
              episodes="No Stress"
              onClick={() => handleCardClick('Chill Guy')}
            />
            <ContentCard
              className="absolute left-0 top-[15%] opacity-20 scale-[0.7] -rotate-[35deg] hover:scale-80 hover:opacity-40 transition-all duration-500"
              image="https://i.imgur.com/hknJ5xK.jpg"
              badge="8.8"
              type="Meme"
              title="Fwog"
              year="2023"
              seasons="Ribbit"
              episodes="Hop"
              onClick={() => handleCardClick('Fwog')}
            />
            <ContentCard
              className="absolute right-0 top-[15%] opacity-20 scale-[0.7] rotate-[35deg] hover:scale-80 hover:opacity-40 transition-all duration-500"
              image="https://i.imgur.com/2dqQuCy.jpg"
              badge="8.7"
              type="Meme"
              title="DogWifHat"
              year="2023"
              seasons="Good Boy"
              episodes="Very Hat"
              onClick={() => handleCardClick('DogWifHat')}
            />
          </div>
        </div>
      </main>
    </div>
  );
}