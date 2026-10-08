import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  density?: number;
  glowColor?: string;
  intensity?: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  density = 60,
  glowColor = 'rgba(16, 185, 129,', // emerald
  intensity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      isSpark: boolean;
    }

    const particles: Particle[] = [];
    const count = Math.min(density, 80);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2, // Drifting upwards like Doom's mystic pyre
        alpha: Math.random() * 0.6,
        maxAlpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        isSpark: Math.random() > 0.85,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle radial background atmospheric vignette
      const grad = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        100,
        width / 2,
        height * 0.4,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, `${glowColor} 0.07)`);
      grad.addColorStop(0.5, `${glowColor} 0.02)`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.pulseSpeed;

        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.isSpark ? p.size * 1.5 : p.size, 0, Math.PI * 2);
        
        if (p.isSpark) {
          ctx.fillStyle = `rgba(234, 179, 8, ${p.alpha * intensity * 0.9})`; // Gold spark
        } else {
          ctx.fillStyle = `${glowColor} ${p.alpha * intensity})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, glowColor, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
