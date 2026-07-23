import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let raf = 0;
    let stars = [];
    let meteors = [];
    let w = 0;
    let h = 0;
    let nextMeteorAt = 0;

    const STAR_COLORS = [
      "255, 255, 255",
      "190, 215, 255",
      "150, 200, 255",
      "160, 235, 235",
    ];

    function init() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(240, Math.round((w * h) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.2,
        c: STAR_COLORS[(Math.random() * STAR_COLORS.length) | 0],
        base: 0.25 + Math.random() * 0.5,
        amp: 0.15 + Math.random() * 0.35,
        ph: Math.random() * Math.PI * 2,
        sp: 0.3 + Math.random() * 1.1,
        vx: 0.04 + Math.random() * 0.05,
      }));
      meteors = [];
    }

    function spawnMeteor(t) {
      meteors.push({
        x: w * 0.25 + Math.random() * w * 0.75,
        y: -20,
        vx: -(2.5 + Math.random() * 3),
        vy: 2 + Math.random() * 2.5,
        life: 0,
        maxLife: 90 + Math.random() * 50,
      });
      nextMeteorAt = t + 5000 + Math.random() * 8000;
    }

    function drawStars(alphaAt) {
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + s.c + ", " + alphaAt(s) + ")";
        ctx.fill();
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const ts = t / 1000;
      drawStars((s) => {
        const a = s.base + Math.sin(s.ph + ts * s.sp) * s.amp;
        return Math.max(0.05, Math.min(1, a));
      });
      for (const s of stars) {
        s.x -= s.vx;
        if (s.x < -2) {
          s.x = w + 2;
          s.y = Math.random() * h;
        }
      }
      if (t > nextMeteorAt) spawnMeteor(t);
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life++;
        const k = 1 - m.life / m.maxLife;
        if (k <= 0 || m.x < -100 || m.y > h + 100) {
          meteors.splice(i, 1);
          continue;
        }
        const tail = 14;
        const tx = m.x - m.vx * tail;
        const ty = m.y - m.vy * tail;
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, "rgba(200, 225, 255, " + 0.8 * k + ")");
        grad.addColorStop(1, "rgba(200, 225, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      drawStars((s) => s.base);
    }

    function onResize() {
      init();
      if (reduceMotion) drawStatic();
    }

    init();
    if (reduceMotion) {
      drawStatic();
    } else {
      nextMeteorAt = performance.now() + 3000;
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="space-bg" aria-hidden="true">
      <div className="space-nebula" />
      <canvas ref={canvasRef} className="space-canvas" />
    </div>
  );
}
