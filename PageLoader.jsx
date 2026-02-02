import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Ensure loader hides after max time
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-luxury-black flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="relative mb-8">
        <h1 className="font-heading font-black text-6xl md:text-7xl text-gradient animate-pulse-glow">
          LUXE
        </h1>
        <div className="absolute -inset-4 bg-accent-cyan/20 blur-3xl rounded-full animate-pulse-glow" />
      </div>

      {/* Loading Bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-text-muted text-sm tracking-widest uppercase">
        Loading Experience
      </p>

      {/* Percentage */}
      <p className="mt-2 text-accent-cyan font-mono text-lg">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}
