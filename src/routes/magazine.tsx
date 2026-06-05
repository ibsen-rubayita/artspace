import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";

import magazine from "@/assets/explore-magazine.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gCollage from "@/assets/gallery-collage.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import gFigure from "@/assets/gallery-figure.jpg";

export const Route = createFileRoute("/magazine")({
  head: () => ({
    meta: [
      { title: "Magazine — ArtSpace" },
      { name: "description", content: "ArtSpace Magazine — long reads, studio visits, interviews and field reports from contemporary artists." },
      { property: "og:title", content: "Magazine — ArtSpace" },
      { property: "og:description", content: "ArtSpace Magazine — long reads, studio visits, interviews and field reports." },
      { property: "og:image", content: magazine },
      { property: "twitter:image", content: magazine },
    ],
  }),
  component: MagazinePage,
});

type Issue = {
  id: string;
  img: string;
  number: string;
  title: string;
  excerpt: string;
  date: string;
  tag: "Cover" | "Feature" | "Interview" | "Field" | "Process" | "Voices";
};

const ISSUES: Issue[] = [
  { id: "14", img: magazine, number: "Issue 14", title: "The Quiet Studios", excerpt: "Eight studios across four countries that work mostly offline — photographed as we found them.", date: "Spring 2026", tag: "Cover" },
  { id: "13", img: art8, number: "Issue 13", title: "Portraits at the Edge", excerpt: "Six painters, one prompt: the edge of a face. None of it was about likeness.", date: "Winter 2025", tag: "Feature" },
  { id: "12", img: art1, number: "Issue 12", title: "Color Is a Political Act", excerpt: "An interview with S. Vance about pigment, history and the small choices that make a body of work.", date: "Autumn 2025", tag: "Interview" },
  { id: "11", img: gBronze, number: "Issue 11", title: "Cast & Counterweight", excerpt: "A studio visit with bronze sculptor R. Okafor — kiln, garage, two assistants and a long day.", date: "Summer 2025", tag: "Field" },
  { id: "10", img: art5, number: "Issue 10", title: "The New Toy Box", excerpt: "A report on the tools 3D artists actually reach for in 2026.", date: "Spring 2025", tag: "Process" },
  { id: "9", img: art2, number: "Issue 09", title: "Worldbuilders' Notes", excerpt: "Sketchbook pages and process scans from concept artists shaping new universes.", date: "Winter 2024", tag: "Process" },
  { id: "8", img: gDoorway, number: "Issue 08", title: "Slow Cities, Slow Frames", excerpt: "A photo essay on cities at 3am, in film, by photographers who chose to stay home.", date: "Autumn 2024", tag: "Field" },
  { id: "7", img: art7, number: "Issue 07", title: "Voices on Print", excerpt: "Editorial illustrators on why the magazine page still matters.", date: "Summer 2024", tag: "Voices" },
  { id: "6", img: gCollage, number: "Issue 06", title: "Paper, Glue, Patience", excerpt: "How collage came back — and what it asks of attention.", date: "Spring 2024", tag: "Feature" },
  { id: "5", img: art4, number: "Issue 05", title: "After Midnight", excerpt: "Field notes from a year of night walks across four continents.", date: "Winter 2023", tag: "Field" },
  { id: "4", img: gFigure, number: "Issue 04", title: "Figure, Slowly", excerpt: "One model, one room, one afternoon a week, for a year.", date: "Autumn 2023", tag: "Process" },
];

function TagPill({ tag }: { tag: Issue["tag"] }) {
  return (
    <span
      className="badge"
      style={{
        background: "color-mix(in oklab, var(--color-accent) 18%, transparent)",
        color: "var(--color-accent)",
      }}
    >
      {tag}
    </span>
  );
}

function IssueCard({ issue, onOpen }: { issue: Issue; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="card-surface text-left overflow-hidden group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={issue.img}
          alt={issue.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3"><TagPill tag={issue.tag} /></div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="text-[11px] uppercase tracking-widest opacity-90">{issue.number}</div>
          <div className="font-semibold leading-snug drop-shadow">{issue.title}</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-sm text-[var(--color-muted-foreground)] line-clamp-2">{issue.excerpt}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-muted-foreground)]">
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {issue.date}</span>
          <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">Read <ArrowRight className="h-3 w-3" /></span>
        </div>
      </div>
    </button>
  );
}

function MagazinePage() {
  const [active, setActive] = useState<Issue | null>(null);
  const latest = ISSUES.slice(0, 5);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="ArtSpace Magazine"
        icon={Newspaper}
        title={<>Long reads from the <span className="text-[var(--color-accent)]">studios we visit</span>.</>}
        description="Quarterly issues — interviews, studio visits, photo essays and field reports from artists and editors around the world."
      />

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16 grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">All issues</h2>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Browse the back catalogue.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {ISSUES.map((i) => (
              <IssueCard key={i.id} issue={i} onOpen={() => setActive(i)} />
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 self-start">
          <div className="card-surface p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">Latest</h3>
              <span className="text-xs text-[var(--color-muted-foreground)]">5 recent</span>
            </div>
            <ul className="flex flex-col gap-3">
              {latest.map((i) => (
                <li key={i.id}>
                  <button
                    onClick={() => setActive(i)}
                    className="w-full flex gap-3 text-left group"
                  >
                    <img src={i.img} alt={i.title} className="h-16 w-16 rounded-md object-cover border shrink-0" style={{ borderColor: "var(--color-border)" }} />
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-widest text-[var(--color-muted-foreground)]">{i.number}</div>
                      <div className="text-sm font-medium leading-snug truncate group-hover:text-[var(--color-accent)] transition-colors">{i.title}</div>
                      <div className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{i.date}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-5 mt-4">
            <h3 className="text-sm font-semibold">Subscribe</h3>
            <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">A new issue every season. No spam.</p>
            <button className="btn btn-cta w-full mt-3 text-sm">Get the magazine</button>
          </div>
        </aside>
      </section>

      {active && (
        <div className="fixed inset-0 z-[70] flex items-stretch sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/70 animate-fade-in" onClick={() => setActive(null)} />
          <div
            className="relative z-10 w-full sm:max-w-2xl sm:rounded-xl border overflow-hidden animate-fade-up flex flex-col max-h-full sm:max-h-[90vh]"
            style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}
          >
            <img src={active.img} alt={active.title} className="w-full aspect-[16/9] object-cover" />
            <div className="p-5 sm:p-6 overflow-y-auto">
              <div className="text-[11px] uppercase tracking-widest text-[var(--color-muted-foreground)]">{active.number} · {active.date}</div>
              <h2 className="text-xl sm:text-2xl font-semibold leading-tight mt-1">{active.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">{active.excerpt}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button className="btn btn-cta px-4 py-2 text-sm">Read full issue</button>
                <button onClick={() => setActive(null)} className="btn btn-ghost px-4 py-2 text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
}
