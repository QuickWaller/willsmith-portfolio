import SectionHeading from "./SectionHeading";
import { education } from "../data/content";
import "./Education.css";

export default function Education() {
  return (
    <section className="section section--panel education" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading eyebrow="Education" title={education.institution} id="education" />
        <div className="education__body">
          <div className="education__head">
            <p className="education__degree">{education.degree}</p>
            <p className="education__dates">{education.dates}</p>
          </div>
          <ul>
            {education.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
