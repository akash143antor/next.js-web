'use client';
import { useEffect, useRef } from 'react';

export default function AnimatedBackground({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let time = 0;
    function animate() {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        let cy = p.y - (time * p.speed) % 1;
        if (cy < 0) cy += 1;

        const sx = p.x * canvas.width;
        const sy = cy * canvas.height;
        const twinkle = Math.abs(Math.sin(time * 5 + p.x * 100));

        ctx.beginPath();
        ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity * twinkle})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="animated-bg">
      <canvas ref={canvasRef} className="particles-canvas" />
      <div className="content-layer">{children}</div>
    </div>
  );
}
