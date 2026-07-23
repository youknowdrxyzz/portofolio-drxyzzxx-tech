export const PALETTES = [
  ["#60A5FA", "#5EE6E0"],
  ["#7AB5E8", "#60A5FA"],
  ["#5EE6A5", "#7AB5E8"],
  ["#E89766", "#D67A8E"],
  ["#FF8FA3", "#60A5FA"],
  ["#FFB347", "#FF6B9D"],
];

export function applyPalette(p) {
  const r = document.documentElement.style;
  r.setProperty("--accent", p[0]);
  r.setProperty("--accent-2", p[1]);
  r.setProperty("--accent-soft", p[0] + "26");
  r.setProperty(
    "--grad",
    "linear-gradient(95deg, " + p[0] + " 0%, " + p[1] + " 100%)"
  );
  r.setProperty(
    "--grad-soft",
    "linear-gradient(95deg, " + p[0] + "33 0%, " + p[1] + "33 100%)"
  );
}
