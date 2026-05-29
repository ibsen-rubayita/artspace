export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-muted-foreground)]">
        <div>© {new Date().getFullYear()} ArtSpace. A community for artists, studios & collectors.</div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-[var(--color-foreground)]">Terms</a>
          <a href="#" className="hover:text-[var(--color-foreground)]">Privacy</a>
          <a href="#" className="hover:text-[var(--color-foreground)]">Contact</a>
        </div>
      </div>
    </footer>
  );
}
