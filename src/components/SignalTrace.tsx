import "./SignalTrace.css";

/**
 * An ADSR envelope trace — attack, decay, sustain, release — the exact
 * shape of the envelope generator built for the ESP32 synth projects.
 * Reused as the site's persistent structural motif.
 */
export default function SignalTrace({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`signal-trace ${className}`}
      viewBox="0 0 800 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="signal-trace__path"
        d="M0,176 L96,176 C124,176 118,32 150,32 L180,32 C204,32 198,92 224,92 L520,92 C544,92 540,92 560,92 C592,92 588,180 620,180 L800,180"
        stroke="var(--signal)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="signal-trace__via" cx="150" cy="32" r="4" fill="var(--signal)" />
      <circle className="signal-trace__via" cx="224" cy="92" r="4" fill="var(--signal)" />
      <circle className="signal-trace__via" cx="560" cy="92" r="4" fill="var(--signal)" />
    </svg>
  );
}
