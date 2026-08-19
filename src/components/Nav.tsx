import "./Nav.css";

const LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__mark" href="#top" aria-label="Will Smith, home">
          WS
        </a>
        <nav className="nav__links" aria-label="Section">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav__icons">
          <a href="https://github.com/QuickWaller" aria-label="GitHub" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/will-smith-1b5068294"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M5.34 3.5a2.16 2.16 0 1 1 0 4.32 2.16 2.16 0 0 1 0-4.32ZM3.4 9.24h3.88V20.5H3.4V9.24Zm6.53 0h3.72v1.54h.05c.52-.94 1.78-1.93 3.66-1.93 3.92 0 4.64 2.5 4.64 5.75v6.9h-3.88v-6.12c0-1.46-.03-3.34-2.1-3.34-2.11 0-2.43 1.58-2.43 3.23v6.23H9.93V9.24Z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
