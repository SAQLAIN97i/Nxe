import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Create particles
    const particleCount = 25;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(11, 11, 15, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Draw gradient orbs
        const time = Date.now() * 0.0003;
        
        // Cyan orb
        const cyanX = width * 0.7 + Math.sin(time) * 100;
        const cyanY = height * 0.3 + Math.cos(time * 0.7) * 50;
        const cyanGradient = ctx.createRadialGradient(cyanX, cyanY, 0, cyanX, cyanY, 400);
        cyanGradient.addColorStop(0, 'rgba(0, 240, 255, 0.08)');
        cyanGradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.02)');
        cyanGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = cyanGradient;
        ctx.fillRect(0, 0, width, height);

        // Purple orb
        const purpleX = width * 0.2 + Math.cos(time * 0.8) * 80;
        const purpleY = height * 0.6 + Math.sin(time * 0.5) * 60;
        const purpleGradient = ctx.createRadialGradient(purpleX, purpleY, 0, purpleX, purpleY, 350);
        purpleGradient.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
        purpleGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
        purpleGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = purpleGradient;
        ctx.fillRect(0, 0, width, height);

        // Pink orb
        const pinkX = width * 0.5 + Math.sin(time * 0.6) * 120;
        const pinkY = height * 0.8 + Math.cos(time * 0.4) * 40;
        const pinkGradient = ctx.createRadialGradient(pinkX, pinkY, 0, pinkX, pinkY, 300);
        pinkGradient.addColorStop(0, 'rgba(236, 72, 153, 0.05)');
        pinkGradient.addColorStop(0.5, 'rgba(236, 72, 153, 0.01)');
        pinkGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = pinkGradient;
        ctx.fillRect(0, 0, width, height);

        // Draw particles
        particlesRef.current.forEach((particle) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${particle.opacity * 0.3})`;
          ctx.fill();
        });

        // Draw connecting lines
        particlesRef.current.forEach((p1, i) => {
          particlesRef.current.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 240, 255, ${0.05 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0b0b0f 0%, #111118 50%, #0b0b0f 100%)' }}
    />
  );
}
