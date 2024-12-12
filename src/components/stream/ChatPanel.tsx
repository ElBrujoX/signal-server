import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ChatPanel() {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Live Chat</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No messages yet</p>
          <p className="text-sm">Be the first to chat!</p>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-100">
        <form className="flex items-center space-x-2">
          <Input
            className="flex-1"
            placeholder="Type a message..."
            type="text"
          />
          <Button size="icon" className="bg-pink-500 hover:bg-pink-600">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}