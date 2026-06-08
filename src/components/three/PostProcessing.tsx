import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

interface PostProcessingProps {
  bloomThreshold: number;
  bloomSmoothing: number;
  bloomIntensity: number;
  vignetteDarkness: number;
}

export default function PostProcessing({
  bloomThreshold,
  bloomSmoothing,
  bloomIntensity,
  vignetteDarkness,
}: PostProcessingProps) {
  return (
    <EffectComposer>
      {/* Precision Bloom - only elements surpassing threshold generate high intensity visual energy */}
      <Bloom
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={bloomSmoothing}
        intensity={bloomIntensity}
        mipmapBlur
      />
      {/* Vignette effect adds rich cinematic shadows around viewport margins */}
      <Vignette
        eskil={false}
        offset={0.5}
        darkness={vignetteDarkness}
      />
    </EffectComposer>
  );
}
