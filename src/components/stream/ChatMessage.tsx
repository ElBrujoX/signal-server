import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  username: string;
  message: string;
  avatar: string;
  timestamp: string;
}

export function ChatMessage({ username, message, avatar, timestamp }: ChatMessageProps) {
  return (
    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={avatar} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-gray-900">{username}</p>
          <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 break-words">{message}</p>
      </div>
    </div>
  );
}