import { useState, useEffect } from 'react';

export interface TelemetryData {
  timeString: string;
  latitude: number;
  longitude: number;
  altitude: number;
  pitch: number;
  roll: number;
  yaw: number;
  batteryPercent: number;
  signalStrength: number;
  speed: number;
}

export function useDroneTelemetry() {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    timeString: '',
    latitude: 34.0522,
    longitude: -118.2437,
    altitude: 15.0,
    pitch: 5.0,
    roll: 0.0,
    yaw: 120.5,
    batteryPercent: 100,
    signalStrength: 98,
    speed: 0.0,
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      const timestamp = now.getTime();

      setTelemetry((prev) => {
        // Natural micro-oscillations to simulate drone engine vibrations in-air
        const driftX = Math.sin(timestamp / 1200) * 0.04;
        const driftY = Math.cos(timestamp / 1500) * 0.03;
        const driftZ = Math.sin(timestamp / 800) * 0.01;

        return {
          timeString: timeStr,
          latitude: Number((prev.latitude + driftX * 0.0001).toFixed(6)),
          longitude: Number((prev.longitude + driftY * 0.0001).toFixed(6)),
          altitude: Number((15.0 + Math.sin(timestamp / 2000) * 0.8).toFixed(3)),
          pitch: Number((5.0 + Math.sin(timestamp / 900) * 0.5).toFixed(2)),
          roll: Number((Math.cos(timestamp / 1100) * 0.4).toFixed(2)),
          yaw: Number(((120.5 + Math.sin(timestamp / 5000) * 2.0) % 360).toFixed(1)),
          batteryPercent: Math.max(0, 100 - Math.floor((timestamp % 360000) / 15000)), // dynamic slow drain
          signalStrength: Math.floor(95 + Math.sin(timestamp / 4000) * 3),
          speed: Number((12.4 + Math.sin(timestamp / 3000) * 0.8).toFixed(1)),
        };
      });
    }, 150);

    return () => clearInterval(updateInterval);
  }, []);

  return telemetry;
}
