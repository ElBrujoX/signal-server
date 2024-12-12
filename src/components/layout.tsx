import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ContentCard } from '@/components/content-card';

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="flex-none" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto max-w-4xl">
            {/* Content will go here */}
            <div className="space-y-8">
              <h1 className="text-4xl font-bold tracking-tight">Discover Unlimited Content</h1>
              <div className="flex space-x-2">
                <Button variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">Popular</Button>
                <Button variant="ghost">Latest</Button>
                <Button variant="ghost">Top Rated</Button>
                <Button variant="ghost">Recommended</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ContentCard
                  image="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=400&h=600&fit=crop"
                  badge="8.9"
                  type="TV Show"
                  title="Loki"
                  year="2021"
                  seasons="2 Seasons"
                  episodes="All episodes"
                />
                {/* Add more cards as needed */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}