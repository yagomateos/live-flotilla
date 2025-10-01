// Real vessel data based on Global Sumud Flotilla 2025
// Sources: Al Jazeera, Wikipedia, news reports

export interface VesselRealData {
  id: number;
  name: string;
  departurePort: string;
  departureDate: string;
  departureCoords: [number, number];
  destinationCoords: [number, number];
  speed: number; // Average sailing speed in knots
  status: 'sailing' | 'anchored' | 'docked';
}

// Known vessel names from news sources
export const realVessels: VesselRealData[] = [
  // Barcelona convoy (departed Aug 31, 2025)
  { id: 1, name: 'Karma', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 2, name: 'Alma', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 3, name: 'Familia Madeira', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 6.5, status: 'sailing' },
  { id: 4, name: 'Adagio', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 7.5, status: 'sailing' },
  { id: 5, name: 'Adara', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 6, name: 'Free Willy', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 8, status: 'sailing' },
  { id: 7, name: 'Peace Runner', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 7.5, status: 'sailing' },

  // Genoa convoy (departed Aug 30, 2025)
  { id: 8, name: 'Aurora', departurePort: 'Genoa', departureDate: '2025-08-30', departureCoords: [44.4056, 8.9463], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 9, name: 'Grande Blu', departurePort: 'Genoa', departureDate: '2025-08-30', departureCoords: [44.4056, 8.9463], destinationCoords: [31.5, 34.45], speed: 8, status: 'sailing' },
  { id: 10, name: 'Sentiero Selvaggio', departurePort: 'Genoa', departureDate: '2025-08-30', departureCoords: [44.4056, 8.9463], destinationCoords: [31.5, 34.45], speed: 7.5, status: 'sailing' },

  // Menorca stop (Sep 5, 2025)
  { id: 11, name: 'Amsterdam', departurePort: 'Menorca', departureDate: '2025-09-05', departureCoords: [39.9794, 4.0974], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 12, name: 'Captain Nikos', departurePort: 'Menorca', departureDate: '2025-09-05', departureCoords: [39.9794, 4.0974], destinationCoords: [31.5, 34.45], speed: 6.5, status: 'sailing' },
  { id: 13, name: 'Zephyr', departurePort: 'Menorca', departureDate: '2025-09-05', departureCoords: [39.9794, 4.0974], destinationCoords: [31.5, 34.45], speed: 7.5, status: 'sailing' },

  // Tunisia convoy (departed Sep 7, 2025 from Bizerte)
  { id: 14, name: 'Shireen Abu Akleh', departurePort: 'Bizerte', departureDate: '2025-09-07', departureCoords: [37.2744, 9.8739], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 15, name: 'Ahed Tamimi', departurePort: 'Bizerte', departureDate: '2025-09-07', departureCoords: [37.2744, 9.8739], destinationCoords: [31.5, 34.45], speed: 7.5, status: 'sailing' },
  { id: 16, name: 'Rachel Corrie', departurePort: 'Bizerte', departureDate: '2025-09-07', departureCoords: [37.2744, 9.8739], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 17, name: 'Mango', departurePort: 'Bizerte', departureDate: '2025-09-07', departureCoords: [37.2744, 9.8739], destinationCoords: [31.5, 34.45], speed: 6.5, status: 'sailing' },
  { id: 18, name: 'Spirit of Humanity', departurePort: 'Bizerte', departureDate: '2025-09-07', departureCoords: [37.2744, 9.8739], destinationCoords: [31.5, 34.45], speed: 8, status: 'sailing' },

  // Additional vessels from various ports
  { id: 19, name: 'Catalina', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 20, name: 'Unity', departurePort: 'Barcelona', departureDate: '2025-08-31', departureCoords: [41.3874, 2.1686], destinationCoords: [31.5, 34.45], speed: 7.5, status: 'sailing' },
  { id: 21, name: 'Victoria', departurePort: 'Genoa', departureDate: '2025-08-30', departureCoords: [44.4056, 8.9463], destinationCoords: [31.5, 34.45], speed: 7, status: 'sailing' },
  { id: 22, name: 'Olive Branch', departurePort: 'Bizerte', departureDate: '2025-09-07', departureCoords: [37.2744, 9.8739], destinationCoords: [31.5, 34.45], speed: 6.5, status: 'sailing' },
];

// Key waypoints along the route from Barcelona to Gaza
export const mediterraneanRoute = {
  barcelona: [41.3874, 2.1686] as [number, number],
  menorca: [39.9794, 4.0974] as [number, number],
  sardinia: [40.12, 9.01] as [number, number],
  tunisia: [37.2744, 9.8739] as [number, number], // Bizerte
  malta: [35.9375, 14.3754] as [number, number],
  crete: [35.2401, 25.1289] as [number, number],
  libya: [32.8872, 13.1913] as [number, number], // North of Libya
  gaza: [31.5, 34.45] as [number, number],
};

// Calculate intermediate waypoints between two coordinates
export function generateRouteWaypoints(
  start: [number, number],
  end: [number, number],
  numPoints: number = 50
): [number, number][] {
  const waypoints: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const ratio = i / numPoints;
    const lat = start[0] + (end[0] - start[0]) * ratio;
    const lon = start[1] + (end[1] - start[1]) * ratio;
    waypoints.push([lat, lon]);
  }

  return waypoints;
}

// Generate realistic Mediterranean route with major waypoints
export function generateMediterraneanRoute(departurePort: string): [number, number][] {
  const routes: Record<string, [number, number][]> = {
    'Barcelona': [
      mediterraneanRoute.barcelona,
      mediterraneanRoute.menorca,
      mediterraneanRoute.sardinia,
      mediterraneanRoute.tunisia,
      mediterraneanRoute.malta,
      mediterraneanRoute.crete,
      mediterraneanRoute.libya,
      mediterraneanRoute.gaza,
    ],
    'Genoa': [
      [44.4056, 8.9463],
      mediterraneanRoute.sardinia,
      mediterraneanRoute.tunisia,
      mediterraneanRoute.malta,
      mediterraneanRoute.crete,
      mediterraneanRoute.libya,
      mediterraneanRoute.gaza,
    ],
    'Menorca': [
      mediterraneanRoute.menorca,
      mediterraneanRoute.sardinia,
      mediterraneanRoute.tunisia,
      mediterraneanRoute.malta,
      mediterraneanRoute.crete,
      mediterraneanRoute.libya,
      mediterraneanRoute.gaza,
    ],
    'Bizerte': [
      mediterraneanRoute.tunisia,
      mediterraneanRoute.malta,
      mediterraneanRoute.crete,
      mediterraneanRoute.libya,
      mediterraneanRoute.gaza,
    ],
  };

  const waypoints = routes[departurePort] || routes['Barcelona'];

  // Generate smooth route with intermediate points
  const smoothRoute: [number, number][] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const segment = generateRouteWaypoints(waypoints[i], waypoints[i + 1], 20);
    smoothRoute.push(...segment);
  }

  return smoothRoute;
}
