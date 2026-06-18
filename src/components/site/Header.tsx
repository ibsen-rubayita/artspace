import { Link } from "@tanstack/react-router";
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Compass,
  GraduationCap,
  ShoppingBag,
  Network as NetworkIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { GlobalSearch } from "@/components/site/GlobalSearch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SubLink = { label: string; to: string; badge?: "SALE" | "NEW" };
type NavItem = { label: string; to: string; icon: React.ElementType; items: SubLink[] };

const NAV: NavItem[] = [
  {
    label: "Explore",
    to: "/explore",
    icon: Compass,
    items: [
      { label: "Gallery", to: "/gallery" },
      { label: "Blogs & Magazine", to: "/blogs" },
    ],
  },
  {
    label: "Learning",
    to: "/learning",
    icon: GraduationCap,
    items: [
      { label: "Online Courses", to: "/learn" },
      { label: "Schools & Training", to: "/schools" },
    ],
  },
  {
    label: "Shop",
    to: "/tools",
    icon: ShoppingBag,
    items: [
      { label: "Tools", to: "/tools", badge: "SALE" },
      { label: "Arts Sales", to: "/arts", badge: "NEW" },
    ],
  },
  {
    label: "Network",
    to: "/network",
    icon: NetworkIcon,
    items: [
      { label: "Jobs", to: "/jobs" },
      { label: "Hiring", to: "/hire" },
    ],
  },
];

function BadgePill({ kind }: { kind: "SALE" | "NEW" }) {
  return (
    <span
      style={{
        background: kind === "SALE" ? "var(--color-badge-sale)" : "var(--color-badge-new)",
        color: "#fff",
        fontSize: "0.6rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        padding: "0.1rem 0.45rem",
        borderRadius: 999,
        textTransform: "uppercase",
      }}
    >
      {kind}
    </span>
  );
}

function Logo() {
  return (
    <Link to="/" className="select-none text-[1.15rem] font-semibold tracking-tight leading-none" style={{ color: "var(--color-foreground)" }}>
      Art<span style={{ color: "var(--color-accent)" }}>Space</span>
    </Link>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const onEnter = () => { if (timer.current) clearTimeout(timer.current); setOpen(true); };
  const onLeave = () => { timer.current = window.setTimeout(() => setOpen(false), 120); };
  const Icon = item.icon;

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        to={item.to}
        className="inline-flex items-center gap-1 text-sm px-2 py-2"
        style={{ color: "var(--color-foreground)", opacity: 0.85 }}
        activeProps={{ style: { color: "var(--color-accent)", opacity: 1 } }}
      >
        <Icon className="h-3.5 w-3.5" />
        {item.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </Link>
      {open && (
        <div
          className="absolute left-0 top-full mt-2 min-w-[220px] py-2 z-50 rounded-lg border"
          style={{ background: "var(--color-popover)", borderColor: "var(--color-border)", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.45)" }}
        >
          {item.items.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className="flex items-center justify-between px-3 py-2 text-sm transition-colors"
              style={{ color: "var(--color-foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>{s.label}</span>
              {s.badge && <BadgePill kind={s.badge} />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-10 w-10 grid place-items-center rounded-lg transition-all duration-200"
      style={{ border: "1px solid var(--color-border)", color: "var(--color-foreground)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-surface)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-accent)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = ""; (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)"; }}
    >
      {theme === "dark" ? <Sun className="h-[1.1rem] w-[1.1rem]" /> : <Moon className="h-[1.1rem] w-[1.1rem]" />}
    </button>
  );
}

// ─── SIDEBAR DRAWER ────────────────────────────────────────────────────────────
function MobileDrawer({
  open,
  onClose,
  onOpenSearch,
  onSignIn,
  onSignUp,
  user,
  onSignOut,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  user: ReturnType<typeof useAuth>["user"];
  onSignOut: () => void;
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.65)" }}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside
        className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] flex flex-col animate-drawer"
        style={{
          background: "var(--color-background)",
          borderRight: "1px solid var(--color-border)",
        }}
      >

        {/* ── HEADER: logo + close ── */}
        <div
          className="flex items-center justify-between px-4 h-14 shrink-0"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="h-8 w-8 grid place-items-center rounded-lg transition-colors"
            style={{ color: "var(--color-muted-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── ① SEARCH BAR ── */}
        <div className="px-3 pt-4 pb-3 shrink-0">
          <button
            onClick={() => { onClose(); onOpenSearch(); }}
            className="w-full flex items-center gap-2 h-10 px-3 rounded-lg text-sm transition-colors"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-muted-foreground)",
            }}
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search ArtSpace</span>
            <kbd
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{ border: "1px solid var(--color-border)", background: "var(--color-background)" }}
            >
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Divider */}
        <div className="mx-3 mb-2" style={{ height: 1, background: "var(--color-border)" }} />

        {/* ── ② NAVIGATION LINKS ── */}
        <nav className="flex-1 overflow-y-auto px-3 pb-2">

          <p
            className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            Navigation
          </p>

          {NAV.map((item) => {
            const isOpen = expandedItem === item.label;
            const Icon = item.icon;

            return (
              <div key={item.label} className="mb-1">

                {/* Parent row */}
                <div
                  className="flex items-center rounded-lg overflow-hidden transition-colors"
                  style={{ background: isOpen ? "var(--color-surface)" : "transparent" }}
                  onMouseEnter={(e) => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = "var(--color-surface)"; }}
                  onMouseLeave={(e) => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                >
                  {/* Nav link — explicit foreground color so it's always visible */}
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="flex-1 flex items-center gap-3 px-3 py-2.5 text-sm font-medium"
                    style={{ color: "var(--color-foreground)", textDecoration: "none" }}
                    activeProps={{
                      style: { color: "var(--color-accent)", textDecoration: "none" },
                    }}
                  >
                    <span
                      className="h-8 w-8 rounded-lg grid place-items-center shrink-0"
                      style={{ background: "var(--color-surface-2)", color: "var(--color-accent)" }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {item.label}
                  </Link>

                  {/* Chevron to expand sub-links */}
                  <button
                    onClick={() => setExpandedItem(isOpen ? null : item.label)}
                    aria-label={`Toggle ${item.label}`}
                    className="h-10 w-10 grid place-items-center shrink-0 transition-colors"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200"
                      style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                </div>

                {/* Sub-links */}
                {isOpen && (
                  <div
                    className="ml-11 mr-2 mt-1 mb-1 rounded-lg overflow-hidden"
                    style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
                  >
                    {item.items.map((s) => (
                      <Link
                        key={s.label}
                        to={s.to}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2.5 text-sm transition-colors"
                        style={{ color: "var(--color-foreground)", textDecoration: "none", display: "flex" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span>{s.label}</span>
                        {s.badge && <BadgePill kind={s.badge} />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── ③ SIGN IN — pinned at bottom ── */}
        <div
          className="px-3 py-4 shrink-0"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          {user ? (
            <div className="flex flex-col gap-2">
              {/* Logged in user info */}
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-lg"
                style={{ background: "var(--color-surface)" }}
              >
                <div
                  className="h-8 w-8 rounded-full grid place-items-center text-xs font-semibold text-white shrink-0"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 50%, #000))",
                  }}
                >
                  {(user.user_metadata?.first_name?.[0] ?? user.email?.[0] ?? "A").toUpperCase()}
                </div>
                <span className="text-xs truncate" style={{ color: "var(--color-muted-foreground)" }}>
                  {user.email}
                </span>
              </div>
              <button
                onClick={() => { onClose(); onSignOut(); }}
                className="w-full flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: "var(--color-foreground)",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { onClose(); onSignIn(); }}
                className="w-full h-10 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: "var(--color-foreground)",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Sign in
              </button>
              <button
                onClick={() => { onClose(); onSignUp(); }}
                className="w-full h-10 rounded-lg text-sm font-medium text-white transition-colors"
                style={{ background: "var(--color-cta)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-cta-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-cta)")}
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
// ─── END SIDEBAR ───────────────────────────────────────────────────────────────

function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  if (!user) return null;
  const initials = (user.user_metadata?.first_name?.[0] ?? user.email?.[0] ?? "A").toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 rounded-full grid place-items-center text-sm font-medium text-white"
        style={{
          background: "linear-gradient(135deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 50%, #000))",
        }}
        aria-label="Account menu"
      >
        {initials}
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 min-w-[220px] py-2 z-50 rounded-lg"
          style={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.45)",
          }}
        >
          <div className="px-3 py-2 text-xs truncate" style={{ color: "var(--color-muted-foreground)" }}>
            {user.email}
          </div>
          <div className="my-1 h-px" style={{ background: "var(--color-border)" }} />
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition-colors"
            style={{ color: "var(--color-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <UserIcon className="h-4 w-4" /> Profile
          </Link>
          <button
            onClick={async () => { await signOut(); setOpen(false); toast.success("Signed out"); }}
            className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition-colors"
            style={{ color: "var(--color-foreground)", background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, openAuth, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors"
      style={{
        background: scrolled
          ? "color-mix(in oklab, var(--color-background) 85%, transparent)"
          : "var(--color-background)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 h-14 flex items-center gap-4">

        {/* Hamburger — mobile/tablet only */}
        <button
          onClick={() => setDrawer(true)}
          aria-label="Open menu"
          className="lg:hidden h-9 w-9 grid place-items-center rounded-lg transition-colors -ml-1"
          style={{ color: "var(--color-foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Centered logo on mobile */}
        <div className="flex-1 flex justify-center lg:hidden">
          <Logo />
        </div>

        {/* Desktop: logo + horizontal nav */}
        <div className="hidden lg:flex items-center gap-6">
          <Logo />
          <nav className="flex items-center gap-1">
            {NAV.map((item) => <NavDropdown key={item.label} item={item} />)}
          </nav>
        </div>

        <div className="hidden lg:block flex-1" />

        {/* Desktop: search + auth + theme */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="relative flex items-center h-9 rounded-lg border px-3 text-left transition-colors max-w-[340px]"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-muted-foreground)",
              minWidth: 220,
            }}
            aria-label="Open search"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="px-2 text-sm flex-1">Search ArtSpace</span>
            <kbd
              className="text-[10px] px-1.5 py-0.5 rounded"
              style={{ border: "1px solid var(--color-border)" }}
            >
              ⌘K
            </kbd>
          </button>

          {user ? (
            <UserMenu />
          ) : (
            <>
              <button
                onClick={() => openAuth("signin")}
                className="btn btn-ghost"
                style={{ color: "var(--color-foreground)" }}
              >
                Sign in
              </button>
              <button onClick={() => openAuth("signup")} className="btn btn-cta">
                Sign up
              </button>
            </>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile right: search icon + auth + theme */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="h-9 w-9 grid place-items-center rounded-lg transition-colors"
            style={{ color: "var(--color-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Search className="h-4 w-4" />
          </button>
          {user ? (
            <UserMenu />
          ) : (
            <button
              onClick={() => openAuth("signin")}
              className="btn btn-ghost h-9 px-3 text-xs"
              style={{ color: "var(--color-foreground)" }}
            >
              Sign in
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Sidebar drawer */}
      <MobileDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpenSearch={() => setSearchOpen(true)}
        onSignIn={() => openAuth("signin")}
        onSignUp={() => openAuth("signup")}
        user={user}
        onSignOut={async () => { await signOut(); toast.success("Signed out"); }}
      />

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
