// Fetches GitHub contribution calendars for both accounts (each queried
// with its own token, via `viewer`, so private-contribution counts are
// included) over the last 4 years, and merges them by date into a single
// JSON file the site reads at runtime.
//
// GitHub's contributionCalendar caps each query at a 1-year window, so we
// query 4 one-year windows per account and stitch them together.

const ACCOUNTS = [
  { login: "QuickWaller", tokenEnv: "CONTRIB_READ_TOKEN" },
  { login: "tombstonesuplex", tokenEnv: "CONTRIB_READ_TOKEN_2" },
];
const YEARS_BACK = 4;
const OUT_PATH = new URL("../public/contributions.json", import.meta.url);

const QUERY = `
  query($from: DateTime!, $to: DateTime!) {
    viewer {
      login
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function yearWindows(years) {
  const windows = [];
  const now = new Date();
  for (let i = 0; i < years; i++) {
    const to = new Date(now);
    to.setUTCFullYear(to.getUTCFullYear() - i);
    const from = new Date(to);
    from.setUTCFullYear(from.getUTCFullYear() - 1);
    windows.push({ from: from.toISOString(), to: to.toISOString() });
  }
  return windows;
}

async function queryWindow(token, from, to) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { from, to } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data.viewer;
}

async function fetchAccountCalendar(account) {
  const token = process.env[account.tokenEnv];
  if (!token) {
    throw new Error(`${account.tokenEnv} is not set`);
  }

  const days = {};
  for (const { from, to } of yearWindows(YEARS_BACK)) {
    const viewer = await queryWindow(token, from, to);
    if (viewer.login.toLowerCase() !== account.login.toLowerCase()) {
      throw new Error(
        `${account.tokenEnv} belongs to "${viewer.login}", expected "${account.login}" — wrong token in that secret?`,
      );
    }
    for (const week of viewer.contributionsCollection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        days[day.date] = day.contributionCount;
      }
    }
  }
  return days;
}

const perUser = {};
for (const account of ACCOUNTS) {
  perUser[account.login] = await fetchAccountCalendar(account);
  console.log(`Fetched ${Object.keys(perUser[account.login]).length} days for ${account.login}`);
}

const usernames = ACCOUNTS.map((a) => a.login);
const allDates = new Set();
for (const login of usernames) {
  for (const date of Object.keys(perUser[login])) allDates.add(date);
}

const days = [...allDates].sort().map((date) => {
  const byUser = Object.fromEntries(usernames.map((login) => [login, perUser[login][date] ?? 0]));
  const total = Object.values(byUser).reduce((a, b) => a + b, 0);
  return { date, total, byUser };
});

const output = {
  generatedAt: new Date().toISOString(),
  usernames,
  yearsBack: YEARS_BACK,
  days,
};

await import("node:fs/promises").then((fs) => fs.writeFile(OUT_PATH, JSON.stringify(output)));
console.log(`Wrote ${days.length} days to ${OUT_PATH.pathname}`);
