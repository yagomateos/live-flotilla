import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  vessels: Array<{
    id: number;
    name: string;
    position: [number, number];
    status: string;
    trajectory?: [number, number][];
    speed?: number;
    heading?: number;
    trackerId?: string;
  }>;
}

const MapView = ({ vessels }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<Map<number, L.Marker>>(new Map());
  const trajectories = useRef<Map<number, L.Polyline>>(new Map());

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map - center on Mediterranean Sea west of Gaza
    map.current = L.map(mapContainer.current).setView([31.8, 32.3], 7);

    // Add CartoDB Dark Matter tiles (modern, clean style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
      markers.current.clear();
      trajectories.current.clear();
    };
  }, []);

  // Update markers when vessels change
  useEffect(() => {
    if (!map.current) return;

    // Custom icon for vessels
    const vesselIcon = L.divIcon({
      className: 'custom-vessel-marker',
      html: '<div style="background-color: #3b82f6; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    // Get current vessel IDs
    const currentVesselIds = new Set(vessels.map(v => v.id));

    // Remove markers and trajectories for vessels that no longer exist
    markers.current.forEach((marker, id) => {
      if (!currentVesselIds.has(id)) {
        marker.remove();
        markers.current.delete(id);
      }
    });

    trajectories.current.forEach((trajectory, id) => {
      if (!currentVesselIds.has(id)) {
        trajectory.remove();
        trajectories.current.delete(id);
      }
    });

    // Update or create markers and trajectories for each vessel
    vessels.forEach((vessel) => {
      const existingMarker = markers.current.get(vessel.id);

      // Update or create trajectory line (like Forensic Architecture visualization)
      if (vessel.trajectory && vessel.trajectory.length > 1) {
        const existingTrajectory = trajectories.current.get(vessel.id);

        if (existingTrajectory) {
          // Update existing trajectory
          existingTrajectory.setLatLngs(vessel.trajectory);
        } else {
          // Create new trajectory line
          const trajectoryLine = L.polyline(vessel.trajectory, {
            color: '#3b82f6',
            weight: 2,
            opacity: 0.6,
            smoothFactor: 1,
          }).addTo(map.current!);
          trajectories.current.set(vessel.id, trajectoryLine);
        }
      }

      if (existingMarker) {
        // Update existing marker position
        existingMarker.setLatLng([vessel.position[0], vessel.position[1]]);
        existingMarker.setPopupContent(
          `<div style="padding: 12px; min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 16px;">${vessel.name}</h3>
            <div style="font-size: 13px; line-height: 1.6;">
              <p style="margin: 4px 0;"><strong>Status:</strong> ${vessel.status}</p>
              ${vessel.speed ? `<p style="margin: 4px 0;"><strong>Speed:</strong> ${vessel.speed.toFixed(1)} knots</p>` : ''}
              ${vessel.heading ? `<p style="margin: 4px 0;"><strong>Heading:</strong> ${vessel.heading.toFixed(0)}°</p>` : ''}
              ${vessel.trackerId ? `<p style="margin: 4px 0;"><strong>Tracker:</strong> ${vessel.trackerId}</p>` : ''}
              <p style="margin: 4px 0; font-size: 11px; color: #666;">
                ${vessel.position[0].toFixed(4)}, ${vessel.position[1].toFixed(4)}
              </p>
            </div>
          </div>`
        );
      } else {
        // Create new marker
        const marker = L.marker([vessel.position[0], vessel.position[1]], { icon: vesselIcon })
          .addTo(map.current!)
          .bindPopup(
            `<div style="padding: 12px; min-width: 200px;">
              <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 16px;">${vessel.name}</h3>
              <div style="font-size: 13px; line-height: 1.6;">
                <p style="margin: 4px 0;"><strong>Status:</strong> ${vessel.status}</p>
                ${vessel.speed ? `<p style="margin: 4px 0;"><strong>Speed:</strong> ${vessel.speed.toFixed(1)} knots</p>` : ''}
                ${vessel.heading ? `<p style="margin: 4px 0;"><strong>Heading:</strong> ${vessel.heading.toFixed(0)}°</p>` : ''}
                ${vessel.trackerId ? `<p style="margin: 4px 0;"><strong>Tracker:</strong> ${vessel.trackerId}</p>` : ''}
                <p style="margin: 4px 0; font-size: 11px; color: #666;">
                  ${vessel.position[0].toFixed(4)}, ${vessel.position[1].toFixed(4)}
                </p>
              </div>
            </div>`
          );
        markers.current.set(vessel.id, marker);
      }
    });
  }, [vessels]);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapView;
