import SectionHeading from "./SectionHeading";
import { experience } from "../data/content";
import "./Experience.css";

type Group = (typeof experience.groups)[number];

function GroupTitle({ group }: { group: Group }) {
  if (!("link" in group) || !group.link) return <>{group.title}</>;
  const [before, after] = group.title.split(group.link.text);
  return (
    <>
      {before}
      <a href={group.link.href} target="_blank" rel="noreferrer">
        {group.link.text}
      </a>
      {after}
    </>
  );
}

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
          {experience.groups.map((group) => (
            <div className="experience__col" key={group.title}>
              <p className="experience__group-title">
                <GroupTitle group={group} />
              </p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.label}>
                    <span className="experience__label">{item.label}:</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
