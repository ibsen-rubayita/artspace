import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Tag, Frame, Sparkles } from "lucide-react";
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
      { name: "description", content: "Marketplace and limited-edition prints from artists you love." },
      { property: "og:title", content: "Shop — ArtSpace" },
      { property: "og:description", content: "Marketplace and limited-edition prints from artists you love." },
    ],
  }),
  component: ShopPage,
});

const MARKETPLACE: RailItem[] = [
  { img: gFigure, title: "Figure in Ochre · Original", meta: "$3,200 · 60×80cm", tag: "Original" },
  { img: art1, title: "Atlantic Blue · Original", meta: "$2,400 · 70×90cm", tag: "Original" },
  { img: gCollage, title: "Paper Memory · Original", meta: "$1,150 · 40×50cm", tag: "Original" },
  { img: art2, title: "Floating Quiet · Open Edition", meta: "$120 · digital", tag: "Digital" },
  { img: art4, title: "Alley, 3am · Print", meta: "$240 · A2", tag: "Print" },
  { img: shopSupplies, title: "Atelier Starter Pack", meta: "$89 · bundle", tag: "Supplies" },
  { img: art6, title: "Botanical Set of 3", meta: "$210 · framed", tag: "Bundle" },
  { img: work1, title: "Monolith · Studio Edition", meta: "$640 · A1", tag: "Print" },
];

const PRINTS: RailItem[] = [
  { img: shopPrint, title: "Quiet Tree", meta: "$95 · 50×70 · /200", tag: "Limited" },
  { img: work2, title: "Plains at Dusk", meta: "$140 · 60×80 · /150", tag: "Limited" },
  { img: gDoorway, title: "Doorway, Lisbon", meta: "$110 · 40×60 · /250", tag: "Photo" },
  { img: art7, title: "Halftone Bloom", meta: "$80 · 30×40 · open", tag: "Open" },
  { img: art8, title: "The Fisherman", meta: "$160 · 50×70 · /100", tag: "Limited" },
  { img: art6, title: "Botanical I", meta: "$60 · 30×30 · open", tag: "Open" },
];

const SUPPLIES: RailItem[] = [
  { img: shopSupplies, title: "Atelier Watercolor Set · 24", meta: "$54", tag: "Supplies" },
  { img: shopSupplies, title: "Sable Brush Set · 6", meta: "$72", tag: "Brushes" },
  { img: shopSupplies, title: "Linen Sketchbook · A4", meta: "$28", tag: "Paper" },
  { img: shopSupplies, title: "Studio Easel · Beechwood", meta: "$210", tag: "Studio" },
  { img: shopSupplies, title: "Archival Ink · 100ml", meta: "$22", tag: "Ink" },
  { img: shopSupplies, title: "Conté Crayon · Set of 12", meta: "$36", tag: "Drawing" },
];

function ShopPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Shop ArtSpace"
        icon={ShoppingBag}
        title={<>Buy work that <span className="text-[var(--color-accent)]">starts a conversation</span>.</>}
        description="Originals from the marketplace, signed limited prints, and the supplies artists actually use in their studios — shipped worldwide."
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
          <span
            className="badge"
            style={{ background: "var(--color-badge-sale)", color: "#fff" }}
          >
            Sale
          </span>
          <div className="flex-1">
            <div className="text-sm font-semibold">Spring Marketplace · up to 30% off select originals</div>
            <div className="text-xs text-[var(--color-muted-foreground)] mt-0.5">Ends Sunday. Free shipping on orders over $250.</div>
          </div>
          <a href="#marketplace" className="btn btn-cta px-4 py-2 text-sm">Shop the sale</a>
        </div>
      </section>

      <div id="marketplace">
        <HorizontalRail title="Marketplace" subtitle="Originals from artists you've been following." items={MARKETPLACE} />
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Frame, title: "Limited Prints", desc: "Signed, numbered editions." },
            { icon: Tag, title: "Open Editions", desc: "Always-available prints from $60." },
            { icon: Sparkles, title: "Studio Supplies", desc: "The kit your favorite artists use." },
          ].map((c) => (
            <div key={c.title} className="card-surface p-5 hover:border-[var(--color-accent)] transition-colors">
              <span
                className="h-9 w-9 rounded-lg grid place-items-center mb-4"
                style={{ background: "color-mix(in oklab, var(--color-accent) 18%, transparent)" }}
              >
                <c.icon className="h-4 w-4 text-[var(--color-accent)]" />
              </span>
              <h3 className="text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="prints">
        <HorizontalRail title="Limited & Open Prints" subtitle="Museum-grade paper, archival inks." items={PRINTS} />
      </div>

      <HorizontalRail title="Studio Supplies" subtitle="Brushes, paper and pigments." items={SUPPLIES} />

      <Footer />
      <ScrollToTop />
    </div>
  );
}
