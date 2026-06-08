import { useMemo } from 'react';
import Building from './Building';

export default function City() {
  // Generate a rich, layered digital skyline cluster with 32 secondary buildings
  const secondaryBuildings = useMemo(() => {
    const list: Array<{
      position: [number, number, number];
      size: [number, number, number];
      color: string;
      pulseSpeed: number;
    }> = [];

    // Left cluster nodes (West Side: from close corridors to deep background mountains)
    const rawLeft = [
      // Close flanks
      { x: -5.0, z: 25.0, w: 2.0, h: 5.5, d: 2.0, color: '#00f3ff' },
      { x: -5.5, z: 18.0, w: 2.4, h: 6.8, d: 2.4, color: '#00dfff' },
      { x: -6.0, z: 6.0, w: 1.8, h: 4.5, d: 1.8, color: '#00f3ff' },
      { x: -5.2, z: -2.0, w: 2.6, h: 8.2, d: 2.6, color: '#00bfff' },
      { x: -6.0, z: -12.0, w: 2.2, h: 7.0, d: 2.2, color: '#00f3ff' },
      { x: -5.5, z: -22.0, w: 2.5, h: 9.6, d: 2.5, color: '#00dfff' },
      
      // Mid distance columns
      { x: -10.0, z: 28.0, w: 3.0, h: 10.8, d: 3.0, color: '#00ccff' },
      { x: -9.0, z: 14.0, w: 2.2, h: 8.2, d: 2.2, color: '#00f3ff' },
      { x: -11.0, z: 2.0, w: 2.8, h: 9.8, d: 2.8, color: '#00ccff' },
      { x: -10.0, z: -7.0, w: 2.5, h: 7.8, d: 2.5, color: '#00e5ff' },
      { x: -11.0, z: -18.0, w: 2.1, h: 6.0, d: 2.1, color: '#00bfff' },
      { x: -9.5, z: -28.0, w: 3.2, h: 12.0, d: 3.2, color: '#00f3ff' },
      
      // Deep skyline megaliths
      { x: -16.0, z: 22.0, w: 3.5, h: 14.5, d: 3.5, color: '#00a8ff' },
      { x: -15.0, z: 10.0, w: 3.2, h: 13.0, d: 3.2, color: '#00ccff' },
      { x: -17.0, z: -2.0, w: 4.0, h: 16.5, d: 4.0, color: '#0077ff' },
      { x: -15.5, z: -15.0, w: 3.4, h: 13.5, d: 3.4, color: '#00a8ff' },
      { x: -16.5, z: -26.0, w: 3.6, h: 15.0, d: 3.6, color: '#00dfff' },
    ];

    // Right cluster nodes (East Side: balancing skyline, forming a beautiful corridor canyon)
    const rawRight = [
      // Close flanks
      { x: 5.2, z: 23.0, w: 2.1, h: 4.8, d: 2.1, color: '#00dfff' },
      { x: 5.8, z: 14.5, w: 1.9, h: 5.8, d: 1.9, color: '#00f3ff' },
      { x: 5.0, z: -3.0, w: 2.8, h: 9.2, d: 2.8, color: '#00ccff' },
      { x: 6.0, z: -14.0, w: 2.4, h: 7.6, d: 2.4, color: '#00e5ff' },
      { x: 5.2, z: -24.0, w: 2.0, h: 6.2, d: 2.0, color: '#00bfff' },
      
      // Mid distance columns
      { x: 10.0, z: 26.0, w: 2.6, h: 9.0, d: 2.6, color: '#00f3ff' },
      { x: 9.5, z: 17.0, w: 2.8, h: 11.0, d: 2.8, color: '#00a8ff' },
      { x: 11.0, z: 7.0, w: 2.3, h: 8.5, d: 2.3, color: '#00ccff' },
      { x: 10.5, z: -5.0, w: 3.1, h: 11.5, d: 3.1, color: '#00f3ff' },
      { x: 9.8, z: -16.0, w: 2.5, h: 7.2, d: 2.5, color: '#00dfff' },
      { x: 11.0, z: -26.0, w: 2.2, h: 8.8, d: 2.2, color: '#00bfff' },
      
      // Deep skyline megaliths
      { x: 16.0, z: 20.0, w: 3.8, h: 15.5, d: 3.8, color: '#0077ff' },
      { x: 17.0, z: 8.0, w: 3.5, h: 13.8, d: 3.5, color: '#00ccff' },
      { x: 15.0, z: -4.0, w: 3.2, h: 12.2, d: 3.2, color: '#00a8ff' },
      { x: 16.5, z: -15.0, w: 4.2, h: 17.5, d: 4.2, color: '#0052cc' },
      { x: 15.5, z: -28.0, w: 3.5, h: 14.2, d: 3.5, color: '#00dfff' },
    ];

    const combined = [...rawLeft, ...rawRight];

    for (let i = 0; i < combined.length; i++) {
      const item = combined[i];
      const posY = item.h / 2; // snap base cleanly to the ground index
      list.push({
        position: [item.x, posY, item.z],
        size: [item.w, item.h, item.d],
        color: item.color,
        pulseSpeed: 0.6 + (i * 0.08) % 1.2,
      });
    }

    return list;
  }, []);

  // Strict hardcoded 4 elegant Hero Towers on the immediate boundary of the corridor (X = -3.5 or X = +3.5)
  const heroTowers = [
    {
      position: [-3.5, 4.5, 12] as [number, number, number],
      size: [2.0, 9, 2.0] as [number, number, number],
      color: '#00f3ff',
      label: 'TECH TOWER // FRONTEND',
      pulseSpeed: 1.1,
    },
    {
      position: [3.5, 5.5, 2] as [number, number, number],
      size: [2.2, 11, 2.2] as [number, number, number],
      color: '#00ccff',
      label: 'INNOVATION LAB // AI-ML',
      pulseSpeed: 0.8,
    },
    {
      position: [-3.5, 5.0, -8] as [number, number, number],
      size: [2.0, 10, 2.0] as [number, number, number],
      color: '#00e5ff',
      label: 'ACADEMY DISTRICT // BCA',
      pulseSpeed: 1.4,
    },
    {
      position: [3.5, 6.0, -18] as [number, number, number],
      size: [2.4, 12, 2.4] as [number, number, number],
      color: '#00a8ff',
      label: 'COMMUNICATION CENTER // DUBBING',
      pulseSpeed: 0.95,
    },
  ];

  return (
    <group>
      {/* 32 Staggered High-Density Ambience Towers */}
      {secondaryBuildings.map((building, idx) => (
        <Building
          key={`secondary-${idx}`}
          position={building.position}
          size={building.size}
          color={building.color}
          pulseSpeed={building.pulseSpeed}
        />
      ))}

      {/* 4 Custom Highlight Hero Structures inside the corridor */}
      {heroTowers.map((tower, idx) => (
        <Building
          key={`hero-${idx}`}
          position={tower.position}
          size={tower.size}
          color={tower.color}
          label={tower.label}
          pulseSpeed={tower.pulseSpeed}
        />
      ))}
    </group>
  );
}
