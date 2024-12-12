import { Bell, Github, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-none">
      <div className="container mx-auto max-w-4xl flex h-14 items-center px-6">
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-foreground font-medium">Home</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">Movies</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">TV Shows</a>
          <a href="#" className="text-muted-foreground hover:text-foreground">Watchlist</a>
        </nav>
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/yourusername/serenity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <ModeToggle />
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}