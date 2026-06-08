import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges, Html } from '@react-three/drei';
import * as THREE from 'three';

interface BuildingProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  label?: string;
  pulseSpeed?: number;
}

export default function Building({
  position,
  size,
  color = '#00f3ff',
  label,
  pulseSpeed = 1.0,
}: BuildingProps) {
  const [w, h, d] = size;
  const halfW = w / 2;
  const halfH = h / 2;
  const halfD = d / 2;

  // Classify architectural styles deterministically to build a varied urban jungle
  const buildingId = Math.abs(Math.round(position[0] * 29 + position[2] * 13)) % 3;

  const beaconRef = useRef<THREE.MeshBasicMaterial>(null);
  const coreRef = useRef<THREE.Group>(null);

  // Animate the pulsing warning beacon on top and gentle technical vibrations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (beaconRef.current) {
      // Rapid blinking frequency typical of aviation hazard lights
      beaconRef.current.opacity = Math.sin(time * 5.0) > 0 ? 1 : 0.15;
    }
  });

  // Solid corporate metallic slate material
  const coreMaterial = (
    <meshPhysicalMaterial
      color="#111621"
      roughness={0.25}
      metalness={0.88}
      clearcoat={0.3}
      clearcoatRoughness={0.12}
    />
  );

  // Outer glowing details material
  const neonEmissiveMaterial = (
    <meshBasicMaterial
      color={color}
      toneMapped={false}
      transparent
      opacity={0.85}
    />
  );

  // Glass panels material that catch real-time environment lighting reflections
  const glassFacadeMaterial = (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={0.15}
      roughness={0.05}
      metalness={0.95}
      transmission={0.4}
      thickness={0.8}
    />
  );

  return (
    <group position={position} ref={coreRef}>
      {/* 
        ===================================================================
        ARCHITECTURAL TYPE 0: TIERED SCI-FI SKYCRAPER WITH TALL ANTENNA
        ===================================================================
      */}
      {buildingId === 0 && (
        <group>
          {/* Lower Tier Block (Base) */}
          <mesh position={[0, -halfH + (h * 0.65) / 2, 0]}>
            <boxGeometry args={[w, h * 0.65, d]} />
            {coreMaterial}
            <Edges color={color} threshold={15} scale={1.001} />
          </mesh>

          {/* Upper Setback Tier Block */}
          <mesh position={[0, halfH - (h * 0.35) / 2, 0]}>
            <boxGeometry args={[w * 0.72, h * 0.35, d * 0.72]} />
            {coreMaterial}
            <Edges color={color} threshold={15} scale={1.001} />
          </mesh>

          {/* Deep Recessed Glowing Window Horizontal Slots */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[w * 1.015, 0.08, d * 1.015]} />
            {neonEmissiveMaterial}
          </mesh>
          <mesh position={[0, halfH * 0.4, 0]}>
            <boxGeometry args={[w * 0.75, 0.05, d * 0.75]} />
            {neonEmissiveMaterial}
          </mesh>
          <mesh position={[0, -halfH * 0.4, 0]}>
            <boxGeometry args={[w * 1.015, 0.08, d * 1.015]} />
            {neonEmissiveMaterial}
          </mesh>

          {/* Heavy Base Support Columns (Corner pillasters) */}
          <mesh position={[-halfW, -halfH + (h * 0.65) / 2, -halfD]}>
            <boxGeometry args={[0.12, h * 0.65, 0.12]} />
            <meshPhysicalMaterial color="#303846" roughness={0.5} />
          </mesh>
          <mesh position={[halfW, -halfH + (h * 0.65) / 2, -halfD]}>
            <boxGeometry args={[0.12, h * 0.65, 0.12]} />
            <meshPhysicalMaterial color="#303846" roughness={0.5} />
          </mesh>
          <mesh position={[-halfW, -halfH + (h * 0.65) / 2, halfD]}>
            <boxGeometry args={[0.12, h * 0.65, 0.12]} />
            <meshPhysicalMaterial color="#303846" roughness={0.5} />
          </mesh>
          <mesh position={[halfW, -halfH + (h * 0.65) / 2, halfD]}>
            <boxGeometry args={[0.12, h * 0.65, 0.12]} />
            <meshPhysicalMaterial color="#303846" roughness={0.5} />
          </mesh>

          {/* Roof Mech-Grid Deck & Antenna Assembly */}
          <group position={[0, halfH, 0]}>
            {/* Machinery Pod Box */}
            <mesh position={[0, 0.12, 0]}>
              <boxGeometry args={[w * 0.4, 0.24, d * 0.4]} />
              <meshPhysicalMaterial color="#0e111a" roughness={0.6} />
            </mesh>
            
            {/* Extended Steel Antenna Spire */}
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.015, 0.03, 1.2, 8]} />
              <meshPhysicalMaterial color="#a0acbc" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Red Aviation Warning Hazard Flashing Light */}
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.045, 8, 8]} />
              <meshBasicMaterial ref={beaconRef} color="#ff3b30" toneMapped={false} transparent />
            </mesh>
          </group>
        </group>
      )}

      {/* 
        ===================================================================
        ARCHITECTURAL TYPE 1: COMPRESSED OBLISK FLAT SKYCRAPER WITH FINS
        ===================================================================
      */}
      {buildingId === 1 && (
        <group>
          {/* Main monolith slab tower core */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[w * 0.85, h, d * 0.85]} />
            {coreMaterial}
            <Edges color={color} threshold={15} scale={1.001} />
          </mesh>

          {/* Secondary Glass Facade cladding reflecting the digital corridor */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[w * 0.87, h * 0.9, d * 0.87]} />
            {glassFacadeMaterial}
          </mesh>

          {/* Bold Aerodynamic Structural Fins (Stretched on Left and Right) */}
          <mesh position={[-halfW, h * 0.02, 0]}>
            <boxGeometry args={[0.14, h * 1.04, d * 0.8]} />
            <meshPhysicalMaterial color="#2c3547" roughness={0.15} metalness={0.9} />
            <Edges color={color} threshold={15} scale={1.002} />
          </mesh>
          <mesh position={[halfW, h * 0.02, 0]}>
            <boxGeometry args={[0.14, h * 1.04, d * 0.8]} />
            <meshPhysicalMaterial color="#2c3547" roughness={0.15} metalness={0.9} />
            <Edges color={color} threshold={15} scale={1.002} />
          </mesh>

          {/* Vertical Neon Rib LED Strips Running Up the Center Core sides */}
          <mesh position={[0, 0, halfD * 0.88]}>
            <boxGeometry args={[w * 0.2, h * 0.85, 0.025]} />
            {neonEmissiveMaterial}
          </mesh>
          <mesh position={[0, 0, -halfD * 0.88]}>
            <boxGeometry args={[w * 0.2, h * 0.85, 0.025]} />
            {neonEmissiveMaterial}
          </mesh>

          {/* Roof Launch Pad Ring Light (Circular Helipad look) */}
          <group position={[0, halfH + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh>
              <ringGeometry args={[w * 0.22, w * 0.26, 16]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <mesh position={[0, 0, -0.005]}>
              <circleGeometry args={[w * 0.21, 16]} />
              <meshPhysicalMaterial color="#1a202c" roughness={0.7} />
            </mesh>
          </group>
        </group>
      )}

      {/* 
        ===================================================================
        ARCHITECTURAL TYPE 2: HIGH-TECH LATTICE CORRIDOR ARCH REACTOR BUILD
        ===================================================================
      */}
      {buildingId === 2 && (
        <group>
          {/* Internal Solid Carbon Core Column */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[w * 0.8, h, d * 0.8]} />
            <meshPhysicalMaterial color="#080c10" roughness={0.4} metalness={0.95} />
          </mesh>

          {/* Segmented Architectural Ring Bands (Digital Cladding Braces) */}
          {[-halfH * 0.6, -halfH * 0.2, halfH * 0.2, halfH * 0.6].map((offsetY, idx) => (
            <mesh key={`band-${idx}`} position={[0, offsetY, 0]}>
              <boxGeometry args={[w * 1.025, 0.16, d * 1.025]} />
              <meshPhysicalMaterial color="#3a455a" metalness={0.9} roughness={0.1} />
              <Edges color={color} threshold={15} scale={1.002} />
            </mesh>
          ))}

          {/* Triple Vertical Glowing Channels on faces */}
          <mesh position={[-halfW * 0.83, 0, halfD * 0.83]}>
            <boxGeometry args={[0.06, h * 0.95, 0.06]} />
            {neonEmissiveMaterial}
          </mesh>
          <mesh position={[halfW * 0.83, 0, halfD * 0.83]}>
            <boxGeometry args={[0.06, h * 0.95, 0.06]} />
            {neonEmissiveMaterial}
          </mesh>
          <mesh position={[-halfW * 0.83, 0, -halfD * 0.83]}>
            <boxGeometry args={[0.06, h * 0.95, 0.06]} />
            {neonEmissiveMaterial}
          </mesh>
          <mesh position={[halfW * 0.83, 0, -halfD * 0.83]}>
            <boxGeometry args={[0.06, h * 0.95, 0.06]} />
            {neonEmissiveMaterial}
          </mesh>

          {/* Roof Generator Cooling Towers on Top */}
          <group position={[0, halfH, 0]}>
            {/* Ventilation Platform Cylinders */}
            <mesh position={[-w * 0.18, 0.12, -d * 0.18]}>
              <cylinderGeometry args={[w * 0.14, w * 0.16, 0.2, 12]} />
              <meshPhysicalMaterial color="#1a202c" roughness={0.5} />
            </mesh>
            <mesh position={[w * 0.18, 0.12, d * 0.18]}>
              <cylinderGeometry args={[w * 0.14, w * 0.16, 0.2, 12]} />
              <meshPhysicalMaterial color="#1a202c" roughness={0.5} />
            </mesh>

            {/* Glowing vent reactors inside the ventilation pods */}
            <mesh position={[-w * 0.18, 0.21, -d * 0.18]}>
              <cylinderGeometry args={[w * 0.09, w * 0.09, 0.02, 12]} />
              <meshBasicMaterial color="#ff5e00" toneMapped={false} /> {/* Orange structural heat vent glow */}
            </mesh>
            <mesh position={[w * 0.18, 0.21, d * 0.18]}>
              <cylinderGeometry args={[w * 0.09, w * 0.09, 0.02, 12]} />
              <meshBasicMaterial color="#ff5e00" toneMapped={false} />
            </mesh>
          </group>
        </group>
      )}

      {/* 
        ===================================================================
        HERO HOLOGRAPHIC BLUEPRINT LABELS ATTACHED ON TOP
        ===================================================================
      */}
      {label && (
        <Html
          position={[0, halfH + 1.2, 0]}
          center
          distanceFactor={18}
          className="pointer-events-none select-none select-all"
        >
          <div className="flex flex-col items-center gap-1.5 opacity-95 scale-95">
            {/* Hanging vertical lines aligning label dynamically */}
            <div className="w-[1.2px] h-9 bg-gradient-to-b from-transparent via-[#00f3ff]/40 to-neon-blue" />
            
            {/* Holographic glowing label container with futuristic blueprint metadata border design */}
            <div className="bg-black/85 backdrop-blur-md px-3.5 py-1.5 border border-neon-blue/60 rounded-md shadow-[0_0_20px_rgba(0,243,255,0.4)] flex items-center gap-2">
              <span className="w-1.8 h-1.8 bg-neon-blue rounded-full animate-ping absolute" />
              <span className="w-1.8 h-1.8 bg-neon-blue rounded-full relative shadow-[0_0_8px_#00f3ff]" />
              <p className="font-mono text-[9px] tracking-widest text-[#00f3ff] whitespace-nowrap font-bold uppercase">
                {label}
              </p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
