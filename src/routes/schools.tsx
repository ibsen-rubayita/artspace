import { createFileRoute } from "@tanstack/react-router";
import { School, MapPin, Clock, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";

import learnStudio from "@/assets/learn-studio.jpg";
import learnSchool from "@/assets/learn-school.jpg";
import learnCourse from "@/assets/learn-course.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art8 from "@/assets/art-8.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import gFigure from "@/assets/gallery-figure.jpg";

export const Route = createFileRoute("/schools")({
  head: () => ({
    meta: [
      { title: "Schools & Training Centers — ArtSpace" },
      { name: "description", content: "In-person schools and training centers for painting, drawing, photography, sculpture and other hands-on disciplines." },
      { property: "og:title", content: "Schools & Training Centers — ArtSpace" },
      { property: "og:description", content: "Find in-person art schools and training centers worldwide for hands-on disciplines." },
    ],
  }),
  component: SchoolsPage,
});

type SchoolItem = {
  name: string;
  city: string;
  focus: string;
  format: "Full programme" | "Workshop" | "Short course" | "Residency";
  duration: string;
  img: string;
};

const SCHOOLS: SchoolItem[] = [
  { name: "Atelier Lumen", city: "Paris, FR", focus: "Classical Painting & Figure Drawing", format: "Full programme", duration: "2 years", img: learnSchool },
  { name: "Northlight Academy", city: "Stockholm, SE", focus: "Drawing & Illustration", format: "Full programme", duration: "3 years", img: learnStudio },
  { name: "The Painters' Hall", city: "London, UK", focus: "Oil Painting & Portraiture", format: "Workshop", duration: "8–12 weeks", img: art8 },
  { name: "Hana Atelier", city: "Kyoto, JP", focus: "Watercolor & Sumi-e", format: "Short course", duration: "4 weeks", img: art6 },
  { name: "Casa Bronze", city: "Lisbon, PT", focus: "Sculpture & Bronze Casting", format: "Workshop", duration: "6 weeks", img: gBronze },
  { name: "Field Quarterly School", city: "Reykjavik, IS", focus: "Documentary Photography", format: "Residency", duration: "3 months", img: gDoorway },
  { name: "Studio Foundry", city: "Berlin, DE", focus: "Life Drawing & Anatomy", format: "Short course", duration: "10 weeks", img: gFigure },
  { name: "Académie Marin", city: "Madrid, ES", focus: "Plein-air Painting", format: "Workshop", duration: "2 weeks", img: learnCourse },
  { name: "Adams Photography Center", city: "Denver, US", focus: "Landscape Photography", format: "Workshop", duration: "3 weeks", img: art5 },
];

const RESIDENCIES: RailItem[] = [
  { img: gBronze, title: "Casa Bronze · Summer Residency", meta: "Lisbon · 8 weeks · housing included", tag: "Residency" },
  { img: gDoorway, title: "Field Quarterly · Documentary", meta: "Reykjavik · 3 months · stipend", tag: "Residency" },
  { img: gFigure, title: "Atelier Lumen · Open Studios", meta: "Paris · 6 weeks · figure focus", tag: "Residency" },
  { img: art6, title: "Hana Atelier · Watercolor Retreat", meta: "Kyoto · 4 weeks · materials provided", tag: "Residency" },
];

function SchoolCard({ s }: { s: SchoolItem }) {
  return (
    <div className="card-surface overflow-hidden group hover:border-[var(--color-accent)] transition-colors flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={s.img} alt={s.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute top-3 left-3 badge" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)", color: "var(--color-accent)" }}>
          {s.format}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold leading-snug">{s.name}</h3>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{s.focus}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {s.city}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {s.duration}</span>
        </div>
        <button className="btn btn-ghost mt-4 text-sm">View programme</button>
      </div>
    </div>
  );
}

function SchoolsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Schools & Training Centers"
        icon={School}
        title={<>Learn in the room — <span className="text-[var(--color-accent)]">hands on the materials</span>.</>}
        description="In-person schools, ateliers and workshops for disciplines that need your physical presence — painting, drawing, photography, sculpture and more."
      />

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: School, k: "180", v: "Partner schools worldwide" },
            { icon: Users, k: "12k+", v: "Students enrolled this year" },
            { icon: Clock, k: "9", v: "Disciplines — painting to sculpture" },
          ].map((s) => (
            <div key={s.v} className="card-surface p-5 flex items-center gap-4">
              <span className="h-10 w-10 rounded-lg grid place-items-center" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
                <s.icon className="h-4 w-4 text-[var(--color-accent)]" />
              </span>
              <div>
                <div className="text-xl font-semibold">{s.k}</div>
                <div className="text-xs text-[var(--color-muted-foreground)] mt-0.5">{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">Schools & ateliers</h2>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">In-person programmes you can apply to today.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCHOOLS.map((s) => <SchoolCard key={s.name} s={s} />)}
        </div>
      </section>

      <HorizontalRail title="Residencies & Retreats" subtitle="Live-in programmes with studio access." items={RESIDENCIES} />

      <Footer />
      <ScrollToTop />
    </div>
  );
}
