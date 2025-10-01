import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Clock, Radio } from 'lucide-react';
import { vesselService } from '@/services/vesselService';

interface TimelineProps {
  onTimeChange?: (timestamp: Date | null) => void;
}

const Timeline = ({ onTimeChange }: TimelineProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState([0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLiveMode, setIsLiveMode] = useState(false);

  const dateRange = vesselService.getMissionDateRange();

  // Calculate timestamp from slider value
  const getTimestampFromValue = (val: number): Date => {
    const totalMs = dateRange.end.getTime() - dateRange.start.getTime();
    const timestamp = new Date(dateRange.start.getTime() + (val / 100) * totalMs);
    return timestamp;
  };

  // Update parent component when time changes
  useEffect(() => {
    if (isLiveMode) {
      onTimeChange?.(null);
    } else {
      const timestamp = getTimestampFromValue(value[0]);
      onTimeChange?.(timestamp);
    }
  }, [value, isPlaying, isLiveMode, onTimeChange]);

  // Auto-advance timeline when playing
  useEffect(() => {
    if (isPlaying && !isLiveMode) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
        setValue(prev => {
          const newValue = prev[0] + 0.2; // Advance 0.2% per second
          if (newValue >= 100) {
            setIsPlaying(false);
            return [100];
          }
          return [newValue];
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, isLiveMode]);

  // Update clock in live mode
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  const formatDate = (timestamp: Date) => {
    return timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const currentTimestamp = getTimestampFromValue(value[0]);

  return (
    <div className="bg-card border-t px-6 py-4">
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        <button
          onClick={() => {
            if (isLiveMode) {
              setIsLiveMode(false);
              setIsPlaying(true);
            } else {
              setIsPlaying(!isPlaying);
            }
          }}
          className="shrink-0 p-2 rounded-full hover:bg-accent transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>

        <button
          onClick={() => {
            setIsLiveMode(!isLiveMode);
            setIsPlaying(false);
            if (!isLiveMode) {
              setValue([100]); // Jump to end when entering live mode
            }
          }}
          className={`shrink-0 p-2 rounded-full hover:bg-accent transition-colors ${
            isLiveMode ? 'bg-red-500/20 text-red-500' : ''
          }`}
          aria-label="Live Mode"
          title="Live Mode"
        >
          <Radio className={`h-5 w-5 ${isLiveMode ? 'animate-pulse' : ''}`} />
        </button>

        <div className="flex-1 flex items-center gap-4">
          <span className="text-xs text-muted-foreground shrink-0 font-medium">
            {formatDate(dateRange.start)}
          </span>
          <div className="flex-1">
            <Slider
              value={value}
              onValueChange={(newValue) => {
                setValue(newValue);
                setIsPlaying(false);
                setIsLiveMode(false);
              }}
              max={100}
              step={0.1}
              className="flex-1"
              disabled={isLiveMode}
            />
          </div>
          <span className="text-xs text-muted-foreground shrink-0 font-medium">
            {formatDate(dateRange.end)}
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-sm font-semibold min-w-[140px] text-right">
            {isLiveMode ? 'LIVE' : formatDate(currentTimestamp)}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-mono">
              {isLiveMode ? formatTime(currentTime) : formatTime(currentTimestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
