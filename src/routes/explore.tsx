import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, ArrowRight, BookOpen, Newspaper, Image as ImageIcon } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";

import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import gFigure from "@/assets/gallery-figure.jpg";
import gCollage from "@/assets/gallery-collage.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import magazine from "@/assets/explore-magazine.jpg";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — ArtSpace" },
      { name: "description", content: "Explore the gallery, read the magazine, and follow blogs from artists, studios and collectors." },
      { property: "og:title", content: "Explore — ArtSpace" },
      { property: "og:description", content: "Explore the gallery, read the magazine, and follow blogs from artists, studios and collectors." },
    ],
  }),
  component: ExplorePage,
});

const GALLERY: RailItem[] = [
  { img: gFigure, title: "Figure in Ochre", artist: "L. Marin", tag: "Painting", likes: "2.4k", views: "18.2k" },
  { img: gCollage, title: "Paper Memory", artist: "K. Aoki", tag: "Mixed Media", likes: "1.8k", views: "12.6k" },
  { img: gBronze, title: "Bronze 04", artist: "R. Okafor", tag: "Sculpture", likes: "3.1k", views: "22.9k" },
  { img: gDoorway, title: "Doorway, Lisbon", artist: "M. Costa", tag: "Photography", likes: "1.2k", views: "9.4k" },
  { img: art1, title: "Atlantic Blue", artist: "S. Vance", tag: "Painting", likes: "4.6k", views: "31.7k" },
  { img: art3, title: "Pillar", artist: "E. Lindqvist", tag: "Sculpture", likes: "2.0k", views: "15.1k" },
  { img: art7, title: "Halftone Bloom", artist: "J. Disingana", tag: "Illustration", likes: "5.8k", views: "44.3k" },
  { img: art8, title: "The Fisherman", artist: "A. Petrov", tag: "Painting", likes: "3.4k", views: "27.0k" },
];

const BLOGS: RailItem[] = [
  { img: art2, title: "Concept Art in 2026", meta: "By Studio North · 7 min read", tag: "Blog" },
  { img: art5, title: "Sculpting Pipelines, Demystified", meta: "By Atelier Mech · 12 min read", tag: "Blog" },
  { img: art6, title: "Watercolor Field Notes", meta: "By J. Pereira · 4 min read", tag: "Blog" },
  { img: gCollage, title: "Why Collage Is Back", meta: "By K. Aoki · 6 min read", tag: "Essay" },
  { img: gDoorway, title: "On Returning to Film", meta: "By M. Costa · 9 min read", tag: "Photo" },
  { img: art4, title: "Cities After Midnight", meta: "By N. Hayashi · 5 min read", tag: "Photo" },
];

const MAGAZINE: RailItem[] = [
  { img: magazine, title: "Issue 14 — The Quiet Studios", meta: "Spring 2026", tag: "Cover" },
  { img: art8, title: "Portraits at the Edge", meta: "Long read", tag: "Feature" },
  { img: art1, title: "Color Is a Political Act", meta: "Interview", tag: "Voices" },
  { img: gBronze, title: "Cast & Counterweight", meta: "Studio visit", tag: "Field" },
  { img: art5, title: "The New Toy Box", meta: "Industry", tag: "Report" },
  { img: art2, title: "Worldbuilders' Notes", meta: "Sketchbook", tag: "Process" },
];

function SectionLink({
  to,
  icon: Icon,
  title,
  desc,
  href,
}: {
  to?: string;
  href?: string;
  icon: typeof Compass;
  title: string;
  desc: string;
}) {
  const cls = "card-surface p-5 group hover:border-[var(--color-accent)] transition-colors";
  const body = (
    <>
      <div
        className="h-9 w-9 rounded-lg grid place-items-center mb-4"
        style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}
      >
        <Icon className="h-4 w-4 text-[var(--color-accent)]" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{desc}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] group-hover:gap-2.5 transition-all">
        Open <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </>
  );
  return to ? (
    <Link to={to} className={cls}>{body}</Link>
  ) : (
    <a href={href ?? "#"} className={cls}>{body}</a>
  );
}

function ExplorePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Explore ArtSpace"
        icon={Compass}
        title={<>Discover work that <span className="text-[var(--color-accent)]">moves you</span>.</>}
        description="A living index of contemporary work — paintings, sculpture, photography and digital craft, alongside the stories and essays behind them."
      />

      {/* Section cards */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SectionLink to="/gallery" icon={ImageIcon} title="Gallery" desc="Browse curated works by medium and artist." />
          <SectionLink to="/blogs" icon={BookOpen} title="Blogs & Magazine" desc="Stories from artists about their works." />
          <SectionLink to="/blogs" icon={Newspaper} title="Magazine Issue 14" desc="The Quiet Studios — out now." />
        </div>
      </section>

      <div id="gallery-rail">
        <HorizontalRail title="From the Gallery" subtitle="A selection of recently added works." items={GALLERY} />
      </div>

      <div id="blogs">
        <HorizontalRail title="Latest from the Blogs" subtitle="Practice, process and field reports." items={BLOGS} />
      </div>

      <div id="magazine">
        <HorizontalRail title="ArtSpace Magazine" subtitle="Issue 14 — out now." items={MAGAZINE} />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
