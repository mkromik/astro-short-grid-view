
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearAll: () => void;
}

export const TagFilter = ({ allTags, selectedTags, onToggleTag, onClearAll }: TagFilterProps) => {
  return (
    <div className="mb-8">
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-slate-300">Active Filters:</span>
            <Button
              onClick={onClearAll}
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                className="bg-purple-600 text-white border-purple-500 hover:bg-purple-700 cursor-pointer transition-colors duration-200 pr-1"
                onClick={() => onToggleTag(tag)}
              >
                {tag}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* All Available Tags */}
      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-3">Filter by Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-purple-600 text-white border-purple-500 hover:bg-purple-700"
                    : "border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-300 hover:bg-purple-500/10"
                }`}
                onClick={() => onToggleTag(tag)}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};
