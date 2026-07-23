import { useRef, useCallback } from "react";

export default function MagneticButton(props) {
  const strength = props.strength == null ? 0.25 : props.strength;
  const ref = useRef(null);
  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform =
        "translate(" + x * strength + "px, " + y * strength + "px)";
    },
    [strength]
  );
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={"magnetic " + (props.className || "")}
      style={{
        display: "inline-block",
        transition: "transform .35s cubic-bezier(.2,.7,.2,1)",
      }}
    >
      {props.children}
    </span>
  );
}
