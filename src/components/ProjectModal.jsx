import { useEffect, Fragment } from "react";
import MagneticButton from "./MagneticButton.jsx";
import WorkArt from "./WorkArt.jsx";

export default function ProjectModal(props) {
  const { project, onClose } = props;
  const open = !!project;
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={"modal-backdrop" + (open ? " open" : "")}
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        {project && (
          <Fragment>
            <div className="modal-art">
              {project.video ? (
                <Fragment>
                  {project.cover && (
                    <img
                      className="modal-art-cover-bg"
                      src={project.cover}
                      alt=""
                      aria-hidden="true"
                    />
                  )}
                  <video
                    className="modal-art-cover"
                    src={project.video}
                    poster={project.cover}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                </Fragment>
              ) : project.cover ? (
                <Fragment>
                  <img
                    className="modal-art-cover-bg"
                    src={project.cover}
                    alt=""
                    aria-hidden="true"
                  />
                  <img
                    className="modal-art-cover"
                    src={project.cover}
                    alt={project.name}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    style={{ position: "absolute", inset: 0 }}
                    className={"work-art-fill art-" + project.art}
                  />
                  <WorkArt kind={project.art} />
                </Fragment>
              )}
            </div>
            <div className="modal-body">
              <div className="modal-cat">{project.cat}</div>
              <h3 className="modal-title">{project.name}</h3>
              <div className="modal-actions">
                {project.link && (
                  <MagneticButton strength={0.2}>
                    <a
                      className="btn ghost"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View live site <span className="btn-arrow">↗</span>
                    </a>
                  </MagneticButton>
                )}
                <MagneticButton strength={0.2}>
                  <a
                    className="btn primary"
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      setTimeout(() => {
                        document
                          .getElementById("contact")
                          .scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                  >
                    Want one like this?{" "}
                    <span className="btn-arrow">→</span>
                  </a>
                </MagneticButton>
              </div>
              <p className="modal-desc">{project.desc}</p>
              <div className="modal-tags">
                {project.tags.map((t) => (
                  <span key={t} className="modal-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="modal-meta">
                <div>
                  <div className="modal-meta-item-label">Year</div>
                  <div className="modal-meta-item-val">{project.year}</div>
                </div>
                {project.duration && (
                  <div>
                    <div className="modal-meta-item-label">Duration</div>
                    <div className="modal-meta-item-val">
                      {project.duration}
                    </div>
                  </div>
                )}
                <div style={{ gridColumn: "1 / -1" }}>
                  <div className="modal-meta-item-label">Tools</div>
                  <div className="modal-meta-item-val">{project.tools}</div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
