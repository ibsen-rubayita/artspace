import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { BookOpen, Share2, UserPlus, UserCheck, X, Heart, MessageCircle, Expand } from "lucide-react";
import { Lightbox } from "@/components/site/Lightbox";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";

import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art8 from "@/assets/art-8.jpg";
import gFigure from "@/assets/gallery-figure.jpg";
import gCollage from "@/assets/gallery-collage.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import magazine from "@/assets/explore-magazine.jpg";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs & Magazine — ArtSpace" },
      { name: "description", content: "Read blogs from artists about their works, studio process and field notes — plus ArtSpace Magazine features." },
      { property: "og:title", content: "Blogs & Magazine — ArtSpace" },
      { property: "og:description", content: "Stories from artists about their works, process and studios." },
    ],
  }),
  component: BlogsPage,
});

type Post = {
  id: string;
  img: string;
  title: string;
  excerpt: string;
  body: string;
  artist: string;
  artistHandle: string;
  readTime: string;
  tag: "Blog" | "Essay" | "Photo" | "Feature" | "Interview" | "Process" | "Cover";
};

const POSTS: Post[] = [
  {
    id: "1",
    img: art2,
    title: "Concept Art in 2026",
    excerpt: "How small studios are reshaping early visual development.",
    body: "I spent the last six months sketching morning thumbnails — small, fast, no precious lines. The work in this post came out of that practice: a pile of half-finished worlds, edited down to a handful that felt honest. Concept art in 2026 is less about polish and more about getting to a feeling fast, then defending it.\n\nWhat's changed for us isn't the tools. It's the tempo. We stopped waiting for the perfect brief before we started drawing, and started drawing to find the brief. Most of what you see here was made before anyone knew what the story was — and the story got better because of that.\n\nThe small studios I admire right now share one habit: they show the ugly middle. Not just the polished frame, but the twenty ideas around it, the color test that didn't work, the composition that almost did. It turns out that showing the search is more useful to other artists than showing the answer.\n\nIf there's a thesis in this post, it's this — early visual development is a conversation with yourself, out loud, on paper. The audience for that conversation is smaller than you think, and the ones who care will care a lot.",
    artist: "Studio North",
    artistHandle: "@studionorth",
    readTime: "7 min read",
    tag: "Blog",
  },
  {
    id: "2",
    img: art5,
    title: "Sculpting Pipelines, Demystified",
    excerpt: "A working studio's actual ZBrush → bake → paint loop.",
    body: "We get asked about our pipeline almost every week. The truth: it's three folders and one rule. Block, refine, bake. Everything else is taste. Here are the files, in order, with notes on what we throw away and why.\n\nBlocking is where most of the thinking happens. If the silhouette doesn't read at a thumbnail, no amount of refinement saves it. We keep our block-outs deliberately ugly — flat grey, no detail — so we can't lie to ourselves about the pose. When something isn't working, we go back to this folder and start again. It costs less than you think.\n\nRefinement is the boring part, and I mean that as a compliment. It's where you close the gap between the block and the final read. There's no shortcut, but there is a rhythm: one big shape, then five small ones, then step back for ten minutes. If you don't step back, you'll polish something dead.\n\nThe bake is where amateurs get precious and pros get pragmatic. A bake is a compression, not a portrait — you're throwing away information on purpose. Once you accept that, the whole loop speeds up, and the final texture pass stops fighting the geometry.",
    artist: "Atelier Mech",
    artistHandle: "@ateliermech",
    readTime: "12 min read",
    tag: "Process",
  },
  {
    id: "3",
    img: art6,
    title: "Watercolor Field Notes",
    excerpt: "On painting outdoors in unfamiliar weather.",
    body: "I went north for a week with one small box of pigments. The paper buckled, the light moved, and I learned to stop fighting both. These are pages from the sketchbook, in the order I painted them, with the mistakes left in.\n\nThe first two days were bad, in the useful way. I kept reaching for control — mixing on the palette, testing on a scrap, waiting for the wash to behave. None of that works when the wind changes every ten minutes. By the third day I was mixing on the paper and letting the puddle decide.\n\nWatercolor outdoors is a negotiation with time. You have five minutes before the sky is different, maybe less. Whatever you get in those five minutes is the painting. The rest is documentation.\n\nI came home with thirty-one small pages and kept twelve. The ones I kept aren't the best-painted; they're the ones where I stopped in time. That's the whole lesson of the trip, and I'm still learning it.",
    artist: "J. Pereira",
    artistHandle: "@jpereira",
    readTime: "4 min read",
    tag: "Blog",
  },
  {
    id: "4",
    img: gCollage,
    title: "Why Collage Is Back",
    excerpt: "On scissors, glue and the slow internet.",
    body: "Collage rewards looking. You cannot scroll a glued page. The artists in this essay are not chasing a trend — they're answering a quieter question about attention, and about what hands can do that software still can't.\n\nWhat I like about the medium right now is how badly it photographs. A collage on a screen is a rumor of a collage. You have to be in the room to see the shadow of a torn edge, the tiny ridge where two papers meet. That resistance to reproduction is doing something interesting to the way people make the work.\n\nThe artists I spoke to all mentioned the same thing: the pace. Cutting is slower than clicking. Glue takes a minute to set. You cannot undo. Those constraints, which sound like limits, turn out to be the point.\n\nI don't think collage is 'back' in any commercial sense. But there's a small, stubborn community making it more seriously than they were five years ago, and the work is better for the seriousness.",
    artist: "K. Aoki",
    artistHandle: "@kaoki",
    readTime: "6 min read",
    tag: "Essay",
  },
  {
    id: "5",
    img: gDoorway,
    title: "On Returning to Film",
    excerpt: "Lisbon, a borrowed Leica, and the cost of slowing down.",
    body: "I shot one roll a day for thirty days. Some of the frames are in this post; most are not. Returning to film didn't make me a better photographer — it made me a more patient one, and that turned out to be the same thing.\n\nThe first week I wasted frames the way I waste them digitally, without thinking. Then the cost started to register, not in money but in attention. Thirty-six frames is a small number when you have to earn each one, and my hit rate went up the moment I stopped pretending it was infinite.\n\nLisbon helped. It's a city that rewards standing still — the light comes to you if you wait for it. I found the same corners three or four times across the month, at different hours, and the pictures got quieter each visit.\n\nWhat I brought home wasn't a portfolio. It was a habit: look longer, press later. I've kept it, mostly, back in the digital work. That was worth the cost of the film.",
    artist: "M. Costa",
    artistHandle: "@mcosta",
    readTime: "9 min read",
    tag: "Photo",
  },
  {
    id: "6",
    img: art4,
    title: "Cities After Midnight",
    excerpt: "A long walk through quiet streets, camera in hand.",
    body: "Between 1am and 4am, cities become rooms. The light is honest, the people few, and the geometry shows up. This is a small set from a year of late walks — Tokyo, Seoul, and a single night in Porto.\n\nI didn't plan the project. It started as insomnia and turned into a route. Same camera, same lens, same shoes. The constraint made the work: with nothing to fiddle with, the only variable left was where I stood.\n\nSomething I didn't expect — the sound. Streets at three in the morning have a specific hush that shows up in the pictures somehow, even though the pictures don't have sound. Maybe it's the lack of blur, maybe it's the composition; I'm not sure yet.\n\nA year is not a long project, but it's long enough to notice patterns. My frames got emptier over time. I stopped trying to catch something and started trying to describe the room.",
    artist: "N. Hayashi",
    artistHandle: "@nhayashi",
    readTime: "5 min read",
    tag: "Photo",
  },
  {
    id: "7",
    img: magazine,
    title: "Issue 14 — The Quiet Studios",
    excerpt: "Inside the studios that don't post much.",
    body: "Issue 14 is about the artists who work mostly offline. We visited eight studios across four countries, photographed the rooms as we found them, and asked one question: what does your day actually look like? The answers are in this issue.\n\nWe didn't ask about influences, or process, or the market. Those interviews have been done. Instead we sat in the studio for a morning and watched. What time do you start. What do you look at first. When do you eat. When do you stop.\n\nThe most surprising thing was how similar the answers were, across mediums and continents. Everyone starts with something small. Everyone has a ritual they're slightly embarrassed by. Nobody works the hours they tell interviewers they work.\n\nThe photographs in this issue are unstyled. The studios are as we found them — dust, lunch dishes, the good chair — because that's the point. Quiet studios don't look like anything in particular. They look like rooms where someone is paying attention.",
    artist: "ArtSpace Magazine",
    artistHandle: "@artspacemag",
    readTime: "Spring 2026",
    tag: "Cover",
  },
  {
    id: "8",
    img: art8,
    title: "Portraits at the Edge",
    excerpt: "A feature on contemporary portraiture in shifting light.",
    body: "Six painters, one prompt: the edge of a face. The work that came back surprised us — almost none of it was about likeness. This long read collects the paintings, the studio notes, and the conversations that followed.\n\nWhat they gave us instead was a set of studies about attention. Where the cheekbone meets the shadow. Where the ear disappears into hair. The places where a portrait stops being a portrait and starts being a piece of light.\n\nThree of the six work from life. Two work from photographs. One works from memory. You can tell which is which after looking for a while, but not in the way you'd expect — the memory paintings are the most specific.\n\nThe conversations at the end of the piece are worth the read on their own. Painters are usually careful in interviews. These were not. Somebody said something on the record about their own work that I've been thinking about for weeks.",
    artist: "A. Petrov",
    artistHandle: "@apetrov",
    readTime: "Long read",
    tag: "Feature",
  },
  {
    id: "9",
    img: art1,
    title: "Color Is a Political Act",
    excerpt: "An interview about pigment, history and choice.",
    body: "We sat down with S. Vance in her Atlantic studio to talk about blue. The conversation went, as these things do, somewhere else: into history, supply chains, and the small daily decisions that make a body of work.\n\nShe grinds most of her own pigments. Not out of purity — she's clear about that — but because she wants to know where the color came from. That knowledge, she says, shows up in the painting whether the viewer sees it or not.\n\nWe talked for two hours and edited it down to forty minutes. What got cut was the technical detail; what stayed was the argument. Color, in her account, is never neutral. Every choice is a small vote for a supplier, a history, a landscape.\n\nI came away from the conversation thinking about my own palette differently. I haven't changed it yet. But I've started asking, when I reach for a tube, where the thing actually comes from. It's a small change, and probably the point.",
    artist: "S. Vance",
    artistHandle: "@svance",
    readTime: "Interview",
    tag: "Interview",
  },
  {
    id: "10",
    img: gBronze,
    title: "Cast & Counterweight",
    excerpt: "A studio visit with a bronze sculptor.",
    body: "R. Okafor works in a converted garage with two assistants and a kiln older than any of them. We spent a day photographing the casting process, and another day just listening. Both days are in this piece.\n\nThe casting itself is fast. Hours of preparation for a pour that lasts under a minute. Everything about the studio is organized around that minute — the tools laid out, the sand packed, the assistants where they need to be without a word. It's the closest thing to choreography I've seen outside a stage.\n\nWhat stayed with me was the waiting. Bronze takes its own time to cool, and there's nothing you can do to hurry it. R. sits with the cast. Not out of superstition; out of a discipline I'm not sure I have. 'You made a decision,' he said. 'Now you keep it company.'\n\nThe finished pieces are quieter than you'd expect from the process. Small forms, patinated dark, the seams left visible. If you didn't know how they were made, you'd underestimate them. Once you know, they're impossible to walk past.",
    artist: "R. Okafor",
    artistHandle: "@rokafor",
    readTime: "Studio visit",
    tag: "Feature",
  },
  {
    id: "11",
    img: gFigure,
    title: "Figure, Slowly",
    excerpt: "Notes on a year spent painting the same model.",
    body: "One model, one room, one afternoon a week, for a year. The paintings got worse before they got better, and then they got strange. This post is a selection — twelve canvases out of forty-eight — with what I remember thinking at the time.\n\nThe first two months I was still painting from habit. Then a stretch where nothing worked, and I couldn't tell if the problem was me, the light, or the model getting bored. Probably all three. I kept showing up anyway, which turned out to be the whole assignment.\n\nAround month six something opened up. Not skill exactly — more like permission. I stopped trying to make each painting count and started letting the sequence do the work. A weak painting on Wednesday made a stronger one possible the following week.\n\nBy the end I wasn't painting the model, really. I was painting a room I had spent a year in, with a person I had spent a year looking at. The pictures are quieter than my usual work. I think that's the year showing up.",
    artist: "L. Marin",
    artistHandle: "@lmarin",
    readTime: "8 min read",
    tag: "Blog",
  },
];

function TagPill({ tag }: { tag: Post["tag"] }) {
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

function PostCard({ post, onOpen }: { post: Post; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="card-surface text-left overflow-hidden group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3"><TagPill tag={post.tag} /></div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold leading-snug">{post.title}</h3>
        <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)] line-clamp-2">{post.excerpt}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-muted-foreground)]">
          <span>By {post.artist}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </button>
  );
}

type Comment = { id: string; user_id: string; body: string; created_at: string };

function PostDialog({ post, onClose }: { post: Post; onClose: () => void }) {
  const { user, openAuth } = useAuth();
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");
  const [posting, setPosting] = useState(false);
  const [imgOpen, setImgOpen] = useState(false);

  useEffect(() => {
    if (!user) { setLikeCount(0); setComments([]); setLiked(false); return; }
    let cancel = false;
    (async () => {
      const [{ count }, { data: cm }, likedRes] = await Promise.all([
        supabase.from("blog_likes").select("*", { count: "exact", head: true }).eq("post_id", post.id),
        supabase.from("blog_comments").select("id,user_id,body,created_at").eq("post_id", post.id).order("created_at", { ascending: false }),
        supabase.from("blog_likes").select("post_id").eq("post_id", post.id).eq("user_id", user.id).maybeSingle(),
      ]);
      if (cancel) return;
      setLikeCount(count ?? 0);
      setComments((cm as Comment[]) ?? []);
      setLiked(!!(likedRes as any)?.data);
    })();
    return () => { cancel = true; };
  }, [post.id, user?.id]);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({ title: post.title, text: post.excerpt, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch { /* dismissed */ }
  };

  const onFollow = () => {
    setFollowing((v) => !v);
    toast.success(following ? `Unfollowed ${post.artist}` : `Following ${post.artist}`);
  };

  const onLike = async () => {
    if (!user) { openAuth("signin"); return; }
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));
    const { error } = next
      ? await supabase.from("blog_likes").insert({ post_id: post.id, user_id: user.id })
      : await supabase.from("blog_likes").delete().eq("post_id", post.id).eq("user_id", user.id);
    if (error) {
      setLiked(!next);
      setLikeCount((c) => c + (next ? -1 : 1));
      toast.error(error.message);
    }
  };

  const onComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuth("signin"); return; }
    const body = draft.trim();
    if (!body) return;
    setPosting(true);
    const { data, error } = await supabase
      .from("blog_comments")
      .insert({ post_id: post.id, user_id: user.id, body })
      .select("id,user_id,body,created_at")
      .single();
    setPosting(false);
    if (error) { toast.error(error.message); return; }
    setComments((cs) => [data as Comment, ...cs]);
    setDraft("");
  };

  const onDeleteComment = async (id: string) => {
    const prev = comments;
    setComments((cs) => cs.filter((c) => c.id !== id));
    const { error } = await supabase.from("blog_comments").delete().eq("id", id);
    if (error) { setComments(prev); toast.error(error.message); }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-stretch sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 animate-fade-in" onClick={onClose} />
      <div
        className="relative z-10 w-full sm:max-w-2xl sm:rounded-xl border overflow-hidden animate-fade-up flex flex-col max-h-full sm:max-h-[90vh]"
        style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}
      >
        <div className="relative group cursor-pointer" onClick={() => setImgOpen(true)}>
          <img src={post.img} alt={post.title} className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-white/15 backdrop-blur-sm p-2.5 text-white">
              <Expand className="h-5 w-5" />
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
            className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-lg bg-black/50 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute top-3 left-3"><TagPill tag={post.tag} /></div>
        </div>
        {imgOpen && <Lightbox images={[post.img]} title={post.title} onClose={() => setImgOpen(false)} />}

        <div className="p-5 sm:p-6 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-semibold leading-tight">{post.title}</h2>
          <div className="mt-2 flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
            <span className="font-medium text-[var(--color-foreground)]">{post.artist}</span>
            <span>·</span>
            <span>{post.artistHandle}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed">{post.body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => { if (!user) { openAuth("signin"); return; } onFollow(); }}
              className={following ? "btn btn-ghost inline-flex items-center gap-2" : "btn btn-cta inline-flex items-center gap-2"}
            >
              {following ? <><UserCheck className="h-4 w-4" /> Following</> : <><UserPlus className="h-4 w-4" /> Follow {post.artist}</>}
            </button>
            <button onClick={onShare} className="btn btn-ghost inline-flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share
            </button>
            {user && (
              <>
                <button onClick={onLike} className="btn btn-ghost inline-flex items-center gap-2" aria-pressed={liked}>
                  <Heart className={liked ? "h-4 w-4 fill-current text-[var(--color-accent)]" : "h-4 w-4"} />
                  {likeCount}
                </button>
                <span className="btn btn-ghost inline-flex items-center gap-2 pointer-events-none">
                  <MessageCircle className="h-4 w-4" /> {comments.length}
                </span>
              </>
            )}
          </div>

          <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
            <h3 className="text-sm font-semibold mb-3">Comments</h3>
            {!user ? (
              <div className="rounded-lg border p-5 text-center" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                  Sign in to like this post and read or write comments.
                </p>
                <button onClick={() => openAuth("signin")} className="btn btn-cta px-4 py-1.5 text-sm">
                  Sign in
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={onComment} className="flex flex-col gap-2 mb-4">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Share your thoughts…"
                    disabled={posting}
                    rows={2}
                    maxLength={2000}
                    className="w-full rounded-lg border px-3 py-2 text-sm bg-[var(--color-surface)] resize-none focus:outline-none focus:border-[var(--color-accent)]"
                    style={{ borderColor: "var(--color-border)" }}
                  />
                  <div className="flex justify-end">
                    <button type="submit" disabled={!draft.trim() || posting} className="btn btn-cta px-4 py-1.5 text-sm">
                      {posting ? "Posting…" : "Post comment"}
                    </button>
                  </div>
                </form>

                {comments.length === 0 ? (
                  <p className="text-sm text-[var(--color-muted-foreground)]">No comments yet — be the first.</p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {comments.map((c) => (
                      <li key={c.id} className="rounded-lg border p-3" style={{ borderColor: "var(--color-border)" }}>
                        <div className="flex items-center justify-between text-xs text-[var(--color-muted-foreground)] mb-1">
                          <span className="font-mono">{c.user_id.slice(0, 8)}</span>
                          <span>{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{c.body}</p>
                        {user.id === c.user_id && (
                          <button onClick={() => onDeleteComment(c.id)} className="mt-2 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)]">
                            Delete
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogsPage() {
  const [active, setActive] = useState<Post | null>(null);
  const [filter, setFilter] = useState<"All" | Post["tag"]>("All");

  const tags: ("All" | Post["tag"])[] = ["All", "Blog", "Essay", "Process", "Photo", "Feature", "Interview", "Cover"];
  const list = filter === "All" ? POSTS : POSTS.filter((p) => p.tag === filter);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Blogs & Magazine"
        icon={BookOpen}
        title={<>Stories from artists about <span className="text-[var(--color-accent)]">their work</span>.</>}
        description="Long-form notes, studio visits and magazine features — written by the artists making the work, and the editors who follow them."
      />

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-3 py-1.5 rounded-full text-sm border transition-colors"
              style={{
                borderColor: "var(--color-border)",
                background: filter === t ? "var(--color-accent)" : "var(--color-surface)",
                color: filter === t ? "#fff" : "var(--color-foreground)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => (
            <PostCard key={p.id} post={p} onOpen={() => setActive(p)} />
          ))}
        </div>
      </section>

      {active && <PostDialog post={active} onClose={() => setActive(null)} />}

      <Footer />
      <ScrollToTop />
    </div>
  );
}
