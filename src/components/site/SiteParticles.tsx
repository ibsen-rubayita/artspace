import { useEffect, useState } from "react";
import Particles from "./Particles";

/**
 * Site-wide fixed particle background. Renders behind all page content.
 * Client-only to avoid SSR mismatch with WebGL.
 */
export function SiteParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Particles
        particleCount={70}
        particleSpread={10}
        speed={0.05}
        particleColors={["#58a6ff", "#238636", "#58a6ff"]}
        moveParticlesOnHover={false}
        alphaParticles
        particleBaseSize={50}
        sizeRandomness={1}
        cameraDistance={20}
        disableRotation={false}
      />
    </div>
  );
}
