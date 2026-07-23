import { useReveal } from "../hooks.js";

export default function Services() {
  const ref = useReveal({ repeat: true });

  // Cursor-following spotlight + 3D tilt: write CSS vars on the card,
  // the stylesheet consumes them in the hover transform/gradient.
  const onMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.setProperty("--mx", x + "px");
    card.style.setProperty("--my", y + "px");
    card.style.setProperty("--ry", ((x / r.width - 0.5) * 9).toFixed(2) + "deg");
    card.style.setProperty("--rx", ((y / r.height - 0.5) * -7).toFixed(2) + "deg");
  };
  const onLeave = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
    {
      num: "01",
      icon: "🧊",
      name: "Blockchain Development",
      desc: "Designing and building blockchain solutions end to end: network architecture, token standards, DeFi protocols, and integrations across EVM-compatible chains and Layer 2s.",
      tags: ["EVM", "Layer 2", "DeFi", "Tokenomics"],
    },
    {
      num: "02",
      icon: "📜",
      name: "Smart Contract Development",
      desc: "Secure, gas-efficient smart contracts in Solidity, covering ERC-20, ERC-721, and ERC-1155 standards, with thorough testing, auditing practices, and deployment pipelines.",
      tags: ["Solidity", "ERC-20", "NFT", "Security"],
    },
    {
      num: "03",
      icon: "🌐",
      name: "Web3 Development",
      desc: "Full-stack decentralized applications: wallet connections, on-chain reads and writes, and polished dApp frontends built with modern Web3 tooling.",
      tags: ["dApps", "Ethers.js", "Wagmi", "IPFS"],
    },
    {
      num: "04",
      icon: "🛡️",
      name: "Smart Contract Auditing",
      desc: "Security reviews of Solidity contracts: reentrancy, access control, oracle and arithmetic risks, with gas optimization and a Foundry test suite to prove fixes hold.",
      tags: ["Security", "Foundry", "Gas Optimization", "Reentrancy", "Testing"],
    },
  ];
  return (
    <section id="services" className="section">
      <div ref={ref} className="reveal reveal-anim">
        <div className="services-head">
          <div>
            <div className="section-label anim-left" style={{ "--d": "60ms" }}>
              <span className="section-num">03</span> What I Do
            </div>
            <h2 className="services-title anim-left" style={{ "--d": "220ms" }}>
              Services &amp; <span className="italic-accent">capabilities.</span>
            </h2>
          </div>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div
              key={s.num}
              className="service-card anim-up"
              data-hover={true}
              style={{
                "--d": 380 + i * 140 + "ms",
                "--spot-c": i % 2 ? "var(--accent-2)" : "var(--accent)",
                "--float-d": i * 0.6 + "s",
              }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <span className="service-card-spot" aria-hidden="true" />
              <span className="service-card-ghost" aria-hidden="true">
                {s.num}
              </span>
              <div className="service-card-num">{s.num}</div>
              <div className="service-card-icon">
                <span className="service-icon-ring" aria-hidden="true" />
                <span className="service-icon-emoji">{s.icon}</span>
              </div>
              <div className="service-card-name">{s.name}</div>
              <p className="service-card-desc">{s.desc}</p>
              <div className="service-card-tags">
                {s.tags.map((t, ti) => (
                  <span key={t} className="service-tag" style={{ "--ti": ti }}>
                    {t}
                  </span>
                ))}
              </div>
              <a
                className="service-card-cta"
                href="#contact"
                onClick={(e) => scrollTo(e, "contact")}
              >
                Start a project{" "}
                <span className="service-cta-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
