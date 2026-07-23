import { useState, useEffect, useRef } from "react";

export default function SkillPanel() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [bursts, setBursts] = useState([]);
  const burstSeq = useRef(0);
  const orbRefs = useRef({});
  const bounceRAF = useRef({});

  const spawnBurst = (idx, ev) => {
    const id = ++burstSeq.current;
    let ox = 30,
      oy = 32;
    const node = ev && ev.currentTarget;
    const rect = node && node.getBoundingClientRect();
    if (rect) {
      ox = ev.clientX - rect.left;
      oy = ev.clientY - rect.top;
    }
    // Bounce via an interruptible CSS transition instead of the Web
    // Animations API. The WAAP version had to cancel + restart on each
    // click, and when it ended it handed the transform back to the .active
    // CSS rule whose own `transition: transform` then re-animated from the
    // last WAAP value, and that double-animation was the visible "break" on
    // the way back to rest. Here we own the transform inline (lift + scale
    // together, so it never fights the .active translateY) and just flip
    // the scale: the browser's transition engine blends from whatever the
    // current rendered scale is, so rapid clicks and the return to scale(1)
    // are continuous with no snap.
    const orbEl = orbRefs.current[idx] || node;
    if (orbEl) {
      const lift = hovered && activeIdx === idx ? -2 : 0;
      const set = (sc) => {
        orbEl.style.transform =
          "translateY(" + lift + "px) scale(" + sc + ")";
      };
      const b = bounceRAF.current[idx] || {};
      if (b.raf) cancelAnimationFrame(b.raf);
      if (b.timer) clearTimeout(b.timer);
      // Press down. The CSS transition eases from the current rendered
      // scale to the dip, so a click mid-bounce blends instead of snapping.
      set(0.94);
      // Hold the dip briefly so the press is felt, then release to 1 and
      // let the same eased transition carry it home: one continuous curve
      // back to rest, no second animation, no break.
      const timer = setTimeout(() => {
        set(1);
        bounceRAF.current[idx] = null;
      }, 120);
      bounceRAF.current[idx] = { timer };
    }
    const n = 14;
    const parts = [];
    for (let p = 0; p < n; p++) {
      const ang = (Math.PI * 2 * p) / n + (Math.random() - 0.5) * 0.5;
      const dist = 26 + Math.random() * 30;
      parts.push({
        tx: Math.cos(ang) * dist,
        ty: Math.sin(ang) * dist,
        sz: 4 + Math.random() * 5,
        dur: 0.5 + Math.random() * 0.35,
        delay: Math.random() * 0.06,
      });
    }
    setBursts((b) => b.concat([{ id, idx, x: ox, y: oy, parts }]));
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
    }, 1000);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      Object.values(bounceRAF.current).forEach((b) => {
        if (b && b.timer) clearTimeout(b.timer);
        if (b && b.raf) cancelAnimationFrame(b.raf);
      });
    };
  }, []);

  const skills = [
    { icon: "🧊", name: "Blockchain Dev", pct: 92 },
    { icon: "📜", name: "Smart Contracts", pct: 90 },
    { icon: "🌐", name: "Web3 Dev", pct: 88 },
    { icon: "🛡️", name: "Solidity Security", pct: 85 },
  ];

  const WAVE_COUNT = 22;
  const seed = activeIdx * 7 + 3;
  const waveBars = [];
  for (let i = 0; i < WAVE_COUNT; i++) {
    const x = Math.sin((i + seed) * 0.7) * 0.5 + 0.5;
    const y = Math.cos((i + seed) * 0.3) * 0.3 + 0.5;
    const bh = Math.max(4, Math.round((x * 0.6 + y * 0.4) * 22 + 4));
    const dur = 0.55 + ((i + seed) % 5) * 0.13;
    const delay = (i % 7) * 0.06;
    waveBars.push({ h: bh, dur, delay });
  }

  const playHoverTone = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!window.__skillAC) window.__skillAC = new AC();
      const ctx = window.__skillAC;
      if (ctx.state === "suspended") ctx.resume();
      const t = ctx.currentTime;
      const dur = 0.34;

      const carrier = ctx.createOscillator();
      const harmonic = ctx.createOscillator();
      const modulator = ctx.createOscillator();
      const modGain = ctx.createGain();
      const hGain = ctx.createGain();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      carrier.type = "sine";
      harmonic.type = "sine";
      modulator.type = "sine";

      carrier.frequency.setValueAtTime(660, t);
      carrier.frequency.exponentialRampToValueAtTime(1180, t + 0.16);
      harmonic.frequency.setValueAtTime(1322, t);
      harmonic.frequency.exponentialRampToValueAtTime(2364, t + 0.16);

      modulator.frequency.setValueAtTime(70, t);
      modGain.gain.setValueAtTime(40, t);
      modGain.gain.exponentialRampToValueAtTime(8, t + dur);
      modulator.connect(modGain);
      modGain.connect(carrier.frequency);

      filter.type = "lowpass";
      filter.Q.setValueAtTime(0.8, t);
      filter.frequency.setValueAtTime(2400, t);
      filter.frequency.exponentialRampToValueAtTime(5200, t + 0.14);

      hGain.gain.setValueAtTime(0.045, t);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.11, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      carrier.connect(filter);
      harmonic.connect(hGain);
      hGain.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      carrier.start(t);
      harmonic.start(t);
      modulator.start(t);
      carrier.stop(t + dur);
      harmonic.stop(t + dur);
      modulator.stop(t + dur);
    } catch (e) {}
  };

  const playShotTone = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!window.__skillAC) window.__skillAC = new AC();
      const ctx = window.__skillAC;
      if (ctx.state === "suspended") ctx.resume();
      const t = ctx.currentTime;
      const dur = 0.26;

      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      sub.type = "triangle";

      osc.frequency.setValueAtTime(1500, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.2);
      sub.frequency.setValueAtTime(750, t);
      sub.frequency.exponentialRampToValueAtTime(150, t + 0.2);

      filter.type = "lowpass";
      filter.Q.setValueAtTime(1, t);
      filter.frequency.setValueAtTime(3600, t);
      filter.frequency.exponentialRampToValueAtTime(800, t + 0.22);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(filter);
      sub.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      sub.start(t);
      osc.stop(t + dur);
      sub.stop(t + dur);
    } catch (e) {}
  };

  return (
    <div className="skill-panel" ref={ref}>
      <div className="skill-panel-bg" />
      <div className="skill-panel-head">
        <div className="skill-panel-title">
          <span className="skill-panel-title-dot" />
          SKILL STACK
        </div>
        <div className="skill-panel-badge">
          <span className="skill-panel-badge-icon" aria-hidden="true">
            🔊
          </span>
          Hover to explore
        </div>
      </div>
      <div
        className="skill-orbs"
        onMouseLeave={() => setHovered(false)}
      >
        {skills.map((s, i) => {
          const orbBursts = bursts.filter((b) => b.idx === i);
          return (
            <button
              key={s.name}
              ref={(el) => {
                if (el) orbRefs.current[i] = el;
              }}
              className={
                "skill-orb" +
                (hovered && activeIdx === i ? " active" : "") +
                (orbBursts.length ? " bursting" : "")
              }
              style={{
                transform:
                  "translateY(" +
                  (hovered && activeIdx === i ? -2 : 0) +
                  "px) scale(1)",
              }}
              onMouseEnter={() => {
                setActiveIdx(i);
                setHovered(true);
                playHoverTone();
              }}
              onFocus={() => {
                setActiveIdx(i);
                setHovered(true);
              }}
              onBlur={() => setHovered(false)}
              onClick={(ev) => {
                spawnBurst(i, ev);
                playShotTone();
              }}
            >
              {orbBursts.map((b) => (
                <span
                  key={b.id}
                  className="skill-burst"
                  style={{ left: b.x + "px", top: b.y + "px" }}
                >
                  {b.parts.map((pt, pi) => (
                    <span
                      key={pi}
                      className="skill-burst-dot"
                      style={{
                        "--tx": pt.tx + "px",
                        "--ty": pt.ty + "px",
                        width: pt.sz + "px",
                        height: pt.sz + "px",
                        animationDuration: pt.dur + "s",
                        animationDelay: pt.delay + "s",
                      }}
                    />
                  ))}
                </span>
              ))}
              <span className="skill-orb-icon">{s.icon}</span>
              <div className="skill-orb-name">{s.name}</div>
              <div className="skill-orb-bar">
                <div
                  className="skill-orb-fill"
                  style={{
                    width: shown ? s.pct + "%" : "0%",
                    transitionDelay: i * 0.08 + "s",
                  }}
                />
              </div>
              <div className="skill-orb-pct">
                <span className="skill-orb-pct-val">{s.pct}%</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="skill-panel-foot">
        <div className="skill-panel-foot-label">Activity</div>
        <div className="skill-waveform" key={activeIdx}>
          {waveBars.map((b, i) => (
            <span
              key={i}
              className="wave-bar"
              style={{
                "--h": b.h + "px",
                "--dur": b.dur + "s",
                animationDelay: b.delay + "s",
              }}
            />
          ))}
        </div>
        <div className="skill-panel-foot-pct">
          <span style={{ fontVariantNumeric: "tabular-nums" }}>
            {skills[activeIdx].pct}
          </span>
          <span style={{ color: "var(--fg-muted)" }}>%</span>
        </div>
      </div>
    </div>
  );
}
