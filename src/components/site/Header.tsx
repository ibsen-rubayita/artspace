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

type SubLink = { label: string; to: string; hash?: string; badge?: "SALE" | "NEW" };
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

function Badge({ kind }: { kind: "SALE" | "NEW" }) {
  return (
    <span
      className="badge ml-2"
      style={{
        background: kind === "SALE" ? "var(--color-badge-sale)" : "var(--color-badge-new)",
        color: "#fff",
      }}
    >
      {kind}
    </span>
  );
}

function Logo() {
  return (
    <Link
      to="/"
      className="select-none text-[1.15rem] font-semibold tracking-tight leading-none"
      aria-label="ArtSpace — home"
    >
      Art<span className="text-[var(--color-accent)]">Space</span>
    </Link>
  );
}

function SubItem({ s, onClick }: { s: SubLink; onClick?: () => void }) {
  return (
    <Link
      to={s.to}
      hash={s.hash}
      onClick={onClick}
      className="flex items-center justify-between px-3 py-2 text-sm hover:bg-[var(--color-surface-2)] transition-colors rounded-md"
    >
      <span>{s.label}</span>
      {s.badge && <Badge kind={s.badge} />}
    </Link>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const onEnter = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(true);
  };
  const onLeave = () => {
    timer.current = window.setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Link
        to={item.to}
        className="nav-link inline-flex items-center gap-1 text-sm px-2 py-2"
        data-open={open}
        activeProps={{ className: "nav-link inline-flex items-center gap-1 text-sm px-2 py-2 !text-[var(--color-accent)] !opacity-100" }}
      >
        {item.label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </Link>
      {open && (
        <div className="dropdown-panel animate-dropdown absolute left-0 top-full mt-2 min-w-[240px] py-2 z-50">
          {item.items.map((s) => <SubItem key={s.label} s={s} />)}
        </div>
      )}
    </div>
  );
}

function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="relative w-full flex items-center h-9 rounded-lg border px-3 bg-[var(--color-surface)] text-left hover:border-[var(--color-accent)] transition-colors"
      style={{ borderColor: "var(--color-border)" }}
      aria-label="Open search"
    >
      <Search className="h-4 w-4 text-[var(--color-muted-foreground)] shrink-0" />
      <span className="px-2 text-sm text-[var(--color-muted-foreground)] flex-1">Search ArtSpace</span>
      <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded border" style={{ borderColor: "var(--color-border)" }}>⌘K</kbd>
    </button>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-10 w-10 grid place-items-center rounded-lg border hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)] transition-all duration-200"
      style={{ borderColor: "var(--color-border)" }}
    >
      {theme === "dark" ? <Sun className="h-[1.15rem] w-[1.15rem]" /> : <Moon className="h-[1.15rem] w-[1.15rem]" />}
    </button>
  );
}

// ─── SIDEBAR DRAWER ────────────────────────────────────────────────────────────
// This is the sidebar that slides in from the left on mobile/tablet.
// Structure: Search bar → Nav links with dropdowns → Sign In at bottom
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
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />

      {/* Sidebar panel */}
      <aside
        className="absolute left-0 top-0 h-full w-[88%] max-w-sm border-r animate-drawer flex flex-col"
        style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}
      >
        {/* Header row: logo + close */}
        <div
          className="flex items-center justify-between px-4 h-14 border-b shrink-0"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="h-9 w-9 grid place-items-center rounded-lg hover:bg-[var(--color-surface)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ① SEARCH BAR — always first */}
        <div className="px-4 pt-4 pb-2 shrink-0">
          <SearchTrigger onOpen={() => { onClose(); onOpenSearch(); }} />
        </div>

        {/* Divider */}
        <div className="mx-4 my-2 h-px" style={{ background: "var(--color-border)" }} />

        {/* ② NAVIGATION LINKS with dropdowns — scrollable middle section */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            Navigation
          </p>
          {NAV.map((item) => {
            const isOpen = openItem === item.label;
            const Icon = item.icon;
            return (
              <div key={item.label} className="mb-1">
                {/* Parent link row */}
                <div className="flex items-center rounded-lg overflow-hidden hover:bg-[var(--color-surface)] transition-colors">
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="flex-1 flex items-center gap-3 px-3 py-2.5 text-sm font-medium"
                    activeProps={{ style: { color: "var(--color-accent)" } }}
                  >
                    <Icon className="h-4 w-4 text-[var(--color-muted-foreground)] shrink-0" />
                    {item.label}
                  </Link>
                  {/* Chevron to expand dropdown */}
                  <button
                    onClick={() => setOpenItem(isOpen ? null : item.label)}
                    aria-label={`Toggle ${item.label} submenu`}
                    className="h-10 w-10 grid place-items-center text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors"
                  >
                    <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                </div>

                {/* Dropdown sub-links */}
                {isOpen && (
                  <div
                    className="ml-10 mr-2 mt-0.5 mb-1 rounded-lg border overflow-hidden"
                    style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                  >
                    {item.items.map((s) => (
                      <SubItem key={s.label} s={s} onClick={onClose} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ③ SIGN IN — pinned at the very bottom */}
        <div
          className="px-4 py-4 border-t shrink-0 flex flex-col gap-2"
          style={{ borderColor: "var(--color-border)" }}
        >
          {user ? (
            <>
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
                style={{ background: "var(--color-surface)" }}
              >
                <div
                  className="h-7 w-7 rounded-full grid place-items-center text-xs font-semibold text-white shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 50%, #000))" }}
                >
                  {(user.user_metadata?.first_name?.[0] ?? user.email?.[0] ?? "A").toUpperCase()}
                </div>
                <span className="truncate text-xs text-[var(--color-muted-foreground)]">{user.email}</span>
              </div>
              <button
                onClick={() => { onClose(); onSignOut(); }}
                className="btn btn-ghost w-full inline-flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { onClose(); onSignIn(); }}
                className="btn btn-ghost w-full"
              >
                Sign in
              </button>
              <button
                onClick={() => { onClose(); onSignUp(); }}
                className="btn btn-cta w-full"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
// ─── END SIDEBAR DRAWER ────────────────────────────────────────────────────────

function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
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
        style={{ background: "linear-gradient(135deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 50%, #000))" }}
        aria-label="Account menu"
      >
        {initials}
      </button>
      {open && (
        <div className="dropdown-panel animate-dropdown absolute right-0 top-full mt-2 min-w-[220px] py-2 z-50">
          <div className="px-3 py-2 text-xs text-[var(--color-muted-foreground)] truncate">{user.email}</div>
          <div className="my-1 h-px bg-[var(--color-border)]" />
          <Link to="/profile" onClick={() => setOpen(false)} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--color-surface-2)]">
            <UserIcon className="h-4 w-4" /> Profile
          </Link>
          <button
            onClick={async () => { await signOut(); setOpen(false); toast.success("Signed out"); }}
            className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--color-surface-2)]"
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
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur-md transition-colors",
        scrolled ? "bg-[color-mix(in_oklab,var(--color-background)_85%,transparent)]" : "bg-[var(--color-background)]"
      )}
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 h-14 flex items-center gap-4">
        {/* Hamburger — opens sidebar on mobile/tablet */}
        <button
          onClick={() => setDrawer(true)}
          aria-label="Open menu"
          className="lg:hidden h-9 w-9 grid place-items-center rounded-lg hover:bg-[var(--color-surface)] -ml-1"
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
          <SearchTrigger onOpen={() => setSearchOpen(true)} />
          {user ? (
            <UserMenu />
          ) : (
            <>
              <button onClick={() => openAuth("signin")} className="btn btn-ghost">Sign in</button>
              <button onClick={() => openAuth("signup")} className="btn btn-cta">Sign up</button>
            </>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile right side: search icon + auth + theme */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="h-9 w-9 grid place-items-center rounded-lg hover:bg-[var(--color-surface)]">
            <Search className="h-4 w-4" />
          </button>
          {user ? (
            <UserMenu />
          ) : (
            <button onClick={() => openAuth("signin")} className="btn btn-ghost h-9 px-3 text-xs">Sign in</button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Sidebar drawer — mobile/tablet only */}
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
