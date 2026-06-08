import { Canvas } from '@react-three/fiber';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import DigitalGrid from './DigitalGrid';
import City from './City';
import DroneCamera from './DroneCamera';
import Drone from './Drone';
import PostProcessing from './PostProcessing';

interface CinematicSceneProps {
  // Environment Configurations
  bgColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  
  // Grid Configurations
  gridColor: string;
  gridSectionSize: number;
  
  // City Blocks
  renderBlocks: boolean;
  blockColor: string;

  // Camera Settings
  autoRotate: boolean;
  orbitSpeed: number;
  cameraMode: 'standard' | 'low-angle' | 'fly-over';
  onCoordUpdate: (coords: { x: number; y: number; z: number }) => void;

  // Postprocessing Control
  bloomThreshold: number;
  bloomSmoothing: number;
  bloomIntensity: number;
  vignetteDarkness: number;

  // Flight Path Control & Transitions
  flightConcluded: boolean;
  setFlightConcluded: (val: boolean) => void;
  showHologram: boolean;
  setShowHologram: (val: boolean) => void;
  showPortfolio: boolean;
  setShowPortfolio: (val: boolean) => void;
}

/* 
  Sub-component running INSIDE the Canvas tree to access THREE, useFrame, useThree, etc.
  Draws the curve line, holds the GSAP progress tween, positions the Drone, and locks/lerps the camera.
*/
function FlightPathAnimation({
  flightConcluded,
  setFlightConcluded,
  showHologram,
  setShowHologram,
  showPortfolio,
  setShowPortfolio,
  gridColor,
  onCoordUpdate,
}: {
  flightConcluded: boolean;
  setFlightConcluded: (val: boolean) => void;
  showHologram: boolean;
  setShowHologram: (val: boolean) => void;
  showPortfolio: boolean;
  setShowPortfolio: (val: boolean) => void;
  gridColor: string;
  onCoordUpdate: (coords: { x: number; y: number; z: number }) => void;
}) {
  const { camera } = useThree();
  const droneRef = useRef<THREE.Group>(null);
  const progressRef = useRef({ value: 0 });
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const idleOrbitRef = useRef<gsap.core.Tween | null>(null);

  // Kill continuous idle-orbit animation and all camera tweens if we are resetting the flight
  useEffect(() => {
    if (!flightConcluded && !showHologram && !showPortfolio) {
      if (idleOrbitRef.current) {
        idleOrbitRef.current.kill();
        idleOrbitRef.current = null;
      }
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(camera);
    }
  }, [flightConcluded, showHologram, showPortfolio, camera]);

  // Define our 5 key pathpoints tracing Kritika's cinematic trajectory vision
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-25, 16, 25), // Entry: Elevated, far off-screen left
      new THREE.Vector3(-12, 10, 15), // Diagonal Swoop downward towards city entrance
      new THREE.Vector3(-3.0, 5, 8),  // Left corner Corridor entry (dodges Tech Tower)
      new THREE.Vector3(3.0, 4.5, -4), // Right zigzag swing deep between structures
      new THREE.Vector3(0, 3.2, -15),  // Final destination: Center avenue target lock
    ]);
  }, []);

  // GSAP Choreography Timeline: Boot automatically on load or whenever flight is active
  useEffect(() => {
    if (!flightConcluded) {
      progressRef.current.value = 0;
      
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setShowHologram(true);
        },
      });

      // Smooth 9-second flythrough navigation
      tl.to(progressRef.current, {
        value: 1,
        duration: 9.0,
        ease: 'power1.inOut',
      });

      timelineRef.current = tl;
    } else {
      progressRef.current.value = 1;
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [flightConcluded, setShowHologram]);

  // Second GSAP timeline: Violent Camera Dive through the hologram
  useEffect(() => {
    if (showHologram && !showPortfolio && !flightConcluded) {
      const diveTl = gsap.timeline({
        delay: 2.0, // 2-second pause to admire the glowing message
        onComplete: () => {
          setShowPortfolio(true);
          setFlightConcluded(true);

          // Gently pan camera's X and Z coordinates in a slow circle around the central tower
          const angleObj = { value: 0 };
          
          if (idleOrbitRef.current) {
            idleOrbitRef.current.kill();
          }

          idleOrbitRef.current = gsap.to(angleObj, {
            value: Math.PI * 2,
            duration: 80, // extremely slow and smooth circle
            ease: 'none',
            repeat: -1,
            onUpdate: () => {
              const radius = 12;
              const targetZ = -36;
              camera.position.x = Math.sin(angleObj.value) * radius;
              camera.position.z = targetZ + Math.cos(angleObj.value) * radius;
              camera.lookAt(new THREE.Vector3(0, 2.5, targetZ));
              camera.updateProjectionMatrix();

              // Also update coordinates reported to the UI
              onCoordUpdate({
                x: Number(camera.position.x.toFixed(3)),
                y: Number(camera.position.y.toFixed(3)),
                z: Number(camera.position.z.toFixed(3)),
              });
            }
          });
        },
      });

      // Violently forwards along the forward Z axis (Z becomes more negative)
      diveTl.to(camera.position, {
        x: 0,
        y: 3.2,
        z: -24,
        duration: 1.6,
        ease: 'power3.in',
      }, 0);

      // FOV increase zoom warp effect
      diveTl.to(camera, {
        fov: 115,
        duration: 1.6,
        ease: 'power3.in',
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      }, 0);
    }
  }, [showHologram, showPortfolio, flightConcluded, camera, setShowPortfolio, setFlightConcluded, onCoordUpdate]);

  // Manage idle orbit rotation and active user manual exploration modes
  useEffect(() => {
    if (flightConcluded && !showPortfolio) {
      // User is actively in interactive orbit mode. Kill the GSAP tween so navigation is 100% free
      if (idleOrbitRef.current) {
        idleOrbitRef.current.kill();
        idleOrbitRef.current = null;
      }
    } else if (flightConcluded && showPortfolio) {
      // Re-initialize gentle rotating background behind the portfolio content overlay
      const angleObj = { value: 0 };
      
      if (idleOrbitRef.current) {
        idleOrbitRef.current.kill();
      }

      idleOrbitRef.current = gsap.to(angleObj, {
        value: Math.PI * 2,
        duration: 80,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          const radius = 12;
          const targetZ = -36;
          camera.position.x = Math.sin(angleObj.value) * radius;
          camera.position.z = targetZ + Math.cos(angleObj.value) * radius;
          camera.lookAt(new THREE.Vector3(0, 2.5, targetZ));
          camera.updateProjectionMatrix();

          onCoordUpdate({
            x: Number(camera.position.x.toFixed(3)),
            y: Number(camera.position.y.toFixed(3)),
            z: Number(camera.position.z.toFixed(3)),
          });
        }
      });
    }
  }, [flightConcluded, showPortfolio, camera, onCoordUpdate]);

  const frameCountRef = useRef(0);

  useFrame(() => {
    // Only drive camera dynamically if flight is active and we haven't hit the hologram
    if (!flightConcluded && !showHologram) {
      const t = progressRef.current.value;
      const currentPoint = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);

      // 1. Position and orient the drone
      if (droneRef.current) {
        droneRef.current.position.copy(currentPoint);
        
        // Drone rotates to look ahead along the forward trajectory vector
        if (t < 0.99) {
          const aheadPoint = curve.getPointAt(Math.min(0.999, t + 0.005));
          droneRef.current.lookAt(aheadPoint);
        }
      }

      // 2. Camera follows behind and above the drone (Stabilized mechanical fluid rig simulation)
      const backOffset = tangent.clone().multiplyScalar(-3.5); // 3.5 units backwards along tangent
      backOffset.y += 1.6; // 1.6 units elevated

      // Add a cinematic horizontal swing glide (slight lateral drift) 
      const rightVector = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const swoopDrift = Math.sin(t * Math.PI * 3.5) * 0.45;
      backOffset.add(rightVector.multiplyScalar(swoopDrift));

      const targetCamPos = currentPoint.clone().add(backOffset);

      // Damp position smoothly for AAA-grade trailer look-at fluidity
      camera.position.lerp(targetCamPos, 0.08);
      camera.lookAt(currentPoint);

      // 3. Dispatch precise coords to DOM HUD for authentic real-time log indicators
      frameCountRef.current += 1;
      if (frameCountRef.current % 10 === 0) {
        onCoordUpdate({
          x: Number(camera.position.x.toFixed(3)),
          y: Number(camera.position.y.toFixed(3)),
          z: Number(camera.position.z.toFixed(3)),
        });
      }
    } else if (showHologram && !flightConcluded) {
      // Pin drone to final destination during the movie-transition dive
      const finalPoint = curve.getPointAt(1.0);
      if (droneRef.current) {
        droneRef.current.position.copy(finalPoint);
        droneRef.current.lookAt(new THREE.Vector3(0, 3.2, -25));
      }

      // Update HUD telemetry coordinates safely during the high-speed dive
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

  return (
    <group>
      {/* Visual cyber navigation wireframe path */}
      {!flightConcluded && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  curve.getPoints(80).flatMap((p) => [p.x, p.y, p.z])
                ),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={gridColor} opacity={0.16} transparent={true} />
        </line>
      )}

      {/* High-fidelity Drone Mesh Render */}
      <group ref={droneRef}>
        <Drone color={gridColor} />
        
        {/* Holographic Projection text block attached directly to drone frame inside the 3D void */}
        {showHologram && !showPortfolio && (
          <Html
            position={[0, 0.1, -1.2]}
            center
            distanceFactor={5.5}
            className="pointer-events-none select-none"
          >
            <div className="flex flex-col items-center justify-center text-center px-6 py-4.5 rounded-lg border border-neon-blue/80 bg-black/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,243,255,0.7)] animate-pulse w-[240px]">
              <div className="text-[7px] font-mono tracking-widest text-neon-blue/65 uppercase mb-1">
                SYS_PROJECTION // ON_TARGET
              </div>
              
              <h2 className="font-mono font-extrabold tracking-widest text-white text-xs sm:text-sm mb-2 leading-snug">
                WELCOME TO<br />
                <span className="text-[#00f3ff] neon-text-glow text-sm font-black">KRITIKA'S PORTFOLIO</span>
              </h2>

              <div className="flex gap-2 items-center text-[7px] font-mono text-neon-blue/45 border-t border-neon-blue/20 pt-1.5 w-full justify-center">
                <span className="w-1 h-1 bg-green-400 rounded-full animate-ping" />
                <span>SECURED COUPLING</span>
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

export default function CinematicScene({
  bgColor,
  fogColor,
  fogNear,
  fogFar,
  gridColor,
  gridSectionSize,
  renderBlocks,
  blockColor,
  autoRotate,
  orbitSpeed,
  cameraMode,
  onCoordUpdate,
  bloomThreshold,
  bloomSmoothing,
  bloomIntensity,
  vignetteDarkness,
  flightConcluded,
  setFlightConcluded,
  showHologram,
  setShowHologram,
  showPortfolio,
  setShowPortfolio,
}: CinematicSceneProps) {
  return (
    <div id="canvas-view" className="w-full h-full relative" style={{ backgroundColor: bgColor }}>
      <Canvas
        camera={{ position: [-25, 16, 25], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        {/* Soft background attachment */}
        <color attach="background" args={[bgColor]} />
        
        {/* Fog for fading remote buildings and grid smoothly with depth */}
        <fog attach="fog" args={[fogColor, fogNear, fogFar]} />

        {/* Cinematic Cyber Illumination Group */}
        <ambientLight intensity={0.15} />
        <pointLight position={[0, 10, 0]} intensity={1.8} color={gridColor} distance={30} decay={2.0} />
        <directionalLight position={[10, 20, 10]} intensity={0.4} color="#ffffff" />
        <directionalLight position={[-10, 5, -10]} intensity={0.3} color={blockColor} />

        {/* Digital Infinite Grid */}
        <DigitalGrid
          gridColor={gridColor}
          sectionSize={gridSectionSize}
        />

        {/* Holographic Metropolis */}
        {renderBlocks && <City />}

        {/* Choreographed Flight Path & Drone Controller */}
        <FlightPathAnimation
          flightConcluded={flightConcluded}
          setFlightConcluded={setFlightConcluded}
          showHologram={showHologram}
          setShowHologram={setShowHologram}
          showPortfolio={showPortfolio}
          setShowPortfolio={setShowPortfolio}
          gridColor={gridColor}
          onCoordUpdate={onCoordUpdate}
        />

        {/* Interactive Orbit Module (Bridges context and takes over once flight concludes) */}
        <DroneCamera
          autoRotate={autoRotate}
          orbitSpeed={orbitSpeed}
          cameraMode={cameraMode}
          onCoordUpdate={onCoordUpdate}
          flightConcluded={flightConcluded}
          showPortfolio={showPortfolio}
        />

        {/* Cinematic WebGL Glow Engine */}
        <PostProcessing
          bloomThreshold={bloomThreshold}
          bloomSmoothing={bloomSmoothing}
          bloomIntensity={bloomIntensity}
          vignetteDarkness={vignetteDarkness}
        />
      </Canvas>
    </div>
  );
}
