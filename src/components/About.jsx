import { useReveal } from "../hooks.js";
import MagneticButton from "./MagneticButton.jsx";
import Lanyard from "./Lanyard.jsx";

export default function About() {
  const ref = useReveal({ repeat: true });
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="about" className="section">
      <div ref={ref} className="reveal reveal-anim">
        <div className="section-label anim-left" style={{ "--d": "60ms" }}>
          <span className="section-num">01</span> About Me
        </div>
        <div className="about-grid">
          <div className="about-left">
            <h2 className="about-title about-title-stack">
              <span className="about-hello anim-left" style={{ "--d": "220ms" }}>Hello, I'm</span>
              <span className="about-name anim-left" style={{ "--d": "380ms" }}>Drxyzzxx Tech</span>
            </h2>
            <p className="about-body anim-left" style={{ "--d": "540ms" }}>
              I'm a <strong>Web3-focused engineer</strong>. I build the
              decentralized web through{" "}
              <strong>blockchain & smart contract development</strong> and{" "}
              <strong>Web3 applications</strong>, from on-chain protocols to
              the dApps people actually use.
            </p>
            <div className="about-actions anim-up" style={{ marginTop: 24, "--d": "700ms" }}>
              <MagneticButton strength={0.2}>
                <a
                  href="#contact"
                  className="btn primary"
                  onClick={(e) => scrollTo(e, "contact")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  Get in touch
                </a>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <a
                  href="#work"
                  className="btn ghost about-btn-ghost"
                  onClick={(e) => scrollTo(e, "work")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  View Projects
                </a>
              </MagneticButton>
            </div>
            <div className="about-stats anim-up" style={{ "--d": "880ms" }}>
              <div className="about-stat">
                <div className="about-stat-num">
                  3<sup>+</sup>
                </div>
                <div className="about-stat-label">Years Exp.</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">
                  7<sup>+</sup>
                </div>
                <div className="about-stat-label">Projects Shipped</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-num">
                  6<sup>+</sup>
                </div>
                <div className="about-stat-label">Clients Served</div>
              </div>
            </div>
          </div>
          <div className="about-right anim-right" style={{ "--d": "320ms" }}>
            <Lanyard position={[0, 0, 13]} fov={17} transparent />
          </div>
        </div>
      </div>
    </section>
  );
}
