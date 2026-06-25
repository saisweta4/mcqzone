import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container-custom flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-dark">MCQZone</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground">
          <Link href="#" className="hover:text-primary transition-colors">Mock Tests</Link>
          <Link href="#" className="hover:text-primary transition-colors">Study Plan</Link>
          <Link href="#" className="hover:text-primary transition-colors">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium hover:text-primary">Log in</button>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}