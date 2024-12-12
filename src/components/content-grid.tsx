import { ContentCard } from '@/components/content-card';

export function ContentGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <ContentCard
        image="/loki-poster.jpg"
        badge="8.9"
        type="TV Show"
        title="Loki"
        year="2021"
        seasons="2 Seasons"
        episodes="All episodes"
      />
      {/* Add more cards with grayscale filter for background cards */}
    </div>
  );
}