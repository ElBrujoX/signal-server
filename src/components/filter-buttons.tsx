import { Button } from '@/components/ui/button';

export function FilterButtons() {
  return (
    <div className="flex justify-center space-x-2 mb-8">
      <Button variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700">Popular</Button>
      <Button variant="ghost">Latest</Button>
      <Button variant="ghost">Top Rated</Button>
      <Button variant="ghost">Recommended</Button>
    </div>
  );
}