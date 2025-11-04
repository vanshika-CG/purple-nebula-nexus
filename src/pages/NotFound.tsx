import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LightRays from "@/components/LightRays";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-background text-foreground">
      {/* Decorative blurred orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full gradient-nebula blur-3xl opacity-40" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full gradient-nebula blur-3xl opacity-30" />

      {/* Light rays background */}
      <LightRays className="fixed inset-0 opacity-60 -z-9" raysOrigin="top-center" raysSpeed={0.8} rayLength={1.8} fadeDistance={1.2} saturation={0.9} />

      <section className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex select-none items-center justify-center rounded-2xl glass-effect px-6 py-2 text-sm text-foreground/80 smooth-transition mb-6 animate-fade-in-scale" style={{ animationDelay: '0ms' }}>
          <span className="mr-2 h-2 w-2 rounded-full bg-[hsl(var(--accent))] animate-pulse" />
          Lost in the Nebula
        </div>

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-extrabold gradient-text tracking-tight drop-shadow-md animate-fade-in-up">
          404
        </h1>

        <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground mx-auto animate-fade-in-up" style={{ animationDelay: '120ms' }}>
          The constellation you’re looking for doesn’t exist. The coordinates might be outdated or the star has faded.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '220ms' }}>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium gradient-nebula text-foreground shadow-md glow-effect smooth-transition hover:opacity-90"
          >
            Return Home
          </Link>
          <Link
            to="/#projects"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium glass-effect text-foreground hover:glass-effect-dark smooth-transition"
          >
            Explore Projects
          </Link>
        </div>

        {/* Floating decorative elements */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[12%] top-[30%] h-3 w-3 rounded-full bg-[hsl(var(--lavender))] opacity-70 animate-float" />
          <div className="absolute right-[18%] top-[40%] h-2 w-2 rounded-full bg-[hsl(var(--accent))] opacity-70 animate-float" style={{ animationDelay: '0.8s' }} />
          <div className="absolute right-[30%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-[hsl(var(--secondary))] opacity-70 animate-float" style={{ animationDelay: '1.4s' }} />
        </div>
      </section>
    </main>
  );
};

export default NotFound;
