import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Lightbox({
  title,
  images,
  onClose,
  startIndex = 0,
}: {
  title?: string;
  images: string[];
  onClose: () => void;
  startIndex?: number;
}) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(13,17,23,0.78) 0%, rgba(13,17,23,0.94) 55%, rgba(13,17,23,0.98) 100%),
          radial-gradient(ellipse 140% 140% at 85% 15%, color-mix(in oklab, var(--color-accent) 12%, transparent) 0%, transparent 55%),
          radial-gradient(ellipse 140% 140% at 15% 85%, color-mix(in oklab, var(--color-accent) 10%, transparent) 0%, transparent 55%),
          #000
        `,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} preview` : "Image preview"}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 h-10 w-10 rounded-full grid place-items-center bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
        {title && <div className="text-white/90 text-sm font-medium mb-3">{title}</div>}
        <div className="relative rounded-xl overflow-hidden bg-black/40 aspect-[16/10]">
          <img src={images[idx]} alt="" className="absolute inset-0 h-full w-full object-contain" />
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full grid place-items-center bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setIdx((i) => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full grid place-items-center bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-3 flex gap-2 justify-center flex-wrap">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Show image ${i + 1}`}
                className={`h-14 w-20 rounded-md overflow-hidden border-2 transition-all ${i === idx ? "border-[var(--color-accent)] opacity-100" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
