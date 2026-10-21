import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner container">
        <div className="hero__text">
          <p className="eyebrow hero__eyebrow">Will Smith — Software Engineer, Auckland NZ</p>
          <h1 className="hero__headline">Firmware to cloud infra.</h1>
          <p className="hero__lede">
            Auckland-based technical consultant and developer at MSP Novatec Solutions with a
            conjoint degree in Computer Science and Economics from the University of Auckland.
          </p>
          <p className="hero__lede">
            Technical interests include developing software for embedded systems, full-stack web
            development, server infrastructure and management, and experimenting with agentic
            workflows.
          </p>
          <p className="hero__lede">
            I love to hike, cook and work on my own projects. In my spare time, you'll find me
            trapping for pest animals in central Auckland to restore natural ecosystems.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              View projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
