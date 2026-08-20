import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import "./Activity.css";

interface Day {
  date: string;
  total: number;
  byUser: Record<string, number>;
}

interface ContributionsData {
  generatedAt: string;
  usernames: string[];
  startDate: string;
  days: Day[];
}

interface Week {
  week: string;
  additions: number;
  deletions: number;
  byUser: Record<string, { a: number; d: number }>;
}

interface CodeChangesData {
  generatedAt: string;
  usernames: string[];
  startDate: string;
  weeks: Week[];
}

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-NZ", { month: "long", year: "numeric" });

function monthLabel(iso: string): string {
  return MONTH_FORMATTER.format(new Date(iso));
}

function level(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function buildColumns(days: Day[]): (Day | null)[][] {
  if (days.length === 0) return [];
  const firstWeekday = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const padded: (Day | null)[] = [...Array(firstWeekday).fill(null), ...days];
  while (padded.length % 7 !== 0) padded.push(null);

  const columns: (Day | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    columns.push(padded.slice(i, i + 7));
  }
  return columns;
}

function yearLabels(columns: (Day | null)[][]): { colIndex: number; year: string }[] {
  const labels: { colIndex: number; year: string }[] = [];
  let lastYear = "";
  columns.forEach((column, i) => {
    const firstDay = column.find((d) => d !== null);
    if (!firstDay) return;
    const year = firstDay.date.slice(0, 4);
    if (year !== lastYear) {
      labels.push({ colIndex: i, year });
      lastYear = year;
    }
  });
  return labels;
}

function tooltip(day: Day, usernames: string[]): string {
  const breakdown = usernames.map((u) => `${day.byUser[u] ?? 0} ${u}`).join(", ");
  const noun = day.total === 1 ? "commit" : "commits";
  return `${day.date}: ${day.total} ${noun} (${breakdown})`;
}

// GitHub's stats/contributors weeks are Sunday-UTC-aligned and sparse (only
// weeks with activity are returned); fill in the gaps so the x-axis lines up
// week-for-week with the heatmap above it instead of compressing silent
// stretches away.
function fillWeeks(weeks: Week[], startISO: string, usernames: string[]): Week[] {
  const byWeek = new Map(weeks.map((w) => [w.week, w]));
  const emptyByUser = Object.fromEntries(usernames.map((u) => [u, { a: 0, d: 0 }]));

  const start = new Date(`${startISO.slice(0, 10)}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay()); // snap to Sunday
  const end = new Date();

  const filled: Week[] = [];
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 7)) {
    const key = d.toISOString().slice(0, 10);
    filled.push(byWeek.get(key) ?? { week: key, additions: 0, deletions: 0, byUser: emptyByUser });
  }
  return filled;
}

// Log scale (log1p so a zero-line-week stays at zero height) — a handful of
// weeks are bulk data-file commits (datasets, notebook outputs) two to three
// orders of magnitude bigger than an ordinary coding week, and a linear or
// even sqrt scale flattens everything else to invisible slivers next to
// those. Exact numbers are always one hover away in the tooltip.
function barHeight(value: number, max: number): number {
  if (max <= 0) return 0;
  return Math.log1p(value) / Math.log1p(max);
}

function changeTooltip(week: Week, usernames: string[]): string {
  const breakdown = usernames
    .map((u) => `${u}: +${week.byUser[u]?.a ?? 0}/-${week.byUser[u]?.d ?? 0}`)
    .join(", ");
  return `Week of ${week.week}: +${week.additions} / -${week.deletions} lines (${breakdown})`;
}

// Off for now: the CONTRIB_READ_TOKEN*/_2/_3 secrets only have `read:user`
// scope, so fetch-code-changes.mjs silently undercounts (private repos
// 403/404). Flip true once the tokens are widened to `repo`/Contents:Read —
// everything else (script, component, styling) is already built and working.
const SHOW_CODE_CHANGES = false;

export default function Activity() {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [failed, setFailed] = useState(false);
  const [changes, setChanges] = useState<CodeChangesData | null>(null);

  useEffect(() => {
    fetch("/contributions.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setData)
      .catch(() => setFailed(true));
    if (SHOW_CODE_CHANGES) {
      fetch("/code-changes.json")
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then(setChanges)
        .catch(() => setChanges(null));
    }
  }, []);

  if (failed || !data) return null;

  const columns = buildColumns(data.days);
  const labels = yearLabels(columns);

  const weeks = changes ? fillWeeks(changes.weeks, changes.startDate, changes.usernames) : null;
  const maxChange = weeks ? Math.max(1, ...weeks.flatMap((w) => [w.additions, w.deletions])) : 1;

  return (
    <section className="section activity" aria-labelledby="activity-title">
      <div className="container">
        <SectionHeading eyebrow="Commit log" title="Activity" id="activity" />
        <p className="activity__note">
          Combined across my GitHub accounts since {monthLabel(data.startDate)}.
        </p>

        <div className="activity__years">
          {labels.map((l) => (
            <span
              key={l.year}
              className="activity__year"
              style={{ left: `${(l.colIndex / columns.length) * 100}%` }}
            >
              {l.year}
            </span>
          ))}
        </div>
        <div className="activity__scroll">
          <div className="activity__grid" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            {columns.map((column, i) => (
              <div className="activity__col" key={i}>
                {column.map((day, j) =>
                  day ? (
                    <div
                      key={day.date}
                      className={`activity__cell activity__cell--${level(day.total)}`}
                      title={tooltip(day, data.usernames)}
                    />
                  ) : (
                    <div className="activity__cell activity__cell--empty" key={j} aria-hidden="true" />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="activity__legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`activity__cell activity__cell--${l}`} />
          ))}
          <span>More</span>
        </div>

        {weeks && (
          <>
            <div className="activity__changes" aria-label="Lines added and removed per week">
              {weeks.map((w) => (
                <div className="activity__change-col" key={w.week} title={changeTooltip(w, changes!.usernames)}>
                  <div className="activity__change-half activity__change-half--add">
                    <div className="activity__change-bar activity__change-bar--add" style={{ height: `${barHeight(w.additions, maxChange) * 100}%` }} />
                  </div>
                  <div className="activity__change-half activity__change-half--del">
                    <div className="activity__change-bar activity__change-bar--del" style={{ height: `${barHeight(w.deletions, maxChange) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="activity__legend">
              <span className="activity__swatch activity__swatch--add" />
              <span>Added</span>
              <span className="activity__swatch activity__swatch--del" />
              <span>Removed</span>
              <span className="activity__legend-note">lines/week, log scale</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
