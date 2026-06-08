import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

interface DroneProps {
  position?: [number, number, number];
  color?: string;
}

export default function Drone({ position = [0, 0, 0], color = '#00f3ff' }: DroneProps) {
  const coreRef = useRef<THREE.Group>(null);
  
  // Create refs for the 4 propellers to animate their high-speed rotation independently
  const prop1Ref = useRef<THREE.Group>(null);
  const prop2Ref = useRef<THREE.Group>(null);
  const prop3Ref = useRef<THREE.Group>(null);
  const prop4Ref = useRef<THREE.Group>(null);

  // Smooth micro-hover bobbing and high-speed motor spindle rotations
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rapid prop spins (running clockwise and counter-clockwise to match real flight physics)
    const spinSpeed = 35;
    if (prop1Ref.current) prop1Ref.current.rotation.y = time * spinSpeed;
    if (prop2Ref.current) prop2Ref.current.rotation.y = -time * spinSpeed;
    if (prop3Ref.current) prop3Ref.current.rotation.y = -time * spinSpeed;
    if (prop4Ref.current) prop4Ref.current.rotation.y = time * spinSpeed;

    // Gentle realistic organic engine vibration & wind turbulence
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(time * 3.0) * 0.05;
      coreRef.current.rotation.z = Math.cos(time * 1.8) * 0.02;
      coreRef.current.rotation.x = Math.sin(time * 2.2) * 0.015;
    }
  });

  return (
    <group position={position}>
      {/* Floating physical chassis group */}
      <group ref={coreRef}>
        
        {/* =========================================================
            1. CENTRAL FUSELAGE / CHASSIS (GRAY LOWER + WHITE UPPER)
            ========================================================= */}
        
        {/* Lower Main Tub Chassis - Matte/Metallic Industrial Gray */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.32, 0.14, 0.72]} />
          <meshPhysicalMaterial
            color="#7a8285"
            roughness={0.45}
            metalness={0.3}
            clearcoat={0.1}
          />
        </mesh>

        {/* Upper Fuselage Shield Casing - Pristine Polycarbonate White */}
        <mesh position={[0, 0.07, 0.02]}>
          <boxGeometry args={[0.3, 0.1, 0.68]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.25}
            metalness={0.05}
            clearcoat={0.6}
            clearcoatRoughness={0.1}
          />
          {/* Subtle design edge wires to retain sci-fi thematic look */}
          <Edges color="#c0c4c6" threshold={1} />
        </mesh>

        {/* Small brand decal detail - Blue/cyan circular badge on the top cover matching reference */}
        <mesh position={[0, 0.125, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.005, 16]} />
          <meshBasicMaterial color="#0052cc" />
        </mesh>
        <mesh position={[0, 0.127, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.006, 16]} />
          <meshBasicMaterial color="#00f3ff" />
        </mesh>

        {/* Top Antenna Tail/Bump Cover Accent */}
        <mesh position={[0, 0.11, -0.22]}>
          <boxGeometry args={[0.16, 0.03, 0.14]} />
          <meshPhysicalMaterial color="#c0c4c6" roughness={0.5} />
        </mesh>


        {/* =========================================================
            2. ADVANCED FRONT CAMERA GIMBAL & LENS (BOTTOM NOSE)
            ========================================================= */}
        <group position={[0, -0.14, 0.28]}>
          {/* Gimbal Arm Joint Structure */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.06, 8]} />
            <meshPhysicalMaterial color="#2d3135" roughness={0.6} />
          </mesh>
          
          {/* Gimbal Camera Sphere Housing (Matte Dark Charcoal) */}
          <mesh position={[0, -0.04, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshPhysicalMaterial color="#1a1c1e" roughness={0.8} metalness={0.2} />
          </mesh>

          {/* Forward Camera Lens (Glossy Finish) */}
          <mesh position={[0, -0.04, 0.075]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.04, 16]} />
            <meshPhysicalMaterial color="#0b0d0f" roughness={0.05} metalness={0.9} />
          </mesh>

          {/* Cyan Glow camera sensor/aperture */}
          <mesh position={[0, -0.04, 0.096]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.002, 16]} />
            <meshBasicMaterial color="#00f3ff" toneMapped={false} />
          </mesh>
        </group>


        {/* =========================================================
            3. DIAGONAL QUAD-ARMS & PROP MOTORS
            ========================================================= */}

        {/* FRONT LEFT ARM */}
        <group position={[-0.15, 0.01, 0.18]}>
          {/* Diagonal Strut Arm */}
          <mesh position={[-0.16, 0.01, 0.16]} rotation={[0, -Math.PI / 4, 0]}>
            <boxGeometry args={[0.06, 0.05, 0.42]} />
            <meshPhysicalMaterial color="#7a8285" roughness={0.5} />
          </mesh>
          {/* Motor Housing Pod */}
          <mesh position={[-0.30, 0.03, 0.30]}>
            <cylinderGeometry args={[0.055, 0.055, 0.13, 16]} />
            <meshPhysicalMaterial color="#3a3d40" roughness={0.4} metalness={0.6} />
            <Edges color="#555" />
          </mesh>
          {/* Metal Motor Spindle Cap */}
          <mesh position={[-0.30, 0.10, 0.30]}>
            <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
            <meshPhysicalMaterial color="#e0e0e0" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Under-motor front landing peg (essential matching of image) */}
          <mesh position={[-0.30, -0.19, 0.30]}>
            <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
            <meshPhysicalMaterial color="#7a8285" roughness={0.5} />
          </mesh>
          <mesh position={[-0.30, -0.34, 0.30]}>
            <boxGeometry args={[0.04, 0.02, 0.08]} />
            <meshPhysicalMaterial color="#1a1c1e" roughness={0.8} />
          </mesh>

          {/* Rotor Blade Group */}
          <group ref={prop1Ref} position={[-0.30, 0.12, 0.30]}>
            <mesh>
              <boxGeometry args={[0.55, 0.004, 0.03]} />
              <meshPhysicalMaterial color="#1a1c1e" roughness={0.7} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, -0.002, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.008, 12]} />
              <meshBasicMaterial color="#3a3d40" />
            </mesh>
          </group>
        </group>

        {/* FRONT RIGHT ARM */}
        <group position={[0.15, 0.01, 0.18]}>
          {/* Diagonal Strut Arm */}
          <mesh position={[0.16, 0.01, 0.16]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.06, 0.05, 0.42]} />
            <meshPhysicalMaterial color="#7a8285" roughness={0.5} />
          </mesh>
          {/* Motor Housing Pod */}
          <mesh position={[0.30, 0.03, 0.30]}>
            <cylinderGeometry args={[0.055, 0.055, 0.13, 16]} />
            <meshPhysicalMaterial color="#3a3d40" roughness={0.4} metalness={0.6} />
            <Edges color="#555" />
          </mesh>
          {/* Metal Motor Spindle Cap */}
          <mesh position={[0.30, 0.10, 0.30]}>
            <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
            <meshPhysicalMaterial color="#e0e0e0" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Under-motor front landing peg (essential matching of image) */}
          <mesh position={[0.30, -0.19, 0.30]}>
            <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
            <meshPhysicalMaterial color="#7a8285" roughness={0.5} />
          </mesh>
          <mesh position={[0.30, -0.34, 0.30]}>
            <boxGeometry args={[0.04, 0.02, 0.08]} />
            <meshPhysicalMaterial color="#1a1c1e" roughness={0.8} />
          </mesh>

          {/* Rotor Blade Group */}
          <group ref={prop2Ref} position={[0.30, 0.12, 0.30]}>
            <mesh>
              <boxGeometry args={[0.55, 0.004, 0.03]} />
              <meshPhysicalMaterial color="#1a1c1e" roughness={0.7} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, -0.002, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.008, 12]} />
              <meshBasicMaterial color="#3a3d40" />
            </mesh>
          </group>
        </group>

        {/* REAR LEFT ARM */}
        <group position={[-0.15, 0.01, -0.18]}>
          {/* Diagonal Strut Arm */}
          <mesh position={[-0.16, 0.01, -0.16]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.06, 0.05, 0.42]} />
            <meshPhysicalMaterial color="#7a8285" roughness={0.5} />
          </mesh>
          {/* Motor Housing Pod */}
          <mesh position={[-0.30, 0.03, -0.30]}>
            <cylinderGeometry args={[0.055, 0.055, 0.13, 16]} />
            <meshPhysicalMaterial color="#3a3d40" roughness={0.4} metalness={0.6} />
            <Edges color="#555" />
          </mesh>
          {/* Metal Motor Spindle Cap */}
          <mesh position={[-0.30, 0.10, -0.30]}>
            <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
            <meshPhysicalMaterial color="#e0e0e0" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Rear mini bumper guard underneath */}
          <mesh position={[-0.30, -0.06, -0.30]}>
            <cylinderGeometry args={[0.012, 0.012, 0.07, 8]} />
            <meshPhysicalMaterial color="#1a1c1e" roughness={0.8} />
          </mesh>

          {/* Rotor Blade Group */}
          <group ref={prop3Ref} position={[-0.30, 0.12, -0.30]}>
            <mesh>
              <boxGeometry args={[0.55, 0.004, 0.03]} />
              <meshPhysicalMaterial color="#1a1c1e" roughness={0.7} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, -0.002, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.008, 12]} />
              <meshBasicMaterial color="#3a3d40" />
            </mesh>
          </group>
        </group>

        {/* REAR RIGHT ARM */}
        <group position={[0.15, 0.01, -0.18]}>
          {/* Diagonal Strut Arm */}
          <mesh position={[0.16, 0.01, -0.16]} rotation={[0, -Math.PI / 4, 0]}>
            <boxGeometry args={[0.06, 0.05, 0.42]} />
            <meshPhysicalMaterial color="#7a8285" roughness={0.5} />
          </mesh>
          {/* Motor Housing Pod */}
          <mesh position={[0.30, 0.03, -0.30]}>
            <cylinderGeometry args={[0.055, 0.055, 0.13, 16]} />
            <meshPhysicalMaterial color="#3a3d40" roughness={0.4} metalness={0.6} />
            <Edges color="#555" />
          </mesh>
          {/* Metal Motor Spindle Cap */}
          <mesh position={[0.30, 0.10, -0.30]}>
            <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
            <meshPhysicalMaterial color="#e0e0e0" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Rear mini bumper guard underneath */}
          <mesh position={[0.30, -0.06, -0.30]}>
            <cylinderGeometry args={[0.012, 0.012, 0.07, 8]} />
            <meshPhysicalMaterial color="#1a1c1e" roughness={0.8} />
          </mesh>

          {/* Rotor Blade Group */}
          <group ref={prop4Ref} position={[0.30, 0.12, -0.30]}>
            <mesh>
              <boxGeometry args={[0.55, 0.004, 0.03]} />
              <meshPhysicalMaterial color="#1a1c1e" roughness={0.7} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0, -0.002, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.008, 12]} />
              <meshBasicMaterial color="#3a3d40" />
            </mesh>
          </group>
        </group>


        {/* =========================================================
            4. TACTICAL AVIONIC BEACONS (NAV LIGHTS)
            ========================================================= */}
        {/* Pulsing Red light under rear left motor */}
        <mesh position={[-0.45, -0.01, -0.48]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#ff2a3b" toneMapped={false} />
        </mesh>

        {/* Pulsing Green light under rear right motor */}
        <mesh position={[0.45, -0.01, -0.48]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#2aff3b" toneMapped={false} />
        </mesh>

        {/* Highly focused cyan status beacon on the top fuselage front */}
        <mesh position={[0, 0.12, 0.32]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>

      </group>
    </group>
  );
}
