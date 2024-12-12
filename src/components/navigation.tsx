import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  return (
    <div className="flex items-center p-4 space-x-6">
      <Button variant="ghost" size="icon" className="shrink-0">
        <Menu className="h-6 w-6" />
      </Button>
      <nav className="flex items-center space-x-6">
        <a href="#" className="text-sm font-semibold text-purple-600 border-b-2 border-purple-600 pb-1">Home</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Movies</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">TV Shows</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Watchlist</a>
      </nav>
    </div>
  );
}