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

// Initial vessel data from Global Sumud Flotilla
const initialVesselsData: Vessel[] = [
  { id: 1, name: 'Adagio', location: 'Beit Hanoun', position: [31.5123, 32.0], status: 'sailing', speed: 8, heading: 90 },
  { id: 2, name: 'Adara', location: 'Beit Lahia', position: [31.5420, 31.9], status: 'sailing', speed: 7, heading: 85 },
  { id: 3, name: 'Ahed Tamimi', location: '', position: [31.5531, 32.1], status: 'sailing', speed: 9, heading: 95 },
  { id: 4, name: 'All In', location: 'Khan Yunis', position: [31.3478, 31.8], status: 'sailing', speed: 6, heading: 80 },
  { id: 5, name: 'Allakatalla', location: 'Rafah', position: [31.2914, 31.7], status: 'sailing', speed: 7, heading: 75 },
  { id: 6, name: 'Alma', location: 'Deir al-Balah', position: [31.4168, 31.85], status: 'sailing', speed: 8, heading: 88 },
  { id: 7, name: 'Amsterdam', location: 'Al Tantura', position: [31.4991, 32.05], status: 'sailing', speed: 9, heading: 92 },
  { id: 8, name: 'Aurora', location: 'Heidi sails to Gaza', position: [31.3982, 31.82], status: 'sailing', speed: 7, heading: 83 },
  { id: 9, name: 'Australe', location: '', position: [31.5210, 31.95], status: 'sailing', speed: 8, heading: 87 },
  { id: 10, name: 'Captain Nikos', location: 'Akka', position: [32.9330, 32.5], status: 'sailing', speed: 6, heading: 180 },
  { id: 11, name: 'Catalina', location: 'Al Khalil', position: [31.5301, 32.15], status: 'sailing', speed: 9, heading: 94 },
  { id: 12, name: 'Dir yassine', location: 'Deir Yassin', position: [31.7915, 32.3], status: 'sailing', speed: 7, heading: 135 },
  { id: 13, name: 'Estrella Y Manuel', location: 'Al Lydd', position: [31.9497, 32.4], status: 'sailing', speed: 8, heading: 145 },
  { id: 14, name: 'Fair Lady', location: 'Al Qudse', position: [31.7767, 32.25], status: 'sailing', speed: 6, heading: 130 },
  { id: 15, name: 'Florida', location: 'Arwas al Sharif', position: [31.9270, 32.35], status: 'sailing', speed: 7, heading: 140 },
  { id: 16, name: 'Free Willy', location: 'Tilza - Gaza city', position: [31.5234, 31.98], status: 'sailing', speed: 8, heading: 89 },
  { id: 17, name: 'Grande Blu', location: 'Arhia', position: [31.9110, 32.38], status: 'sailing', speed: 9, heading: 142 },
  { id: 18, name: 'Hio', location: 'Beit Lahm', position: [31.7050, 32.22], status: 'sailing', speed: 7, heading: 125 },
  { id: 19, name: 'Huga', location: 'Haifa', position: [32.8191, 32.48], status: 'sailing', speed: 6, heading: 175 },
  { id: 20, name: 'Inana', location: 'Jenia', position: [32.4606, 32.7], status: 'sailing', speed: 8, heading: 160 },
  { id: 21, name: 'Jeannot III', location: 'Nablus', position: [32.2211, 32.65], status: 'sailing', speed: 7, heading: 155 },
  { id: 22, name: 'Karma', location: 'Yafa', position: [32.0853, 32.42], status: 'sailing', speed: 9, heading: 147 },
  { id: 23, name: 'Mango', location: 'Hind - Tal al Hawa - Gaza', position: [31.4992, 31.93], status: 'sailing', speed: 8, heading: 86 },
  { id: 24, name: 'Maria Cristina', location: 'Tulkarem', position: [32.3115, 32.55], status: 'sailing', speed: 7, heading: 152 },
  { id: 25, name: 'Marinette', location: 'Safad', position: [32.9658, 32.85], status: 'sailing', speed: 6, heading: 185 },
  { id: 26, name: 'Meteque', location: 'Qalqilya', position: [32.1896, 32.45], status: 'sailing', speed: 8, heading: 150 },
  { id: 27, name: 'Narigado', location: '', position: [31.5555, 32.08], status: 'sailing', speed: 9, heading: 93 },
  { id: 28, name: 'Nefertiti', location: 'Al Ramla', position: [31.9290, 32.39], status: 'sailing', speed: 7, heading: 143 },
  { id: 29, name: 'Olive Branch', location: '', position: [31.4682, 31.88], status: 'sailing', speed: 8, heading: 84 },
  { id: 30, name: 'Peace Runner', location: '', position: [31.5834, 31.97], status: 'sailing', speed: 7, heading: 88 },
  { id: 31, name: 'Pisces', location: 'Sabra & Shatila', position: [33.8547, 33.1], status: 'sailing', speed: 6, heading: 200 },
  { id: 32, name: 'Queen', location: '', position: [31.5012, 31.96], status: 'sailing', speed: 8, heading: 87 },
  { id: 33, name: 'Rachel Corrie', location: '', position: [31.4445, 31.87], status: 'sailing', speed: 9, heading: 82 },
  { id: 34, name: 'Raggamuffin', location: 'Rahat', position: [31.3931, 32.18], status: 'sailing', speed: 7, heading: 100 },
  { id: 35, name: 'Saphira', location: '', position: [31.5223, 31.99], status: 'sailing', speed: 8, heading: 88 },
  { id: 36, name: 'Sea Gull', location: '', position: [31.4956, 31.92], status: 'sailing', speed: 7, heading: 85 },
  { id: 37, name: 'Sebbe Als', location: 'Taanekh', position: [32.5589, 32.72], status: 'sailing', speed: 6, heading: 165 },
  { id: 38, name: 'Sentiero Selvaggio', location: '', position: [31.5134, 31.94], status: 'sailing', speed: 8, heading: 86 },
  { id: 39, name: 'Shaima', location: 'Al Jabalia', position: [31.5320, 32.02], status: 'sailing', speed: 9, heading: 91 },
  { id: 40, name: 'Spirit of Humanity', location: '', position: [31.4734, 31.91], status: 'sailing', speed: 7, heading: 85 },
  { id: 41, name: 'Taurus', location: '', position: [31.5456, 32.06], status: 'sailing', speed: 8, heading: 92 },
  { id: 42, name: 'Unity', location: '', position: [31.5089, 32.03], status: 'sailing', speed: 9, heading: 90 },
  { id: 43, name: 'Victoria', location: 'Bir al-Saba', position: [31.2519, 32.2], status: 'sailing', speed: 7, heading: 105 },
  { id: 44, name: 'Zephyr', location: '', position: [31.4867, 31.89], status: 'sailing', speed: 8, heading: 84 },
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
  private lastUpdateTime: number = Date.now();
  private readonly MAX_TRAJECTORY_POINTS = 50; // Keep last 50 positions for trail

  constructor() {
    // Initialize with data including Garmin tracker IDs
    this.vessels = initialVesselsData.map(v => ({
      ...v,
      lastUpdate: new Date(),
      trackerId: `GARMIN-${v.id.toString().padStart(4, '0')}`,
      trajectory: [v.position], // Initialize trajectory with starting position
    }));
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
}

// Export singleton instance
export const vesselService = new VesselService();
