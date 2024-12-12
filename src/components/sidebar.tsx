import { Home, Film, Tv2, Bookmark, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', icon: Home },
  { name: 'Movies', icon: Film },
  { name: 'TV Shows', icon: Tv2 },
  { name: 'Watchlist', icon: Bookmark },
  { name: 'Settings', icon: Settings },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}