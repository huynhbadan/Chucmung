import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swingAngle: number;
  swingSpeed: number;
  swingDistance: number;
  color: string;
  opacity: number;
}

export const FallingPetals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = [
      'rgba(244, 63, 94, 0.75)',   // rose-500
      'rgba(251, 113, 133, 0.8)',  // rose-400
      'rgba(248, 113, 113, 0.75)', // red-400
      'rgba(254, 205, 211, 0.85)', // rose-200
      'rgba(225, 29, 72, 0.7)',    // rose-600
      'rgba(253, 164, 175, 0.8)',  // rose-300
    ];

    // Responsive petal count: fewer on small screens for silky 60fps
    const petalCount = window.innerWidth < 768 ? 22 : 38;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 9,
        speedY: Math.random() * 1.0 + 0.8,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        swingAngle: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.015,
        swingDistance: Math.random() * 1.5 + 0.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.4 + 0.5,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.swingAngle * 0.5), 1); // 3D flipping illusion

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      // Draw curved rose petal shape
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(
        p.size * 0.75,
        -p.size * 0.8,
        p.size * 0.85,
        p.size * 0.3,
        0,
        p.size
      );
      ctx.bezierCurveTo(
        -p.size * 0.85,
        p.size * 0.3,
        -p.size * 0.75,
        -p.size * 0.8,
        0,
        -p.size
      );
      ctx.fill();

      // Subtle petal vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.quadraticCurveTo(p.size * 0.1, 0, 0, p.size * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swingAngle += p.swingSpeed;
        p.x += Math.sin(p.swingAngle) * p.swingDistance + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) {
          p.x = -25;
        } else if (p.x < -25) {
          p.x = width + 25;
        }

        drawPetal(p);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
