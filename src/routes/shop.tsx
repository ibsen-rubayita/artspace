import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Wrench, Palette as PaletteIcon, Sparkles } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";
import { HorizontalRail, type RailItem } from "@/components/site/HorizontalRail";

import shopPrint from "@/assets/shop-print.jpg";
import shopSupplies from "@/assets/shop-supplies.jpg";
import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art4 from "@/assets/art-4.jpg";
import art6 from "@/assets/art-6.jpg";
import art7 from "@/assets/art-7.jpg";
import art8 from "@/assets/art-8.jpg";
import gFigure from "@/assets/gallery-figure.jpg";
import gCollage from "@/assets/gallery-collage.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import work1 from "@/assets/work-monolith.jpg";
import work2 from "@/assets/work-plains.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — ArtSpace" },
      { name: "description", content: "Buy the tools artists actually use — brushes, painting boards, paints, cameras and lenses — and shop original arts: paintings, drawings and photographs." },
      { property: "og:title", content: "Shop — ArtSpace" },
      { property: "og:description", content: "Tools and Arts Sales — supplies for makers and original works from artists." },
    ],
  }),
  component: ShopPage,
});

// Tools used by artists — brushes, boards, paints, cameras, lenses, etc.
const TOOLS: RailItem[] = [
  { img: shopSupplies, title: "Sable Brush Set · 6", meta: "$72 · brushes", tag: "Brushes" },
  { img: shopSupplies, title: "Atelier Watercolor Set · 24", meta: "$54 · paints", tag: "Paints" },
  { img: shopSupplies, title: "Birch Painting Board · A2", meta: "$38 · boards", tag: "Boards" },
  { img: shopSupplies, title: "Studio Easel · Beechwood", meta: "$210 · studio", tag: "Studio" },
  { img: shopSupplies, title: "Mirrorless Camera · 24MP", meta: "$1,290 · camera", tag: "Cameras" },
  { img: shopSupplies, title: "Prime Lens · 35mm f/1.8", meta: "$420 · lens", tag: "Lenses" },
  { img: shopSupplies, title: "Linen Sketchbook · A4", meta: "$28 · paper", tag: "Paper" },
  { img: shopSupplies, title: "Archival Ink · 100ml", meta: "$22 · ink", tag: "Ink" },
  { img: shopSupplies, title: "Conté Crayon · Set of 12", meta: "$36 · drawing", tag: "Drawing" },
  { img: shopSupplies, title: "Graphics Tablet · 13\" Pen Display", meta: "$640 · digital", tag: "Tablets" },
];

// Arts Sales — original paintings, drawings, photographs and prints from artists
const ARTS: RailItem[] = [
  { img: gFigure, title: "Figure in Ochre · Original Painting", meta: "$3,200 · 60×80cm", tag: "Painting" },
  { img: art1, title: "Atlantic Blue · Original Painting", meta: "$2,400 · 70×90cm", tag: "Painting" },
  { img: gCollage, title: "Paper Memory · Original", meta: "$1,150 · 40×50cm", tag: "Mixed" },
  { img: art2, title: "Floating Quiet · Open Edition", meta: "$120 · digital print", tag: "Digital" },
  { img: art4, title: "Alley, 3am · Photograph", meta: "$240 · A2", tag: "Photography" },
  { img: gDoorway, title: "Doorway, Lisbon · Photograph", meta: "$340 · A2 · /250", tag: "Photography" },
  { img: art6, title: "Botanical Study · Drawing", meta: "$210 · framed", tag: "Drawing" },
  { img: work1, title: "Monolith · Studio Edition", meta: "$640 · A1 print", tag: "Print" },
  { img: shopPrint, title: "Quiet Tree · Limited Print", meta: "$95 · 50×70 · /200", tag: "Print" },
  { img: work2, title: "Plains at Dusk · Limited Print", meta: "$140 · 60×80 · /150", tag: "Print" },
  { img: art7, title: "Halftone Bloom · Open Print", meta: "$80 · 30×40", tag: "Print" },
  { img: art8, title: "The Fisherman · Limited Print", meta: "$160 · 50×70 · /100", tag: "Print" },
];

function ShopPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Shop ArtSpace"
        icon={ShoppingBag}
        title={<>Buy the <span className="text-[var(--color-accent)]">tools</span> — own the <span className="text-[var(--color-accent)]">art</span>.</>}
        description="Two shops in one. Tools the artists actually use — brushes, boards, paints, cameras, lenses — and Arts Sales: original paintings, drawings and photographs from the makers themselves."
      />

      {/* Promo bar */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-10">
        <div
          className="card-surface p-5 lg:p-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
          style={{
            background:
              "linear-gradient(120deg, color-mix(in oklab, var(--color-accent) 12%, var(--color-surface)), var(--color-surface))",
          }}
        >
          <span className="badge" style={{ background: "var(--color-badge-sale)", color: "#fff" }}>
            Sale
          </span>
          <div className="flex-1">
            <div className="text-sm font-semibold">Spring sale · up to 30% off select tools and arts</div>
            <div className="text-xs text-[var(--color-muted-foreground)] mt-0.5">Ends Sunday. Free shipping on orders over $250.</div>
          </div>
          <a href="#tools" className="btn btn-cta px-4 py-2 text-sm">Shop the sale</a>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="#tools" className="card-surface p-5 hover:border-[var(--color-accent)] transition-colors">
            <span className="h-9 w-9 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <Wrench className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-base font-semibold">Tools</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Brushes, painting boards, paints, cameras, lenses, tablets and more — the kit working artists reach for.</p>
          </a>
          <a href="#arts" className="card-surface p-5 hover:border-[var(--color-accent)] transition-colors">
            <span className="h-9 w-9 rounded-lg grid place-items-center mb-4" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
              <PaletteIcon className="h-4 w-4 text-[var(--color-accent)]" />
            </span>
            <h3 className="text-base font-semibold">Arts Sales</h3>
            <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">Original paintings, drawings, photographs and signed limited prints — shipped worldwide.</p>
          </a>
        </div>
      </section>

      <div id="tools">
        <HorizontalRail title="Tools" subtitle="Brushes, boards, paints, cameras, lenses — used by working artists." items={TOOLS} />
      </div>

      <div id="arts">
        <HorizontalRail title="Arts Sales" subtitle="Paintings, drawings, photographs and prints — direct from the artist." items={ARTS} />
      </div>

      {/* Trust strip */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Sparkles, t: "Vetted makers", d: "Every artist and supplier is reviewed." },
            { icon: Wrench, t: "Tested tools", d: "We use what we sell — and recommend honestly." },
            { icon: PaletteIcon, t: "Direct from the artist", d: "Original works ship from the studio that made them." },
          ].map((b) => (
            <div key={b.t} className="card-surface p-5">
              <span className="h-9 w-9 rounded-lg grid place-items-center mb-3" style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}>
                <b.icon className="h-4 w-4 text-[var(--color-accent)]" />
              </span>
              <h4 className="font-semibold">{b.t}</h4>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
