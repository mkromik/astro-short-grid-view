
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink } from 'lucide-react';
import { Short } from '@/data/shorts';

interface VideoCardProps {
  short: Short;
}

const extractVideoId = (url: string): string | null => {
  const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export const VideoCard = ({ short }: VideoCardProps) => {
  const videoId = extractVideoId(short.short_url);
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

  const handleClick = () => {
    window.open(short.short_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group cursor-pointer bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
      <div className="relative aspect-[9/16] bg-gradient-to-br from-slate-700 to-slate-800" onClick={handleClick}>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={short.title || "YouTube Short"}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Play className="h-16 w-16 text-slate-500" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-purple-600 rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-8 w-8 text-white fill-white" />
          </div>
        </div>

        {/* External Link Icon */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-slate-900/80 rounded-full p-2">
            <ExternalLink className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      <div className="p-4">
        {short.title && (
          <h3 className="font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
            {short.title}
          </h3>
        )}
        
        <div className="flex flex-wrap gap-2">
          {short.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-purple-900/30 text-purple-300 border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};
