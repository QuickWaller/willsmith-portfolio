import SectionHeading from "./SectionHeading";
import { projects, otherWork } from "../data/content";
import "./Projects.css";

export default function Projects() {
  return (
    <section className="section section--panel projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading eyebrow="Selected work" title="Projects" id="projects" />

        <div className="projects__grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-card__head">
                <h3 className="project-card__title">{project.title}</h3>
                <span className={`project-card__status project-card__status--${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>
              <p className="project-card__desc">{project.description}</p>
              <ul className="project-card__stack">
                {project.stack.map((item) => (
                  <li className="tag" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="project-card__links">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="other-work">
          <p className="tag other-work__tag">Also built, no public repo</p>
          <div className="other-work__grid">
            {otherWork.map((item) => (
              <div className="other-work__item" key={item.title}>
                <p className="other-work__title">{item.title}</p>
                <p className="other-work__meta">{item.meta}</p>
                <p className="other-work__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
