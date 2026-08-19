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
  yearsBack: number;
  days: Day[];
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

const COL_WIDTH = 14; // 11px cell + 3px gap

export default function Activity() {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/contributions.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  if (failed || !data) return null;

  const columns = buildColumns(data.days);
  const labels = yearLabels(columns);

  return (
    <section className="section activity" aria-labelledby="activity-title">
      <div className="container">
        <SectionHeading eyebrow="Commit log" title="Activity" id="activity" />
        <p className="activity__note">
          Combined from all {data.usernames.length} GitHub accounts —{" "}
          {data.usernames.join(" + ")} — over the last{" "}
          {data.yearsBack} years.
        </p>

        <div className="activity__scroll">
          <div className="activity__years" style={{ width: columns.length * COL_WIDTH }}>
            {labels.map((l) => (
              <span key={l.year} className="activity__year" style={{ left: l.colIndex * COL_WIDTH }}>
                {l.year}
              </span>
            ))}
          </div>
          <div className="activity__grid">
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
      </div>
    </section>
  );
}
