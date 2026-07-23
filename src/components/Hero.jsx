import { useState, useEffect, useRef } from "react";
import { useReveal } from "../hooks.js";
import MagneticButton from "./MagneticButton.jsx";
import SkillPanel from "./SkillPanel.jsx";

const HEADLINES = [
  "A Web3 Developer.",
  "Blockchain Development.",
  "Smart Contract Development.",
  "A Solidity Engineer.",
];

const TYPE_MS = 65; // delay between typing each character
const ERASE_MS = 32; // delay between erasing each character
const HOLD_MS = 2000; // pause once the full phrase is typed
const GAP_MS = 350; // pause after erase, before the next phrase

export default function Hero(props) {
  const revealRef = useReveal({ repeat: true, enabled: !props.loading });
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Typewriter: type the phrase one char at a time L→R, hold, erase it
  // back, then move to the next phrase and loop.
  const [idx, setIdx] = useState(0);
  const [count, setCount] = useState(0); // visible char count
  const [typing, setTyping] = useState(true); // true=typing, false=erasing
  const timer = useRef(null);

  useEffect(() => {
    const full = HEADLINES[idx];
    if (typing) {
      if (count < full.length) {
        timer.current = setTimeout(() => setCount((c) => c + 1), TYPE_MS);
      } else {
        // fully typed → hold, then start erasing
        timer.current = setTimeout(() => setTyping(false), HOLD_MS);
      }
    } else {
      if (count > 0) {
        timer.current = setTimeout(() => setCount((c) => c - 1), ERASE_MS);
      } else {
        // erased → brief gap, then next phrase types in
        timer.current = setTimeout(() => {
          setIdx((i) => (i + 1) % HEADLINES.length);
          setTyping(true);
        }, GAP_MS);
      }
    }
    return () => clearTimeout(timer.current);
  }, [idx, count, typing]);

  const shown = HEADLINES[idx].slice(0, count);
  return (
    <section id="home" className="section hero">
      <div ref={revealRef} className="reveal reveal-anim">
      <div className="hero-tag anim-left" style={{ "--d": "60ms" }}>
        <span className="hero-tag-dot" />
        Based in Palembang, Indonesia · Open for Work
      </div>
      <div className="hero-grid">
        <div className="hero-left">
          <h1 className="hero-title hero-title-rotator anim-left" style={{ "--d": "220ms" }}>
            <span className="hero-type-line" aria-label={HEADLINES[idx]}>
              <span className="hero-type-text" aria-hidden="true">
                {shown}
              </span>
            </span>
          </h1>
          <p className="hero-sub anim-left" style={{ "--d": "380ms" }}>
            I'm <strong>Drxyzzxx Tech</strong>. I build decentralized applications
            and smart contracts that live on-chain, from protocol design to
            polished dApp frontends.
          </p>
          <div className="hero-actions anim-up" style={{ "--d": "540ms" }}>
            <MagneticButton strength={0.2}>
              <a
                href="#work"
                className="btn primary"
                onClick={(e) => scrollTo(e, "work")}
              >
                View Work <span className="btn-arrow">→</span>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a
                href="#contact"
                className="btn ghost"
                onClick={(e) => scrollTo(e, "contact")}
              >
                Let's Talk
              </a>
            </MagneticButton>
          </div>
          <div className="hero-socials anim-up" style={{ "--d": "700ms" }} aria-label="Social links">
            <a
              href="https://github.com/youknowdrxzz"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="GitHub Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/drxyzzxx/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="LinkedIn Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://instagram.com/youknowdrxyzz"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="Instagram Profile"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-right anim-right" style={{ "--d": "320ms" }}>
          <SkillPanel />
        </div>
      </div>
      </div>
    </section>
  );
}
