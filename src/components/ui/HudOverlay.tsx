import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Radio, 
  Cpu, 
  Wifi, 
  Battery, 
  Terminal, 
  Settings, 
  Compass, 
  Eye, 
  EyeOff, 
  RotateCw, 
  Zap, 
  Flame, 
  Grid 
} from 'lucide-react';
import { TelemetryData } from '../../hooks/useDroneTelemetry';

interface HudOverlayProps {
  telemetry: TelemetryData;
  cameraCoords: { x: number; y: number; z: number };
  
  // Interactive UI Callbacks
  renderBlocks: boolean;
  setRenderBlocks: (val: boolean) => void;
  
  activePreset: 'original' | 'webgl-v2';
  setActivePreset: (preset: 'original' | 'webgl-v2') => void;
  
  cameraMode: 'standard' | 'low-angle' | 'fly-over';
  setCameraMode: (mode: 'standard' | 'low-angle' | 'fly-over') => void;
  
  autoRotate: boolean;
  setAutoRotate: (val: boolean) => void;
  
  intensityFactor: number;
  setIntensityFactor: (val: number) => void;

  gridGlowColor: string;
  setGridGlowColor: (color: string) => void;
  flightConcluded: boolean;
  setFlightConcluded: (val: boolean) => void;
  onReturnToPortfolio?: () => void;
}

export default function HudOverlay({
  telemetry,
  cameraCoords,
  renderBlocks,
  setRenderBlocks,
  activePreset,
  setActivePreset,
  cameraMode,
  setCameraMode,
  autoRotate,
  setAutoRotate,
  intensityFactor,
  setIntensityFactor,
  gridGlowColor,
  setGridGlowColor,
  flightConcluded,
  setFlightConcluded,
  onReturnToPortfolio,
}: HudOverlayProps) {
  const [showConfigPanel, setShowConfigPanel] = useState(true);
  const [hudActive, setHudActive] = useState(true);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  // Periodically emit cyber logs for extreme world-building fidelity
  useEffect(() => {
    const logs = [
      'SYSTEM BOOT SECTOR: OK',
      'COORDS BUFFER LOADED // ASSET_CO: 12.0',
      'VECTOR SHADER BUFFERS COMPILING...',
      'POSTPROCESS COMPOSER: ACTIVE',
      'GLOW AMBIENT LEVEL STABILIZED',
      'DRONE LINK COMMENCING ON BCA_NODE...',
      'VISIONEXA DIRECTIVE INITIALIZED',
    ];
    setLogMessages(logs);

    const logGenerator = setInterval(() => {
      const liveEvents = [
        `TELEM SYNC: LAT/LNG CORRECTIONS APPLIED`,
        `COMPOSER: BLOOM FLUSH OK // INTENSITY: ${(intensityFactor * 1.5).toFixed(1)}`,
        `CORE TELEMETRY BROADCAST: OK`,
        `FOG BUFFERS SYNCED FOR VOID_MATRIX`,
        `KC_COLLEGE ACCESS PORT: AUTHENTICATED`,
        `GRID RENDER_PASS RE-CACHED`,
      ];
      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      setLogMessages(prev => [...prev.slice(-6), `[${new Date().toLocaleTimeString()}] ${randomEvent}`]);
    }, 4500);

    return () => clearInterval(logGenerator);
  }, [intensityFactor]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-10 select-none">
      
      {/* 1. Cinematic Drone Pilot Action Trigger (Visible when flight is active) */}
      {!flightConcluded ? (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center gap-3 w-11/12 max-w-lg text-center">
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            onClick={() => setFlightConcluded(true)}
            className="w-full px-6 py-4 bg-black/80 hover:bg-black border border-neon-blue/60 hover:border-neon-blue rounded-xl text-xs font-mono tracking-widest text-[#00f3ff] neon-text-glow flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 shadow-[0_0_25px_rgba(0,243,255,0.25)]"
          >
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            <span className="font-bold">CONCLUDE METROPOLIS FLIGHT & LOCK TELEMETRY</span>
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="px-4 py-2 bg-black/70 backdrop-blur-md rounded border border-white/10 font-mono text-[9px] text-[#00f3ff] font-semibold tracking-widest uppercase flex items-center gap-2"
          >
            <span>STATUS: FLYBY APPROACH AT X=0 (CORRIDOR)</span>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
        </div>
      ) : (
        /* Reset drone mission overlay button when telemetry is active */
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto z-40 flex items-center gap-3">
          {onReturnToPortfolio && (
            <button
              onClick={onReturnToPortfolio}
              className="px-4 py-2 bg-neon-blue/15 hover:bg-neon-blue/30 border border-neon-blue/50 hover:border-neon-blue rounded-full font-mono text-[9px] text-neon-blue font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.2)] cursor-pointer flex items-center gap-1.5 hover:scale-105"
            >
              <Compass size={11} className="animate-spin-slow" />
              <span>RETURN TO PORTFOLIO CONSOLE</span>
            </button>
          )}
          <button
            onClick={() => setFlightConcluded(false)}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 rounded-full font-mono text-[9px] text-red-400 hover:text-red-300 tracking-wider transition cursor-pointer"
          >
            RESET METROPOLIS CINEMATIC RUN
          </button>
        </div>
      )}

      {/* 2. Top Header Panel - Visible only when flight concludes and telemetry unlocks */}
      {flightConcluded && (
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 w-full">
          
          {/* Title, Node status */}
          <div className="flex flex-col gap-2 pointer-events-auto">
            <div className="bg-black/60 backdrop-blur-md p-4 rounded-lg border border-white/10 flex items-center gap-4 shadow-xl">
              <div className="p-3 bg-neon-blue/15 border border-neon-blue/40 rounded-lg shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                <Radio size={20} className="text-neon-blue animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#00f3ff] font-bold tracking-widest uppercase">NODE CORE: KC_COLLEGE</div>
                <h1 className="text-base font-mono font-bold tracking-widest text-white neon-text-glow">DRONE_CINEMATIC // PHASE_01_BOOT</h1>
              </div>
            </div>

            {/* Quick HUD toggle */}
            <button
              onClick={() => setHudActive(!hudActive)}
              className="flex items-center gap-1.5 self-start px-2 py-1 rounded bg-black/40 border border-white/5 font-mono text-[9px] text-gray-400 hover:text-white transition cursor-pointer"
            >
              {hudActive ? <EyeOff size={10} /> : <Eye size={10} />}
              <span>{hudActive ? 'MINIMIZE HUD METRICS' : 'RESTORE HUD HUD'}</span>
            </button>
          </div>

          {/* Live clock & general health statuses */}
          {hudActive && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/60 backdrop-blur-md px-5 py-3 rounded-lg border border-white/10 text-right flex flex-col gap-1.5 shadow-xl max-w-xs"
            >
              <div className="font-mono text-sm tracking-wider text-white">
                <span className="text-neon-blue/80 font-semibold text-xs mr-2">LIVE TIME //</span> 
                <span className="text-xs bg-neon-blue/10 px-2 py-0.5 rounded border border-neon-blue/30 text-neon-blue">
                  {telemetry.timeString || 'SYNCHRONIZING...'}
                </span>
              </div>
              
              <div className="flex gap-3 justify-end text-[9px] uppercase font-mono text-white/50 pt-1 border-t border-white/5">
                <span className="flex items-center gap-1"><Cpu size={9} className="text-[#39ff14]" /> CPU {telemetry.signalStrength % 3 + 1.2}%</span>
                <span className="flex items-center gap-1"><Battery size={9} className="text-[#39ff14]" /> PWR {telemetry.batteryPercent}%</span>
                <span className="flex items-center gap-1"><Wifi size={9} className="text-[#39ff14]" /> {telemetry.signalStrength}%</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* 3. Middle Interactive Deck - Visible only when flight concludes and telemetry unlocks */}
      {flightConcluded && (
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 w-full mt-4 mb-4">
          
          {/* Left Control Panel Container -> Configures R3F live values */}
          <div className="pointer-events-auto flex flex-col gap-2 max-w-sm w-full md:self-center">
            <div className="bg-black/85 backdrop-blur-lg rounded-xl border border-neon-blue/30 p-5 shadow-2xl neon-border-glow flex flex-col gap-3">
              
              <div className="flex items-center justify-between border-b border-neon-blue/30 pb-2 mb-1">
                <div className="flex items-center gap-2">
                  <Settings size={15} className="text-neon-blue" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-white">ENGINE CONFIG PANEL</span>
                </div>
                <span className="text-[9px] font-mono bg-neon-blue/10 text-neon-blue px-2 py-0.5 rounded border border-neon-blue/20">LIVE CONTROL</span>
              </div>

              {/* PRESET CONFIGURATION - Dynamic Switch */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-white/50 tracking-widest uppercase">ENVIRONMENT preset PATH</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreset('original');
                      setIntensityFactor(1.3);
                    }}
                    className={`py-2 px-3 rounded text-[10px] font-mono tracking-wider transition-all border cursor-pointer ${
                      activePreset === 'original' 
                        ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50 font-bold' 
                        : 'bg-black/40 text-gray-400 border-white/5 hover:border-white/10'
                    }`}
                  >
                    PH_1: CHROMA WIREFRAME
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreset('webgl-v2');
                      setIntensityFactor(0.85);
                    }}
                    className={`py-2 px-3 rounded text-[10px] font-mono tracking-wider transition-all border cursor-pointer ${
                      activePreset === 'webgl-v2' 
                        ? 'bg-neon-blue/20 text-neon-blue border-neon-blue/50 font-bold' 
                        : 'bg-black/40 text-gray-400 border-white/5 hover:border-white/10'
                    }`}
                  >
                    PH_1 NEXT: THE DEEP VOID
                  </button>
                </div>
              </div>

              {/* BUILDINGS TOGGLE - Combines "Do not build buildings" with "Add 3-5 buildings" */}
              <div className="flex items-center justify-between bg-white/5 p-2.5 rounded border border-white/5 mt-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-white tracking-wide">3D CUBIC CITY MESH</span>
                  <span className="text-[9px] font-mono text-white/40">Toggles centrally rendered Box wireframes</span>
                </div>
                <button
                  type="button"
                  onClick={() => setRenderBlocks(!renderBlocks)}
                  className={`w-14 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                     renderBlocks ? 'bg-neon-blue' : 'bg-white/10'
                  }`}
                >
                  <div 
                    className={`w-5 h-5 bg-black rounded-full transition-transform transform ${
                      renderBlocks ? 'translate-x-8' : 'translate-x-0'
                    }`} 
                  />
                </button>
              </div>

              {/* ORBIT SPEED / AUTO ROTATION */}
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-white/50 uppercase tracking-widest">DRONE AUTOPILOT rotation</span>
                  <span className="text-neon-blue">{autoRotate ? 'ENABLED' : 'MANUAL'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`p-1.5 rounded transition font-mono text-[9px] cursor-pointer ${
                      autoRotate ? 'bg-neon-blue/15 text-neon-blue' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    <RotateCw size={11} className={autoRotate ? 'animate-spin-slow' : ''} />
                  </button>
                  <div className="w-full h-8 flex items-center bg-white/5 px-2.5 rounded border border-white/5">
                    <span className="text-[9px] font-mono text-white/40 mr-2">SPEED</span>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={autoRotate ? intensityFactor * 2 : 0}
                      disabled={!autoRotate}
                      onChange={(e) => setIntensityFactor(Number(e.target.value) / 2)}
                      className="w-full accent-neon-blue"
                    />
                  </div>
                </div>
              </div>

              {/* NEON HIGHLIGHT PALETTE */}
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">COSMIC GRID GRID EMISSIVE</span>
                <div className="flex gap-2">
                  {['#00f3ff', '#39ff14', '#f59e0b', '#ec4899'].map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGridGlowColor(c)}
                      className="w-5 h-5 rounded-full border border-white/20 transition transform hover:scale-110 cursor-pointer shadow-md"
                      style={{ backgroundColor: c, boxShadow: gridGlowColor === c ? `0 0 8px ${c}` : 'none' }}
                      title={c}
                    />
                  ))}
                  <span className="text-[9px] font-mono text-white/60 ml-auto self-center uppercase tracking-wider">{gridGlowColor}</span>
                </div>
              </div>

              {/* CAMERA PRESETS */}
              <div className="flex flex-col gap-1 mt-1">
                <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">CINEMATIC DRONE CAMERA PATH</span>
                <div className="grid grid-cols-3 gap-1">
                  {['standard', 'low-angle', 'fly-over'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setCameraMode(mode as any)}
                      className={`py-1 rounded text-[8px] font-mono uppercase tracking-tighter cursor-pointer ${
                        cameraMode === mode ? 'bg-neon-blue text-black font-bold' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {mode.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Active Terminal Console */}
          {hudActive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 font-mono text-[10px] max-w-sm w-full h-[180px] flex flex-col shadow-2xl self-end"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-2 text-neon-blue">
                <Terminal size={12} className="animate-pulse" />
                <span className="font-bold tracking-widest">CYBERNETIC_LOG_FEED</span>
              </div>
              
              <div className="flex-1 overflow-hidden flex flex-col gap-1 text-slate-100 select-text">
                {logMessages.map((msg, idx) => (
                  <div key={idx} className="whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                    <span className="text-neon-blue mr-1.5 font-bold">&gt;&gt;</span>
                    {msg}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-2 mt-1.5 text-[9px] text-slate-300 font-bold flex justify-between">
                <span>SCANNER STATUS: ONLINE</span>
                <span className="text-[#39ff14] animate-pulse">● BROADCASTING</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* 4. Footer Section - Visible only when flight concludes and telemetry unlocks */}
      {flightConcluded && (
        <div className="flex flex-col xl:flex-row justify-between items-end gap-6 w-full">
          
          {/* Left Side: Real-time dynamic numeric telemetry parameters */}
          {hudActive ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pointer-events-auto bg-black/60 backdrop-blur-md rounded-xl border border-neon-blue/20 p-5 shadow-2xl neon-border-glow font-mono text-xs max-w-sm w-full flex flex-col gap-2.5"
            >
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-1 text-neon-blue">
                <Compass size={14} className="animate-spin-slow" />
                <span className="font-bold tracking-widest">OBS_CAMERA_RADAR</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-slate-200 text-[11px] font-medium">
                <div className="flex justify-between">
                  <span>LATITUDE:</span>
                  <span className="text-[#00f3ff] font-bold">{telemetry.latitude}</span>
                </div>
                <div className="flex justify-between">
                  <span>PITCH_X:</span>
                  <span className="text-[#00f3ff] font-bold">{cameraCoords.x}</span>
                </div>
                <div className="flex justify-between">
                  <span>LONGITUDE:</span>
                  <span className="text-[#00f3ff] font-bold">{telemetry.longitude}</span>
                </div>
                <div className="flex justify-between">
                  <span>YAW_Y:</span>
                  <span className="text-[#00f3ff] font-bold">{cameraCoords.y}</span>
                </div>
                <div className="flex justify-between">
                  <span>ALTITUDE:</span>
                  <span className="text-[#00f3ff] font-bold">{cameraCoords.z}m</span>
                </div>
                <div className="flex justify-between">
                  <span>DRONE V_SPD:</span>
                  <span className="text-[#00f3ff] font-bold">{telemetry.speed}km/h</span>
                </div>
              </div>
            </motion.div>
          ) : <div />}

          {/* Right Side: Exact specified placeholder text card in gorgeous glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2.5 max-w-2-xl w-full pointer-events-auto md:max-w-xl xl:max-w-2xl"
          >
            {/* Warning notice header */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 neon-text-glow-amber mb-0.5">
              <Flame size={12} className="animate-bounce" />
              <span className="uppercase tracking-widest">ACTIVE COMPOSING TERMINAL // DIRECT CONTROL INJECTIONS</span>
            </div>

            {/* CRUCIAL glassmorphic frame with clean layout */}
            <div id="boot-core-box" className="bg-black/60 backdrop-blur-xl border border-neon-blue/50 neon-border-glow p-5 sm:p-6 rounded-lg shadow-2xl flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1.5 text-[8px] font-mono text-green-400 bg-green-500/10 border-l border-b border-green-500/20 uppercase">
                SECTOR PREVIEW OK
              </div>
              
              <div className="flex items-center gap-2 text-slate-350 font-mono text-[9px] tracking-widest uppercase font-bold">
                <Grid size={11} className="text-neon-blue animate-pulse" />
                <span>STRICT COMPLIANCE ENVIRONMENT BUFFER</span>
              </div>

              {/* Crucial glassmorphic text with neon cyan text-shadows as explicitly specified */}
              <div className="text-xs sm:text-sm font-mono text-neon-blue tracking-widest uppercase neon-text-glow font-bold leading-relaxed pr-8">
                SYSTEM BOOT... KRITIKA_OS // BCA_NODE: KC_COLLEGE // DIRECTIVE: VISIONEXA_INIT
              </div>

              {/* Auxiliary text summarizing the WebGL & lighting setup parameters */}
              <div className="text-[10px] font-mono text-slate-300 font-medium uppercase tracking-wider leading-relaxed">
                Active Environment Preset: <span className="text-white font-bold">{activePreset === 'original' ? 'CHROMATIC WIREFRAME (BG-BLACK)' : 'DEEP VOID (BG-#000510)'}</span>. Bloom composition is active at intensity <span className="text-neon-blue font-bold">{activePreset === 'original' ? '2.00 (all glow)' : '1.50 (threshold 1.0 glow)'}</span>.
              </div>
            </div>
          </motion.div>

        </div>
      )}

    </div>
  );
}
