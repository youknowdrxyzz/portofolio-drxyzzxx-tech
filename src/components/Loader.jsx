import { useState, useEffect, useRef } from "react";

export default function Loader(props) {
  const onDone = props.onDone;
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("intro");
  const [exiting, setExiting] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const introT = setTimeout(() => setPhase("loading"), 150);
    return () => clearTimeout(introT);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    let raf;
    const start = performance.now();
    const TOTAL = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / TOTAL);
      const eased = 1 - Math.pow(1 - t, 2.2);
      const p = Math.min(100, Math.round(eased * 100));
      setProgress(p);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setPhase("reveal"), 100);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t1 = setTimeout(() => setExiting(true), 450);
    const t2 = setTimeout(() => onDone && onDone(), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [phase, onDone]);

  const skip = () => {
    if (phase === "exit") return;
    setProgress(100);
    setExiting(true);
    setPhase("exit");
    setTimeout(() => onDone && onDone(), 750);
  };

  const status =
    progress < 30
      ? "Initializing"
      : progress < 65
      ? "Loading assets"
      : progress < 95
      ? "Preparing surfaces"
      : "Almost ready";

  return (
    <div
      className={"loader2" + (exiting ? " hide" : "")}
      ref={wrapRef}
      onClick={skip}
      role="button"
      aria-label="Loading, click to skip"
    >
      <div className="ls-glow" />
      <div className="ls-ring ls-ring-1" />
      <div className="ls-ring ls-ring-2" />
      <div className="ls-ring ls-ring-3" />
      <div className="ls-logo-wrap">
        <div className="ls-logo-icon">
          <img
            src="/assets/wijaya pictures2.png"
            alt="Drxyzzxx Tech logo"
            className="ls-logo-img"
            width={200}
            height={200}
            decoding="sync"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="ls-logo-text">
          Drxyzzxx Tech<span className="ls-dot">.</span>
        </div>
        <div className="ls-tagline">Blockchain · Smart Contract · Web3 · Solidity</div>
      </div>
      <div className="ls-progress-wrap">
        <div className="ls-progress-track">
          <div className="ls-progress-bar" style={{ width: progress + "%" }} />
        </div>
        <div className="ls-progress-info">
          <span className="ls-status">{status}</span>
          <span className="ls-pct">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
