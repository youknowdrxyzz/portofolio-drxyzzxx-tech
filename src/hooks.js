import { useState, useEffect, useRef } from "react";

/* Global scroll-direction tracker (down vs up) */
let scrollDir = "down";
let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
if (typeof window !== "undefined") {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > lastScrollY) scrollDir = "down";
      else if (y < lastScrollY) scrollDir = "up";
      lastScrollY = y;
    },
    { passive: true }
  );
}

/* IntersectionObserver reveal-on-scroll */
export function useReveal(opts) {
  opts = opts || {};
  const repeat = opts.repeat === true;
  const enabled = opts.enabled !== false;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    let pending = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (repeat) {
              if (scrollDir === "down") {
                cancelAnimationFrame(pending);
                el.classList.remove("in");
                void el.offsetWidth;
                pending = requestAnimationFrame(() => {
                  pending = requestAnimationFrame(() => el.classList.add("in"));
                });
              } else {
                cancelAnimationFrame(pending);
                el.classList.add("instant");
                el.classList.add("in");
              }
            } else {
              el.classList.add("in");
              io.unobserve(el);
            }
          } else if (repeat) {
            cancelAnimationFrame(pending);
            el.classList.remove("in");
            el.classList.remove("instant");
          }
        });
      },
      {
        threshold: opts.threshold || 0.15,
        rootMargin: opts.rootMargin || "0px 0px -10% 0px",
      }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(pending);
      io.disconnect();
    };
  }, [repeat, enabled]);
  return ref;
}

/* Scrollspy: active section id by scroll position */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let cur = ids[0];
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        if (el.offsetTop <= y) cur = ids[i];
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(",")]);
  return active;
}

/* Persisted dark/light theme on <html data-theme> */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (e) {}
  }, [theme]);
  return [theme, setTheme];
}
