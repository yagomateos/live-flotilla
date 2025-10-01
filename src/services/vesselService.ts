// Service to fetch and manage vessel data
// Based on Global Sumud Flotilla data structure
// Simulates Garmin GPS tracker data as used by Forensic Architecture

export interface Vessel {
  id: number;
  name: string;
  location: string;
  position: [number, number];
  status: 'sailing' | 'anchored' | 'docked';
  speed?: number; // knots
  heading?: number; // degrees
  destination?: string;
  lastUpdate?: Date;
  trackerId?: string; // Garmin tracker ID
  trajectory?: [number, number][]; // Historical positions for trail visualization
}

export interface VesselHistoryPoint {
  position: [number, number];
  timestamp: Date;
  speed: number;
  heading: number;
  status: 'sailing' | 'anchored' | 'docked';
}

export interface VesselHistory {
  id: number;
  name: string;
  location: string;
  trackerId: string;
  history: VesselHistoryPoint[];
}

// Initial vessel data - positioned in Mediterranean Sea west of Gaza
// Based on news reports: flotilla was ~150 nautical miles from Gaza coast
// Gaza coast is at approximately 31.5°N, 34.45°E
// 150 nautical miles west = approximately 32.0°N, 31.5°E
const initialVesselsData: Vessel[] = [
  { id: 1, name: 'Adagio', location: 'Mediterranean Sea', position: [32.1, 31.6], status: 'sailing', speed: 8, heading: 90 },
  { id: 2, name: 'Adara', location: 'Mediterranean Sea', position: [32.0, 31.4], status: 'sailing', speed: 7, heading: 85 },
  { id: 3, name: 'Ahed Tamimi', location: 'Mediterranean Sea', position: [32.2, 31.8], status: 'sailing', speed: 9, heading: 95 },
  { id: 4, name: 'Alma', location: 'Mediterranean Sea', position: [31.9, 31.3], status: 'sailing', speed: 8, heading: 88 },
  { id: 5, name: 'Amsterdam', location: 'Mediterranean Sea', position: [32.15, 31.7], status: 'sailing', speed: 9, heading: 92 },
  { id: 6, name: 'Aurora', location: 'Mediterranean Sea', position: [31.95, 31.35], status: 'sailing', speed: 7, heading: 83 },
  { id: 7, name: 'Captain Nikos', location: 'Mediterranean Sea', position: [32.3, 31.9], status: 'sailing', speed: 6, heading: 100 },
  { id: 8, name: 'Catalina', location: 'Mediterranean Sea', position: [32.05, 31.5], status: 'sailing', speed: 9, heading: 94 },
  { id: 9, name: 'Familia Madeira', location: 'Mediterranean Sea', position: [31.85, 31.2], status: 'sailing', speed: 6.5, heading: 80 },
  { id: 10, name: 'Free Willy', location: 'Mediterranean Sea', position: [32.12, 31.62], status: 'sailing', speed: 8, heading: 89 },
  { id: 11, name: 'Grande Blu', location: 'Mediterranean Sea', position: [32.25, 31.85], status: 'sailing', speed: 9, heading: 98 },
  { id: 12, name: 'Karma', location: 'Mediterranean Sea', position: [32.08, 31.55], status: 'sailing', speed: 9, heading: 93 },
  { id: 13, name: 'Mango', location: 'Mediterranean Sea', position: [31.98, 31.45], status: 'sailing', speed: 8, heading: 86 },
  { id: 14, name: 'Olive Branch', location: 'Mediterranean Sea', position: [32.02, 31.52], status: 'sailing', speed: 8, heading: 84 },
  { id: 15, name: 'Peace Runner', location: 'Mediterranean Sea', position: [32.18, 31.75], status: 'sailing', speed: 7, heading: 88 },
  { id: 16, name: 'Rachel Corrie', location: 'Mediterranean Sea', position: [31.92, 31.38], status: 'sailing', speed: 9, heading: 82 },
  { id: 17, name: 'Sentiero Selvaggio', location: 'Mediterranean Sea', position: [32.06, 31.58], status: 'sailing', speed: 8, heading: 86 },
  { id: 18, name: 'Shireen Abu Akleh', location: 'Mediterranean Sea', position: [32.14, 31.65], status: 'sailing', speed: 7, heading: 90 },
  { id: 19, name: 'Spirit of Humanity', location: 'Mediterranean Sea', position: [32.0, 31.48], status: 'sailing', speed: 7, heading: 85 },
  { id: 20, name: 'Unity', location: 'Mediterranean Sea', position: [32.10, 31.60], status: 'sailing', speed: 9, heading: 90 },
  { id: 21, name: 'Victoria', location: 'Mediterranean Sea', position: [31.88, 31.25], status: 'sailing', speed: 7, heading: 87 },
  { id: 22, name: 'Zephyr', location: 'Mediterranean Sea', position: [32.04, 31.54], status: 'sailing', speed: 8, heading: 84 },
];

// Gaza destination coordinates (approximate)
const GAZA_COORDS: [number, number] = [31.5, 34.45];

// Simulate realistic vessel movement based on heading and speed
function calculateNewPosition(
  currentPos: [number, number],
  speed: number,
  heading: number,
  deltaTimeSeconds: number
): [number, number] {
  // Convert speed from knots to degrees per second (approximate)
  // 1 knot ≈ 1.852 km/h ≈ 0.0000051 degrees/second at the equator
  const speedDegreesPerSecond = (speed * 1.852) / 111320; // More accurate conversion

  // Calculate distance moved in degrees
  const distance = speedDegreesPerSecond * deltaTimeSeconds;

  // Convert heading to radians (0° = North, 90° = East)
  const headingRad = (heading * Math.PI) / 180;

  // Calculate new position
  const latChange = distance * Math.cos(headingRad);
  const lonChange = distance * Math.sin(headingRad);

  return [
    currentPos[0] + latChange,
    currentPos[1] + lonChange,
  ];
}

// Add small random variations to simulate realistic vessel movement
function addRealisticVariation(vessel: Vessel): Vessel {
  // Small random heading adjustments (±5 degrees)
  const headingVariation = (Math.random() - 0.5) * 10;
  const newHeading = ((vessel.heading || 0) + headingVariation + 360) % 360;

  // Small random speed adjustments (±0.5 knots)
  const speedVariation = (Math.random() - 0.5) * 1;
  const newSpeed = Math.max(4, Math.min(12, (vessel.speed || 7) + speedVariation));

  return {
    ...vessel,
    heading: newHeading,
    speed: newSpeed,
  };
}

class VesselService {
  private vessels: Vessel[] = [];
  private vesselHistories: Map<number, VesselHistory> = new Map();
  private lastUpdateTime: number = Date.now();
  private readonly MAX_TRAJECTORY_POINTS = 50; // Keep last 50 positions for trail
  private readonly MISSION_START_DATE = new Date('2025-09-01T00:00:00Z');
  private readonly MISSION_END_DATE = new Date('2025-10-01T00:00:00Z');

  constructor() {
    // Initialize with data including Garmin tracker IDs
    this.vessels = initialVesselsData.map(v => ({
      ...v,
      lastUpdate: new Date(),
      trackerId: `GARMIN-${v.id.toString().padStart(4, '0')}`,
      trajectory: [v.position], // Initialize trajectory with starting position
    }));

    // Generate historical data for each vessel
    this.generateHistoricalData();
  }

  // Generate historical movement data for the mission period
  private generateHistoricalData(): void {
    const totalDays = 30; // 30 days mission
    const pointsPerDay = 24; // One point per hour

    this.vessels.forEach(vessel => {
      const history: VesselHistoryPoint[] = [];
      let currentPos = vessel.position;
      let currentHeading = vessel.heading || 90;
      let currentSpeed = vessel.speed || 7;

      for (let day = 0; day < totalDays; day++) {
        for (let hour = 0; hour < pointsPerDay; hour++) {
          const timestamp = new Date(this.MISSION_START_DATE);
          timestamp.setDate(timestamp.getDate() + day);
          timestamp.setHours(hour);

          // Calculate new position (3600 seconds = 1 hour)
          currentPos = calculateNewPosition(currentPos, currentSpeed, currentHeading, 3600);

          // Add small variations
          currentHeading = (currentHeading + (Math.random() - 0.5) * 10 + 360) % 360;
          currentSpeed = Math.max(4, Math.min(12, currentSpeed + (Math.random() - 0.5) * 1));

          history.push({
            position: currentPos,
            timestamp,
            speed: currentSpeed,
            heading: currentHeading,
            status: 'sailing',
          });
        }
      }

      this.vesselHistories.set(vessel.id, {
        id: vessel.id,
        name: vessel.name,
        location: vessel.location,
        trackerId: vessel.trackerId || '',
        history,
      });
    });
  }

  // Get all vessels
  getVessels(): Vessel[] {
    return this.vessels;
  }

  // Get vessel by ID
  getVesselById(id: number): Vessel | undefined {
    return this.vessels.find(v => v.id === id);
  }

  // Update vessel positions based on their speed and heading
  updatePositions(): void {
    const currentTime = Date.now();
    const deltaTimeSeconds = (currentTime - this.lastUpdateTime) / 1000;

    this.vessels = this.vessels.map(vessel => {
      // Add realistic variations
      const variedVessel = addRealisticVariation(vessel);

      // Calculate new position based on speed and heading
      const newPosition = calculateNewPosition(
        vessel.position,
        variedVessel.speed || 7,
        variedVessel.heading || 90,
        deltaTimeSeconds
      );

      // Update trajectory (keep last N positions for trail visualization)
      const newTrajectory = [...(vessel.trajectory || []), newPosition];
      if (newTrajectory.length > this.MAX_TRAJECTORY_POINTS) {
        newTrajectory.shift(); // Remove oldest position
      }

      return {
        ...variedVessel,
        position: newPosition,
        trajectory: newTrajectory,
        lastUpdate: new Date(),
      };
    });

    this.lastUpdateTime = currentTime;
  }

  // Simulate fetching data from Garmin GPS trackers
  // In a real implementation, this would connect to Garmin inReach API
  async fetchVesselData(): Promise<Vessel[]> {
    // Simulate network delay (GPS data transmission)
    await new Promise(resolve => setTimeout(resolve, 100));

    // Update positions
    this.updatePositions();

    return this.vessels;
  }

  // Get trajectory for a specific vessel
  getVesselTrajectory(id: number): [number, number][] {
    const vessel = this.getVesselById(id);
    return vessel?.trajectory || [];
  }

  // Get vessels at a specific date/time
  getVesselsAtTime(timestamp: Date): Vessel[] {
    const vessels: Vessel[] = [];

    this.vesselHistories.forEach((history) => {
      // Find the closest historical point to the requested timestamp
      const historyPoint = this.findClosestHistoryPoint(history.history, timestamp);

      if (historyPoint) {
        // Get trajectory up to this point
        const trajectory = history.history
          .filter(h => h.timestamp <= timestamp)
          .map(h => h.position);

        vessels.push({
          id: history.id,
          name: history.name,
          location: history.location,
          position: historyPoint.position,
          status: historyPoint.status,
          speed: historyPoint.speed,
          heading: historyPoint.heading,
          trackerId: history.trackerId,
          lastUpdate: historyPoint.timestamp,
          trajectory: trajectory.slice(-this.MAX_TRAJECTORY_POINTS),
        });
      }
    });

    return vessels;
  }

  // Find closest history point to a given timestamp
  private findClosestHistoryPoint(
    history: VesselHistoryPoint[],
    timestamp: Date
  ): VesselHistoryPoint | null {
    if (history.length === 0) return null;

    // If timestamp is before first point, return first point
    if (timestamp < history[0].timestamp) {
      return history[0];
    }

    // If timestamp is after last point, return last point
    if (timestamp > history[history.length - 1].timestamp) {
      return history[history.length - 1];
    }

    // Binary search for closest point
    let left = 0;
    let right = history.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (history[mid].timestamp <= timestamp) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    // Return the point just before or at the timestamp
    return history[Math.max(0, left - 1)];
  }

  // Get mission date range
  getMissionDateRange(): { start: Date; end: Date } {
    return {
      start: this.MISSION_START_DATE,
      end: this.MISSION_END_DATE,
    };
  }
}

// Export singleton instance
export const vesselService = new VesselService();
