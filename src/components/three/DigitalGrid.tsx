import { Grid } from '@react-three/drei';

interface DigitalGridProps {
  gridColor: string;
  gridOpacity?: number;
  sectionSize?: number;
}

export default function DigitalGrid({
  gridColor,
  gridOpacity = 1.0,
  sectionSize = 5,
}: DigitalGridProps) {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Prime Emissive Floor Grid */}
      <Grid
        args={[150, 150]}
        cellSize={1}
        cellThickness={0.8}
        cellColor="#001a2c"
        sectionSize={sectionSize}
        sectionThickness={1.4}
        sectionColor={gridColor}
        fadeDistance={45}
        fadeStrength={1.2}
        infiniteGrid
      />
    </group>
  );
}
