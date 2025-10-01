import { useState, useEffect } from 'react';
import VesselList from '@/components/VesselList';
import MapView from '@/components/MapView';
import InfoPanel from '@/components/InfoPanel';
import Timeline from '@/components/Timeline';
import { vesselService } from '@/services/vesselService';

const Index = () => {
  const [vessels, setVessels] = useState(vesselService.getVessels());

  // Fetch and update vessel positions in real-time
  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      const data = await vesselService.fetchVesselData();
      setVessels(data);
    };

    // Update every 3 seconds for realistic movement
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 flex-shrink-0">
          <VesselList vessels={vessels} />
        </div>

        <div className="flex-1">
          <MapView vessels={vessels} />
        </div>

        <div className="w-96 flex-shrink-0">
          <InfoPanel />
        </div>
      </div>

      <Timeline />
    </div>
  );
};

export default Index;
