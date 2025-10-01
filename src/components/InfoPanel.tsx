import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Layers, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Incident {
  id: number;
  title: string;
  time: string;
  coords: string;
  description: string;
}

const InfoPanel = () => {
  const [layersCollapsed, setLayersCollapsed] = useState(false);
  const [incidentsCollapsed, setIncidentsCollapsed] = useState(false);

  const incidents: Incident[] = [
    {
      id: 1,
      title: 'Communication Loss',
      time: '23 Sep 2025 22:43 UTC',
      coords: '34.5918, 23.5688',
      description: 'Vessel lost contact with shore. Last known position recorded. Monitoring situation closely.',
    },
    {
      id: 2,
      title: 'Navigation Alert',
      time: '22 Sep 2025 14:15 UTC',
      coords: '34.4523, 23.4102',
      description: 'Unusual navigation pattern detected. Vessel reported minor mechanical issues but continuing journey.',
    },
    {
      id: 3,
      title: 'Weather Warning',
      time: '21 Sep 2025 08:30 UTC',
      coords: '34.3891, 23.2976',
      description: 'Severe weather conditions reported in the area. All vessels advised to exercise caution.',
    },
  ];

  return (
    <div className="h-full flex flex-col bg-card border-l">
      <div className="p-4 border-b bg-muted/30">
        <h1 className="text-lg font-bold mb-2">Global Flotilla Tracker</h1>
        <p className="text-sm text-muted-foreground mb-3">
          Monitoring the coordinated, nonviolent fleet of vessels in international waters.
        </p>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Global Flotilla Initiative
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Maritime Documentation Project
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Map Layers Section */}
          <div className="border rounded-lg">
            <div
              className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg"
              onClick={() => setLayersCollapsed(!layersCollapsed)}
            >
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Map Layers (3)</h3>
              </div>
              {layersCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </div>
            {!layersCollapsed && (
              <div className="p-3 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="vessels" defaultChecked className="rounded" />
                  <label htmlFor="vessels">Vessel Positions</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="routes" defaultChecked className="rounded" />
                  <label htmlFor="routes">Routes & Paths</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="zones" className="rounded" />
                  <label htmlFor="zones">Restricted Zones</label>
                </div>
              </div>
            )}
          </div>

          {/* Incidents Section */}
          <div className="border rounded-lg">
            <div
              className="flex items-center justify-between p-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors rounded-t-lg"
              onClick={() => setIncidentsCollapsed(!incidentsCollapsed)}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <h3 className="font-semibold text-sm">Incidents ({incidents.length})</h3>
              </div>
              {incidentsCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </div>
            {!incidentsCollapsed && (
              <div className="divide-y">
                {incidents.map((incident) => (
                  <div key={incident.id} className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm">{incident.title}</h4>
                      <Badge variant="destructive" className="text-xs">Alert</Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><span className="font-medium">Time:</span> {incident.time}</p>
                      <p><span className="font-medium">Coords:</span> {incident.coords}</p>
                    </div>
                    <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                      {incident.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default InfoPanel;
