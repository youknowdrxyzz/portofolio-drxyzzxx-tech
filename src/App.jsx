import { useState, useEffect, Fragment } from "react";
import { PALETTES, applyPalette } from "./palette.js";
import CustomCursor from "./components/CustomCursor.jsx";
import SpaceBackground from "./components/SpaceBackground.jsx";
import Loader from "./components/Loader.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Work from "./components/Work.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    document.documentElement.dataset.theme = "dark";
    applyPalette(PALETTES[0]);
  }, []);

  return (
    <Fragment>
      <CustomCursor enabled={true} />
      <SpaceBackground />
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className={"app" + (!loading ? " ready" : "")}>
        <Header />
        <Hero loading={loading} />
        <Marquee />
        <About />
        <Work onOpen={setProject} />
        <Services />
        <Contact />
        <Footer />
        <ProjectModal
          project={project}
          onClose={() => setProject(null)}
        />
        <ScrollToTop />
      </div>
    </Fragment>
  );
}
