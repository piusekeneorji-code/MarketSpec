import React, { useEffect, useRef } from 'react';

interface SpatialSphereCanvasProps {
  className?: string;
}

export const SpatialSphereCanvas: React.FC<SpatialSphereCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0.2;
    let rotY = 0.4;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x;
      mouseY = y;
      targetRotY = mouseX * 0.8;
      targetRotX = -mouseY * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate sphere points
    const POINT_COUNT = 320;
    const points: Array<{ x: number; y: number; z: number; size: number }> = [];
    const radius = Math.min(width, height) * 0.36;

    for (let i = 0; i < POINT_COUNT; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      points.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        size: Math.random() * 1.6 + 0.8,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05 + 0.003;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Soft volumetric atmospheric glow behind the sphere
      const gradient = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.4);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.22)');
      gradient.addColorStop(0.5, 'rgba(30, 58, 138, 0.12)');
      gradient.addColorStop(0.8, 'rgba(245, 158, 11, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw dimensional latitude rings
      const ringCount = 5;
      for (let r = 0; r < ringCount; r++) {
        const ringY = ((r - (ringCount - 1) / 2) / (ringCount / 2)) * (radius * 0.7);
        const ringR = Math.sqrt(Math.max(0, radius * radius - ringY * ringY));

        ctx.beginPath();
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const px = ringR * Math.cos(a);
          const py = ringY;
          const pz = ringR * Math.sin(a);

          // Rotate around Y
          const cosY = Math.cos(rotY);
          const sinY = Math.sin(rotY);
          const x1 = px * cosY + pz * sinY;
          const z1 = -px * sinY + pz * cosY;

          // Rotate around X
          const cosX = Math.cos(rotX);
          const sinX = Math.sin(rotX);
          const y2 = py * cosX - z1 * sinX;
          const z2 = py * sinX + z1 * cosX;

          const fov = 400;
          const scale = fov / (fov + z2);
          const screenX = cx + x1 * scale;
          const screenY = cy + y2 * scale;

          if (s === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.strokeStyle = `rgba(147, 197, 253, ${0.1 + (r % 2) * 0.08})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw rotated points
      points.forEach((p) => {
        // Rotate around Y
        const cosY = Math.cos(rotY + time * 0.2);
        const sinY = Math.sin(rotY + time * 0.2);
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Depth perspective projection
        const fov = 400;
        const scale = fov / (fov + z2);
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;

        // Depth lighting and color blending
        const alpha = Math.max(0.08, Math.min(0.95, (z2 + radius) / (2 * radius)));
        const isHighlight = z2 > 0 && Math.sin(p.x * 0.05 + time) > 0.5;

        ctx.fillStyle = isHighlight
          ? `rgba(251, 191, 36, ${alpha * 0.9})` // warm amber accent
          : `rgba(191, 219, 254, ${alpha * 0.75})`; // cyan/blue crystal accent

        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size * scale * (isHighlight ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fill();
      });

      // Front rim lighting curve
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={`block w-full h-full pointer-events-none ${className}`} />;
};
