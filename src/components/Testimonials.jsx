import { useReveal } from "../hooks.js";

export default function Testimonials() {
  const ref = useReveal({ repeat: true });
  const items = [
    {
      text: "Wijaya is a detailed talent, hardworking and has qualified skills. He is also very responsible for the tasks he receives. He is very good at editing videos, creating motion graphics, creating attractive User Interface designs.",
      name: "Galih Satrio Putra Haryanto",
      role: "Founder · Glimora Agency",
      initial: "GS",
    },
    {
      text: "Wijaya is an excellent UI/UX Designer and also a dear friend and is someone who brings cohesiveness to the team. He always went beyond expectation and put extra attention to every element of his design.",
      name: "Moch. Fatichin",
      role: "Graphic Design & UI/UX Design Enthusiast",
      initial: "MF",
    },
    {
      text: "Wijaya is one of the best mentee at UI/UX Design class. He give his best to finish his final project and the final project was done very good. He always open for the feedback and has growth mindset!",
      name: "Hofifa Mulya Utami",
      role: "Digital Product Designer · UI/UX Mentor",
      initial: "HU",
    },
  ];
  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <div ref={ref} className="reveal reveal-anim">
          <div className="section-label anim-left" style={{ "--d": "60ms" }}>
            <span className="section-num">04</span> Voices
          </div>
          <h2 className="anim-left" style={{ fontSize: "clamp(30px, 4vw, 54px)", "--d": "220ms" }}>
            Kind words from{" "}
            <span className="italic-accent">good people.</span>
          </h2>
          <div className="testimonial-grid">
            {items.map((t, i) => (
              <div key={i} className="testimonial anim-up" style={{ "--d": 380 + i * 140 + "ms" }}>
                <div className="testimonial-quote-mark">”</div>
                <div className="testimonial-text">{t.text}</div>
                <div className="testimonial-foot">
                  <div className="testimonial-avatar">{t.initial}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
