import SignalTrace from "./SignalTrace";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner container">
        <p className="eyebrow hero__eyebrow">Will Smith — Software Engineer, Auckland NZ</p>
        <h1 className="hero__headline">Firmware to cloud infra.</h1>
        <p className="hero__lede">
          Six months of full-time commercial experience shipping production software and
          operating live infrastructure at an MSP — backed by an independently-built portfolio
          spanning embedded systems, self-hosted infrastructure, and applied ML.
        </p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#projects">
            View projects
          </a>
          <a className="btn btn--ghost" href="/Will-Smith-CV.pdf" target="_blank" rel="noreferrer">
            Download CV
          </a>
        </div>
      </div>
      <SignalTrace className="hero__trace" />
    </section>
  );
}
