import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Ship } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Vessel {
  id: number;
  name: string;
  location: string;
  position: [number, number];
  status: string;
}

interface VesselListProps {
  vessels: Vessel[];
  onVesselClick?: (vessel: Vessel) => void;
}

const VesselList = ({ vessels, onVesselClick }: VesselListProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="h-full flex flex-col bg-card border-r">
      <div 
        className="flex items-center justify-between p-4 border-b bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-2">
          <Ship className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Vessels ({vessels.length})</h2>
        </div>
        {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </div>
      
      {!collapsed && (
        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="space-y-1">
              {vessels.map((vessel, index) => (
                <div key={vessel.id} className="border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <div
                    className="p-3 cursor-pointer"
                    onClick={() => {
                      toggleExpand(vessel.id);
                      onVesselClick?.(vessel);
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">{index + 1}.</span>
                          <h3 className="font-medium text-sm truncate">{vessel.name}</h3>
                        </div>
                        {vessel.location && (
                          <p className="text-xs text-muted-foreground truncate">
                            ({vessel.location})
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(vessel.id);
                        }}
                        className="shrink-0 text-muted-foreground hover:text-foreground"
                      >
                        {expandedId === vessel.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {vessel.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {vessel.position[0].toFixed(4)}, {vessel.position[1].toFixed(4)}
                      </span>
                    </div>
                  </div>
                  
                  {expandedId === vessel.id && (
                    <div className="px-3 pb-3 pt-1 text-xs text-muted-foreground space-y-1 border-t">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <span className="font-medium">Latitude:</span> {vessel.position[0].toFixed(6)}
                        </div>
                        <div>
                          <span className="font-medium">Longitude:</span> {vessel.position[1].toFixed(6)}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span> {vessel.status}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> Vessel
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default VesselList;
