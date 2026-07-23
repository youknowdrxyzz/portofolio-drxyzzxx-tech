import { useReveal } from "../hooks.js";

const LinkedInIcon = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const MailIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const WhatsAppIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
  </svg>
);
const GitHubIcon = (props) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const ExternalIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export default function Contact() {
  const ref = useReveal({ repeat: true });

  const small = [
    {
      label: "Email",
      val: "drxyzzx@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=drxyzzx@gmail.com",
      Icon: MailIcon,
      brand: "#EA4335",
    },
    {
      label: "Instagram",
      val: "@youknowdrxyzz",
      href: "https://instagram.com/youknowdrxyzz",
      Icon: InstagramIcon,
      brand: "#E4405F",
    },
    {
      label: "WhatsApp",
      val: "+62 831-9834-4346",
      href: "https://wa.me/6283198344346",
      Icon: WhatsAppIcon,
      brand: "#25D366",
    },
    {
      label: "GitHub",
      val: "@youknowdrxyzz",
      href: "https://github.com/youknowdrxyzz",
      Icon: GitHubIcon,
      brand: "#ffffff",
    },
  ];

  return (
    <section id="contact" className="contact">
      <div ref={ref} className="reveal reveal-anim contact-grid">
        <div className="contact-left">
          <div className="section-label anim-left" style={{ "--d": "60ms" }}>
            <span className="section-num">04</span> Get In Touch
          </div>
          <h2 className="contact-title anim-left" style={{ "--d": "220ms" }}>
            Have a project? <br />
            <span className="italic-accent">Let's talk.</span>
          </h2>
        </div>
        <div className="contact-right">
          <div className="connect-card anim-right" style={{ "--d": "320ms" }}>
            <h3 className="connect-card-title">
              <span className="connect-card-bar" aria-hidden="true" />
              Connect With Me
            </h3>

            <a
              href="https://www.linkedin.com/in/drxyzzxx/"
              target="_blank"
              rel="noreferrer noopener"
              className="connect-row connect-row-wide"
              style={{ "--brand": "#0A66C2" }}
            >
              <span className="connect-row-glow" aria-hidden="true" />
              <span className="connect-row-main">
                <span className="connect-row-icon-wrap">
                  <LinkedInIcon className="connect-row-icon" />
                </span>
                <span className="connect-row-text">
                  <span className="connect-row-label">Let's Connect</span>
                  <span className="connect-row-val">on LinkedIn</span>
                </span>
              </span>
              <ExternalIcon className="connect-row-ext" />
              <span className="connect-row-sweep" aria-hidden="true" />
            </a>

            <div className="connect-grid">
              {small.map((s) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="connect-row connect-row-small"
                    style={{ "--brand": s.brand }}
                  >
                    <span className="connect-row-glow" aria-hidden="true" />
                    <span className="connect-row-icon-wrap connect-row-icon-wrap-sm">
                      <Icon className="connect-row-icon connect-row-icon-sm" />
                    </span>
                    <span className="connect-row-text">
                      <span className="connect-row-label connect-row-label-sm">
                        {s.label}
                      </span>
                      <span className="connect-row-val connect-row-val-sm">
                        {s.val}
                      </span>
                    </span>
                    <ExternalIcon className="connect-row-ext" />
                    <span className="connect-row-sweep" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
