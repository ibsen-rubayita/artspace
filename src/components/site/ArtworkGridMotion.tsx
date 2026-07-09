/**
 * ArtworkGridMotion — a tilted, drifting wall of artwork thumbnails.
 * Rows alternate scroll directions on seamless CSS loops.
 * Sits behind hero content with a dark gradient overlay for readability.
 */
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art5 from "@/assets/art-5.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import art9 from "@/assets/art-9.jpg";
import art10 from "@/assets/art-10.jpg";
import art11 from "@/assets/art-11.jpg";
import art12 from "@/assets/art-12.jpg";
import art13 from "@/assets/art-13.jpg";
import art14 from "@/assets/art-14.jpg";
import art15 from "@/assets/art-15.jpg";
import art16 from "@/assets/art-16.jpg";
import art17 from "@/assets/art-17.jpg";
import art18 from "@/assets/art-18.jpg";
import gFigure from "@/assets/gallery-figure.jpg";
import gCollage from "@/assets/gallery-collage.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import mag from "@/assets/explore-magazine.jpg";
import hero from "@/assets/hero-artwork.jpg";

const POOL = [
  art1, art2, art5, art7, art8, art9, art10, art11, art12, art13,
  art14, art15, art16, art17, art18, gFigure, gCollage, gBronze,
  gDoorway, mag, hero,
];

// Build a row of N tiles by cycling POOL starting at an offset
function makeRow(count: number, offset: number): string[] {
  return Array.from({ length: count }, (_, i) => POOL[(offset + i) % POOL.length]);
}

const ROWS: { images: string[]; duration: number; reverse: boolean }[] = [
  { images: makeRow(12, 0),  duration: 42, reverse: false },
  { images: makeRow(12, 3),  duration: 34, reverse: true  },
  { images: makeRow(12, 7),  duration: 48, reverse: false },
  { images: makeRow(12, 11), duration: 28, reverse: true  },
  { images: makeRow(12, 5),  duration: 38, reverse: false },
  { images: makeRow(12, 9),  duration: 44, reverse: true  },
];

export function ArtworkGridMotion({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`gridmotion-root ${className ?? ""}`}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
    >
      <div className="gridmotion-stage">
        {ROWS.map((row, ri) => (
          <div key={ri} className="gridmotion-row">
            <div
              className={`gridmotion-track ${row.reverse ? "reverse" : ""}`}
              style={{ animationDuration: `${row.duration}s` }}
            >
              {[...row.images, ...row.images].map((src, i) => (
                <div key={i} className="gridmotion-tile">
                  <img src={src} alt="" loading="lazy" draggable={false} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="gridmotion-overlay" />
    </div>
  );
}
