import SectionHeading from "./SectionHeading";
import { skills } from "../data/content";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="section skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading eyebrow="Technical skills" title="Legend" id="skills" />
        <dl className="skills__grid">
          {skills.map((group) => (
            <div className="skills__group" key={group.group}>
              <dt>{group.group}</dt>
              <dd>
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
