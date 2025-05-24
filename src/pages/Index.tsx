
import { useState, useMemo } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Filter, Play } from 'lucide-react';
import { shortsData } from '@/data/shorts';
import { VideoCard } from '@/components/VideoCard';
import { TagFilter } from '@/components/TagFilter';

const Index = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    shortsData.forEach(short => {
      short.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter shorts based on selected tags and search term
  const filteredShorts = useMemo(() => {
    return shortsData.filter(short => {
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => short.tags.includes(tag));
      
      const matchesSearch = searchTerm === '' ||
        short.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        short.title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTags && matchesSearch;
    });
  }, [selectedTags, searchTerm]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            {/* Title */}
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                YouTube Shorts
              </h1>
              <p className="text-slate-400 text-lg">Discover and filter amazing short videos</p>
            </div>

            {/* Search */}
            <div className="relative max-w-md mx-auto w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by tags or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tag Filter */}
        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onClearAll={clearAllFilters}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-purple-400" />
            <span className="text-slate-300">
              {filteredShorts.length} short{filteredShorts.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          {(selectedTags.length > 0 || searchTerm) && (
            <Button 
              onClick={clearAllFilters}
              variant="outline"
              className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
            >
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Video Grid */}
        {filteredShorts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShorts.map((short, index) => (
              <VideoCard key={index} short={short} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Play className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No shorts found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
