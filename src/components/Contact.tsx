import { contact } from "../data/content";
import "./Contact.css";

export default function Contact() {
  return (
    <footer className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow contact__eyebrow">
          <span className="contact__dot" aria-hidden="true" />
          Get in touch
        </p>
        <h2 className="contact__title" id="contact-title">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </h2>

        <div className="contact__row">
          <a className="btn btn--primary" href={contact.cv} target="_blank" rel="noreferrer">
            Download CV
          </a>
          <a className="contact__link" href={contact.github} target="_blank" rel="noreferrer">
            {contact.githubLabel}
          </a>
          <a className="contact__link" href={contact.linkedin} target="_blank" rel="noreferrer">
            {contact.linkedinLabel}
          </a>
        </div>

        <p className="contact__colophon">
          Built with React + Vite, deployed on GitHub Pages. Source at{" "}
          <a href={contact.repo} target="_blank" rel="noreferrer">
            github.com/QuickWaller/willsmith-portfolio
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
