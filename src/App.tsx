import { useState } from 'react';
import { useDroneTelemetry } from './hooks/useDroneTelemetry';
import CinematicScene from './components/three/CinematicScene';
import HudOverlay from './components/ui/HudOverlay';
import PortfolioUI from './components/ui/PortfolioPage';

export default function App() {
  const telemetry = useDroneTelemetry();
  
  // Real-time camera coords reported from R3F useFrame loop to the DOM
  const [cameraCoords, setCameraCoords] = useState({ x: 0, y: 5.0, z: 15.0 });

  // Interactive Scene States
  const [renderBlocks, setRenderBlocks] = useState(true); // Can toggle off for blank canvas demo
  const [activePreset, setActivePreset] = useState<'original' | 'webgl-v2'>('webgl-v2');
  const [cameraMode, setCameraMode] = useState<'standard' | 'low-angle' | 'fly-over'>('standard');
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Custom slider adjustment multiplier (modulates speeds / intensities)
  const [intensityFactor, setIntensityFactor] = useState(0.85);

  // Dynamic emissive palette selection managed in state
  const [gridGlowColor, setGridGlowColor] = useState('#00f3ff');

  // Flight Concluded callback state requested by user to hide/reveal HTML telemetry boxes
  const [flightConcluded, setFlightConcluded] = useState(false);

  // Phase transition state management
  const [showHologram, setShowHologram] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  // Custom callback handling full state resets when users choose to replay the sequence
  const handleSetFlightConcluded = (val: boolean) => {
    setFlightConcluded(val);
    if (!val) {
      setShowHologram(false);
      setShowPortfolio(false);
    }
  };

  // Map environments based on corresponding setup directives
  const renderConfig = {
    original: {
      bgColor: '#000000',
      fogColor: '#000000',
      fogNear: 15,
      fogFar: 100,
      bloomThreshold: 0.1,
      bloomSmoothing: 0.9,
      bloomIntensity: intensityFactor * 2.2, // robust glow for wireframes
      vignetteDarkness: 0.2,
      gridSectionSize: 5,
    },
    'webgl-v2': {
      bgColor: '#000510', // Deep void navy
      fogColor: '#000510',
      fogNear: 10,
      fogFar: 50, // buildings fade into distance smoothly
      bloomThreshold: 1.0, // only explicitly glowing items glow intensely
      bloomSmoothing: 0.1,
      bloomIntensity: intensityFactor * 1.5, // 1.5 standard bloom intensity
      vignetteDarkness: 1.1, // strong vignette to focus view
      gridSectionSize: 5,
    }
  };

  const currentConfig = renderConfig[activePreset];

  return (
    <div 
      id="drone-shot-viewport" 
      className="w-screen h-screen overflow-hidden relative select-none"
      style={{ backgroundColor: currentConfig.bgColor }}
    >
      {/* Absolute Layer 0: Heavy WebGL 3D Canvas rendering */}
      <div id="3d-canvas-container" className="absolute inset-0 z-0">
        <CinematicScene
          bgColor={currentConfig.bgColor}
          fogColor={currentConfig.fogColor}
          fogNear={currentConfig.fogNear}
          fogFar={currentConfig.fogFar}
          gridColor={gridGlowColor}
          gridSectionSize={currentConfig.gridSectionSize}
          renderBlocks={renderBlocks}
          blockColor={gridGlowColor}
          autoRotate={autoRotate}
          orbitSpeed={autoRotate ? intensityFactor * 0.8 : 0}
          cameraMode={cameraMode}
          onCoordUpdate={setCameraCoords}
          bloomThreshold={currentConfig.bloomThreshold}
          bloomSmoothing={currentConfig.bloomSmoothing}
          bloomIntensity={currentConfig.bloomIntensity}
          vignetteDarkness={currentConfig.vignetteDarkness}
          flightConcluded={flightConcluded}
          setFlightConcluded={handleSetFlightConcluded}
          showHologram={showHologram}
          setShowHologram={setShowHologram}
          showPortfolio={showPortfolio}
          setShowPortfolio={setShowPortfolio}
        />
      </div>

      {/* Conditional rendering for zero visual pollution during active flight sequences */}
      {showPortfolio && (
        <div className="absolute inset-0 z-[100] w-full h-full pointer-events-auto">
          <PortfolioUI
            onEnter3dMode={() => setShowPortfolio(false)}
            gridColor={gridGlowColor}
          />
        </div>
      )}

      {!showPortfolio && flightConcluded && (
        <>
          {/* Cybernetic Structural Overlay Corner Brackets */}
          <div id="bracket-tl" className="absolute top-4 left-4 w-8 h-8 border-t border-l border-neon-blue/40 z-10 pointer-events-none animate-pulse" />
          <div id="bracket-tr" className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#00f3ff]/40 z-10 pointer-events-none animate-pulse" />
          <div id="bracket-bl" className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#00f3ff]/40 z-10 pointer-events-none animate-pulse" />
          <div id="bracket-br" className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-neon-blue/40 z-10 pointer-events-none animate-pulse" />

          {/* Absolute Layer 1: Tactical HTML Glassmorphic overlay */}
          <HudOverlay
            telemetry={telemetry}
            cameraCoords={cameraCoords}
            renderBlocks={renderBlocks}
            setRenderBlocks={setRenderBlocks}
            activePreset={activePreset}
            setActivePreset={setActivePreset}
            cameraMode={cameraMode}
            setCameraMode={setCameraMode}
            autoRotate={autoRotate}
            setAutoRotate={setAutoRotate}
            intensityFactor={intensityFactor}
            setIntensityFactor={setIntensityFactor}
            gridGlowColor={gridGlowColor}
            setGridGlowColor={setGridGlowColor}
            flightConcluded={flightConcluded}
            setFlightConcluded={handleSetFlightConcluded}
            onReturnToPortfolio={() => setShowPortfolio(true)}
          />
        </>
      )}

      {/* Continuous Scanline Horizontal Overlay Noise */}
      <div className="absolute inset-0 scanline-overlay z-20 pointer-events-none opacity-25 mix-blend-color-burn" />
    </div>
  );
}
