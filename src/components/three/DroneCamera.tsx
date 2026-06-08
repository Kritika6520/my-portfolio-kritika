import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';

interface DroneCameraProps {
  autoRotate: boolean;
  orbitSpeed: number;
  cameraMode: 'standard' | 'low-angle' | 'fly-over';
  onCoordUpdate: (coords: { x: number; y: number; z: number }) => void;
  flightConcluded: boolean;
  showPortfolio?: boolean;
}

export default function DroneCamera({
  autoRotate,
  orbitSpeed,
  cameraMode,
  onCoordUpdate,
  flightConcluded,
  showPortfolio = false,
}: DroneCameraProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // Transition the camera path and FOV whenever the mode changes using GSAP animations (only when flight concludes)
  useEffect(() => {
    if (!flightConcluded || showPortfolio) return;

    let targetPos = { x: 0, y: 5, z: 15 };
    let targetFov = 60; // Clean natural FOV for clear inspection
    
    if (cameraMode === 'low-angle') {
      targetPos = { x: -8, y: 2, z: 10 };
      targetFov = 50;
    } else if (cameraMode === 'fly-over') {
      targetPos = { x: 0, y: 15, z: 2 };
      targetFov = 65;
    }

    // GSAP tween for stunning cinematic transition paths
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 2.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.update();
        }
      },
    });

    // Animate FOV back from dive fish-eye (115) to natural view settings
    gsap.to(camera, {
      fov: targetFov,
      duration: 2.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.updateProjectionMatrix();
      },
    });
  }, [cameraMode, camera, flightConcluded, showPortfolio]);

  const frameCountRef = useRef(0);

  useFrame((state) => {
    // Only apply drift and report telemetry if flight concludes, orbit controls take over, and we are not in portfolio mode
    if (flightConcluded && !showPortfolio) {
      // Continuous hover simulation (drone reacting to turbulence)
      const time = state.clock.getElapsedTime();
      const driftY = Math.sin(time * 1.5) * 0.15;
      const driftX = Math.cos(time * 1.2) * 0.1;
      
      // Smoothly apply noise drift to active camera position
      camera.position.y += driftY * 0.05;
      camera.position.x += driftX * 0.05;

      // Report absolute live coordinates back to HUD overlay
      frameCountRef.current += 1;
      if (frameCountRef.current % 10 === 0) {
        onCoordUpdate({
          x: Number(camera.position.x.toFixed(3)),
          y: Number(camera.position.y.toFixed(3)),
          z: Number(camera.position.z.toFixed(3)),
        });
      }
    }
  });

  // Only render OrbitControls when flight path concluded and we are not in portfolio mode to avoid camera lock competition
  if (!flightConcluded || showPortfolio) {
    return null;
  }

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 2, -8]}
      enableZoom={true}
      enablePan={false}
      maxPolarAngle={Math.PI / 2.05} // Constrain so camera doesn't dip under floor
      minDistance={4}
      maxDistance={40}
      dampingFactor={0.05}
      enableDamping={true}
      autoRotate={autoRotate}
      autoRotateSpeed={orbitSpeed}
    />
  );
}
