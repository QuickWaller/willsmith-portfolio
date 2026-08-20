import { contact } from "../data/content";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner container">
        <p className="eyebrow hero__eyebrow">Will Smith — Software Engineer, Auckland NZ</p>
        <h1 className="hero__headline">Firmware to cloud infra.</h1>
        <p className="hero__lede">
          Full-time software engineer at an MSP since February 2026 — shipping production code
          and operating live infrastructure. Backed by an independently-built portfolio spanning
          embedded systems, full-stack web, self-hosted infrastructure, and applied ML.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#projects">
            View projects
          </a>
          <a className="btn btn--ghost" href={contact.cv} target="_blank" rel="noreferrer">
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
