import { useState, useEffect, useRef } from "react";

export default function CustomCursor(props) {
  const enabled = props.enabled !== false;
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const stateRef = useRef({ mx: 0, my: 0, rx: 0, ry: 0, dx: 0, dy: 0 });
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!enabled) {
      document.body.dataset.cursor = "off";
      return;
    }
    document.body.dataset.cursor = "on";
    return () => {
      document.body.dataset.cursor = "off";
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let raf;
    const onMove = (e) => {
      stateRef.current.mx = e.clientX;
      stateRef.current.my = e.clientY;
      if (dotRef.current)
        dotRef.current.style.transform =
          "translate(" + e.clientX + "px, " + e.clientY + "px)";
      if (!visible) setVisible(true);
    };
    const onOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      const hov = t.closest(
        "a, button, [data-hover], .work-card, .skill-orb, .nav-link, .contact-social, .testimonial"
      );
      setHover(!!hov);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const tick = () => {
      const s = stateRef.current;
      s.rx += (s.mx - s.rx) * 0.4;
      s.ry += (s.my - s.ry) * 0.4;
      if (ringRef.current)
        ringRef.current.style.transform =
          "translate(" + s.rx + "px, " + s.ry + "px) translate(-50%, -50%)";
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [enabled, visible]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
        dangerouslySetInnerHTML={{
          __html:
            '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
            "<defs>" +
            '<linearGradient id="cur-holo" x1="10%" y1="0%" x2="90%" y2="100%">' +
            '<stop offset="0%" stop-color="#0ff0fc"/>' +
            '<stop offset="50%" stop-color="#2f7bff"/>' +
            '<stop offset="100%" stop-color="#2b5aff"/>' +
            "</linearGradient>" +
            "</defs>" +
            '<path d="M22 8 L78 64 L46 66 L34 92 Z" ' +
            'fill="url(#cur-holo)" transform="rotate(-8 22 8)"/>' +
            "</svg>",
        }}
      />
      <div
        ref={ringRef}
        className={"cursor-ring" + (hover ? " hover" : "")}
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
