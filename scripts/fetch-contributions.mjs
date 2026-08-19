// Fetches GitHub contribution calendars for both accounts and merges them
// by date into a single JSON file the site reads at runtime.
// Requires CONTRIB_READ_TOKEN in the environment (read:user scope only —
// contribution calendars are public data, no repo access needed).

const USERNAMES = ["QuickWaller", "tombstonesuplex"];
const OUT_PATH = new URL("../public/contributions.json", import.meta.url);

const token = process.env.CONTRIB_READ_TOKEN;
if (!token) {
  console.error("CONTRIB_READ_TOKEN is not set");
  process.exit(1);
}

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
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

async function fetchCalendar(login) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status} for ${login}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error for ${login}: ${JSON.stringify(json.errors)}`);
  }

  const days = {};
  for (const week of json.data.user.contributionsCollection.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      days[day.date] = day.contributionCount;
    }
  }
  return days;
}

const perUser = {};
for (const login of USERNAMES) {
  perUser[login] = await fetchCalendar(login);
}

const allDates = new Set();
for (const login of USERNAMES) {
  for (const date of Object.keys(perUser[login])) allDates.add(date);
}

const days = [...allDates].sort().map((date) => {
  const byUser = Object.fromEntries(USERNAMES.map((login) => [login, perUser[login][date] ?? 0]));
  const total = Object.values(byUser).reduce((a, b) => a + b, 0);
  return { date, total, byUser };
});

const output = {
  generatedAt: new Date().toISOString(),
  usernames: USERNAMES,
  days,
};

await import("node:fs/promises").then((fs) => fs.writeFile(OUT_PATH, JSON.stringify(output)));
console.log(`Wrote ${days.length} days to ${OUT_PATH.pathname}`);
