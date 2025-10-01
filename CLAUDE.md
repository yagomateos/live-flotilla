# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **real-time vessel tracking application** for the Global Sumud Flotilla - a coordinated fleet of vessels sailing from Mediterranean ports to Gaza. The application provides live GPS tracking, historical playback, and maritime monitoring capabilities.

**Tech Stack:** Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Leaflet

## Development Commands

```bash
# Start development server (auto-reloads on changes)
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm preview
```

## Architecture

### Core Data Flow

The application follows a **time-based state management** pattern where vessel positions can be viewed either in real-time or historically:

1. **VesselService** (`src/services/vesselService.ts`) - Singleton service that:
   - Manages 22 vessel instances with GPS coordinates
   - Generates historical movement data (720 points/vessel over 30 days)
   - Simulates Garmin tracker data with realistic nautical calculations
   - Provides time-travel capabilities via `getVesselsAtTime(timestamp)`

2. **Index Page** (`src/pages/Index.tsx`) - Main orchestrator:
   - Switches between "live mode" (real-time simulation) and "historical mode"
   - Updates vessel positions every 3 seconds in live mode
   - Fetches historical positions when timeline slider moves
   - Layout: VesselList (left) | MapView (center) | InfoPanel (right) | Timeline (bottom)

3. **MapView** (`src/components/MapView.tsx`) - Leaflet integration:
   - Maintains separate Maps for markers and trajectory polylines
   - Updates markers without recreating the map (performance optimization)
   - Uses CartoDB Voyager tiles for clean, modern appearance
   - Renders vessel trajectories as blue polylines

4. **Timeline** (`src/components/Timeline.tsx`) - Temporal navigation:
   - Play/pause historical playback
   - Manual scrubbing via slider
   - "LIVE" mode button for real-time tracking
   - Date range: Sep 1 - Oct 1, 2025

### Real Vessel Data

Vessel names and departure information are based on actual Global Sumud Flotilla 2025 data:
- **Source file:** `src/data/realFlotillaData.ts`
- **Vessels:** 22 confirmed vessels from Barcelona, Genoa, Menorca, and Bizerte
- **Notable vessels:** Karma, Alma, Familia Madeira, Shireen Abu Akleh, Rachel Corrie
- **Initial positions:** ~150 nautical miles west of Gaza (32.0°N, 31.5°E)

### GPS Simulation

The service simulates **realistic maritime movement**:
- Nautical calculations: speed in knots, heading in degrees
- Distance formulas: Haversine distance in nautical miles
- Position updates: `calculateNewPosition()` uses nautical mile conversions (1 knot ≈ 1.852 km/h)
- Realistic variations: ±10° heading, ±1 knot speed variations

## Key Implementation Details

### Timeline-Driven Architecture

The app uses **temporal state management** where the Timeline component is the source of truth:
- Timeline emits `onTimeChange(timestamp | null)` events
- `null` = live mode, `Date` = historical mode
- Historical data is pre-generated on service initialization (30 days × 24 hours/day × 22 vessels = 15,840 data points)

### Map Performance

MapView uses **persistent references** to avoid re-rendering:
- `map.current` - Leaflet map instance (created once)
- `markers.current` - Map<vesselId, L.Marker> (update positions in-place)
- `trajectories.current` - Map<vesselId, L.Polyline> (update coordinates in-place)

This prevents map flicker and maintains smooth 3-second updates.

### Component Communication

```
Index (state orchestrator)
  ├─ VesselList (displays vessel info)
  ├─ MapView (renders Leaflet map + trajectories)
  ├─ InfoPanel (static info panel)
  └─ Timeline (controls time state)
       └─ onTimeChange callback → Index updates vessels
```

## Important Files

- `src/services/vesselService.ts` - Core vessel tracking logic and GPS simulation
- `src/data/realFlotillaData.ts` - Real vessel names and departure ports
- `src/components/MapView.tsx` - Leaflet integration with trajectory rendering
- `src/components/Timeline.tsx` - Temporal navigation controls
- `src/pages/Index.tsx` - Main application orchestrator

## Project Context

This tracker was developed based on the real Global Sumud Flotilla mission:
- **Mission:** Coordinated fleet sailing to break Gaza blockade
- **Technology reference:** Forensic Architecture's Handala Tracker
- **GPS tracking:** Simulates Garmin inReach tracker data
- **Mission dates:** Aug 30 - Oct 1, 2025
- **Official site:** globalsumudflotilla.org

The application simulates vessel tracking since no public API is available from the actual tracker.
