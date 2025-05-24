
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Short } from '@/data/shorts';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentShort: Short;
  allShorts: Short[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const extractVideoId = (url: string): string | null => {
  const match = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export const VideoModal = ({ 
  isOpen, 
  onClose, 
  currentShort, 
  allShorts, 
  currentIndex, 
  onNavigate 
}: VideoModalProps) => {
  const videoId = extractVideoId(currentShort.short_url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1` : null;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < allShorts.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, allShorts.length]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] bg-slate-900 border-slate-700 p-0 overflow-hidden">
        <div className="flex h-full">
          {/* Video Section */}
          <div className="flex-1 relative bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={currentShort.title || "YouTube Short"}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Unable to load video</p>
              </div>
            )}

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="ml-4 bg-black/50 hover:bg-black/70 text-white disabled:opacity-30"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex === allShorts.length - 1}
                className="mr-4 bg-black/50 hover:bg-black/70 text-white disabled:opacity-30"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-80 bg-slate-800 p-6 flex flex-col">
            <div className="mb-4">
              <div className="text-sm text-slate-400 mb-2">
                {currentIndex + 1} of {allShorts.length}
              </div>
              {currentShort.title && (
                <h2 className="text-xl font-semibold text-white mb-4">
                  {currentShort.title}
                </h2>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentShort.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-purple-900/30 text-purple-300 border-purple-700/50"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Navigation Info */}
            <div className="mt-auto">
              <div className="text-sm text-slate-400 mb-4">
                Use ← → arrow keys to navigate
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentIndex === allShorts.length - 1}
                  className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
