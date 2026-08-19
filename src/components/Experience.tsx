import SectionHeading from "./SectionHeading";
import { experience } from "../data/content";
import "./Experience.css";

export default function Experience() {
  return (
    <section className="section experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading eyebrow="Work experience" title="Novatec Solutions" id="experience" />

        <div className="experience__role">
          <div className="experience__role-head">
            <p className="experience__role-title">{experience.role}</p>
            <p className="experience__role-dates">{experience.dates}</p>
          </div>
          <p className="experience__company">{experience.company}</p>
          <p className="experience__blurb">{experience.blurb}</p>
        </div>

        <div className="experience__grid">
          <div className="experience__col">
            <p className="tag experience__col-tag">Software</p>
            <ul>
              {experience.software.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="experience__col">
            <p className="tag experience__col-tag">Infrastructure &amp; hosting</p>
            <ul>
              {experience.infra.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
