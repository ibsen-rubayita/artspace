/**
 * Painterly aurora background — soft, large, blurred gradient blobs
 * that slowly drift and morph, like pigments blending on canvas.
 * Respects prefers-reduced-motion (blobs remain but stop animating).
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`aurora-root ${className ?? ""}`}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      <span className="aurora-blob aurora-blob-1" />
      <span className="aurora-blob aurora-blob-2" />
      <span className="aurora-blob aurora-blob-3" />
      <span className="aurora-blob aurora-blob-4" />
    </div>
  );
}
