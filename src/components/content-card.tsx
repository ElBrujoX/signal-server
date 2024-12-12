import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  image: string;
  badge: string;
  type: string;
  title: string;
  year: string;
  seasons: string;
  episodes: string;
  onClick?: () => void;
  className?: string;
}

export function ContentCard({
  image,
  badge,
  type,
  title,
  year,
  seasons,
  episodes,
  onClick,
  className,
}: ContentCardProps) {
  return (
    <Card 
      className={cn("group overflow-hidden rounded-[1.25rem] border-0 shadow-xl w-[280px] transition-all duration-500 cursor-pointer", className)}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3]">
          <img
            loading="lazy"
            src={image}
            alt={title}
            className="h-full w-full object-cover rounded-[1.25rem] bg-gray-100 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute left-4 right-4 bottom-4 space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-yellow-400 text-black font-medium px-2 py-0.5">
                ★ {badge}
              </Badge>
              <Badge variant="secondary" className="bg-black/40 text-white px-2 py-0.5">
                <Tv className="mr-1 h-3 w-3" />
                {type}
              </Badge>
            </div>
            <div className="space-y-1 text-white">
              <h3 className="text-lg font-bold leading-none">{title}</h3>
              <p className="text-xs text-white/70">
                {year} • {seasons} • {episodes}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}