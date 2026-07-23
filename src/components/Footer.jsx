export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="footer">
      <div className="footer-kicker">Have an idea to bring on-chain?</div>
      <a
        className="footer-big"
        href="#contact"
        onClick={(e) => scrollTo(e, "contact")}
      >
        Let's <span className="italic-accent">build.</span>
        <span className="footer-big-arrow" aria-hidden="true">
          →
        </span>
      </a>
      <div className="footer-row">
        <div>© 2026 Drxyzzxx Tech. All rights reserved.</div>
        <div className="footer-status">
          <span className="footer-status-dot" aria-hidden="true" />
          Open for Web3 work
        </div>
        <div>Palembang, Indonesia · v2.0</div>
      </div>
    </footer>
  );
}
