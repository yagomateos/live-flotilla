import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Play, Pause } from 'lucide-react';

const Timeline = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState([50]);

  const formatDate = (value: number) => {
    const start = new Date('2025-09-01');
    const days = Math.floor((value / 100) * 30);
    const date = new Date(start);
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-card border-t px-6 py-3">
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="shrink-0 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
        
        <div className="flex-1 flex items-center gap-4">
          <span className="text-xs text-muted-foreground shrink-0">
            {formatDate(0)}
          </span>
          <Slider
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground shrink-0">
            {formatDate(100)}
          </span>
        </div>
        
        <div className="text-sm font-medium shrink-0 min-w-[140px] text-right">
          {formatDate(value[0])}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
