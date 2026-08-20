import "./SectionHeading.css";

export default function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="section-heading" id={id}>
      <p className="eyebrow section-heading__eyebrow">
        <span className="section-heading__dot" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="section-heading__title" id={id && `${id}-title`}>
        {title}
      </h2>
    </div>
  );
}
