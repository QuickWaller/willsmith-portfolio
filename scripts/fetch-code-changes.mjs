// Fetches weekly lines-added/lines-removed stats for all 3 accounts, merges
// them by week into a single JSON file the site reads at runtime — the
// lines-changed counterpart to fetch-contributions.mjs's commit-count heatmap.
//
// Unlike the commit heatmap (GraphQL contributionsCollection, which only
// needs `read:user`), line-level stats require GitHub's per-repo REST stats
// endpoint, which needs read access to repo *contents* — private repos need
// the `repo` scope (classic PAT) or Contents:Read (fine-grained). If a token
// only has `read:user`, private repos will 404/403 here and be silently
// skipped, undercounting the total. See memory/portfolio-site.md.

const ACCOUNTS = [
  { login: "tombstonesuplex", tokenEnv: "CONTRIB_READ_TOKEN" },
  { login: "TheCrocodileDestroyer", tokenEnv: "CONTRIB_READ_TOKEN_2" },
  { login: "QuickWaller", tokenEnv: "CONTRIB_READ_TOKEN_3" },
];
const START_DATE = "2024-09-01T00:00:00Z";
const OUT_PATH = new URL("../public/code-changes.json", import.meta.url);
const REPO_LIMIT = process.env.FETCH_CODE_CHANGES_REPO_LIMIT
  ? Number(process.env.FETCH_CODE_CHANGES_REPO_LIMIT)
  : Infinity;

const REPOS_QUERY = `
  query($cursor: String) {
    viewer {
      login
      repositories(first: 100, after: $cursor, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], isFork: false) {
        pageInfo { hasNextPage endCursor }
        nodes { nameWithOwner }
      }
    }
  }
`;

async function graphql(token, query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}: ${await res.text()}`);
  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`);
  return json.data;
}

async function listRepos(token, expectedLogin) {
  const names = [];
  let cursor = null;
  for (;;) {
    const data = await graphql(token, REPOS_QUERY, { cursor });
    if (data.viewer.login.toLowerCase() !== expectedLogin.toLowerCase()) {
      throw new Error(`token belongs to "${data.viewer.login}", expected "${expectedLogin}" — wrong token in that secret?`);
    }
    for (const node of data.viewer.repositories.nodes) names.push(node.nameWithOwner);
    if (!data.viewer.repositories.pageInfo.hasNextPage) break;
    cursor = data.viewer.repositories.pageInfo.endCursor;
    if (names.length >= REPO_LIMIT) break;
  }
  return names.slice(0, REPO_LIMIT);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// GitHub computes this endpoint's stats asynchronously on first request
// (202 + empty body); retry with backoff until it's ready.
async function fetchContributorStats(token, nameWithOwner) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(`https://api.github.com/repos/${nameWithOwner}/stats/contributors`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (res.status === 202) {
      await sleep(1500 * (attempt + 1));
      continue;
    }
    if (res.status === 204) return []; // empty repo
    if (res.status === 404 || res.status === 403) {
      console.warn(`  skip ${nameWithOwner}: ${res.status} (no access — check token scope)`);
      return null;
    }
    if (!res.ok) throw new Error(`GitHub REST ${res.status} on ${nameWithOwner}: ${await res.text()}`);
    const body = await res.json();
    if (Array.isArray(body) && body.length > 0) return body;
    // 200 with an empty array can also mean "still computing" on first touch
    await sleep(1500 * (attempt + 1));
  }
  console.warn(`  skip ${nameWithOwner}: stats never became ready after retries`);
  return null;
}

function weekISO(unixSeconds) {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

async function fetchAccountWeeks(account) {
  const token = process.env[account.tokenEnv];
  if (!token) throw new Error(`${account.tokenEnv} is not set`);

  const repos = await listRepos(token, account.login);
  console.log(`${account.login}: ${repos.length} repos`);

  const weeks = {};
  let skipped = 0;
  for (const repo of repos) {
    const contributors = await fetchContributorStats(token, repo);
    if (contributors === null) {
      skipped++;
      continue;
    }
    const mine = contributors.find((c) => c.author?.login?.toLowerCase() === account.login.toLowerCase());
    if (!mine) continue;
    for (const w of mine.weeks) {
      if (w.a === 0 && w.d === 0 && w.c === 0) continue;
      const date = weekISO(w.w);
      if (date < START_DATE.slice(0, 10)) continue;
      const bucket = weeks[date] ?? { a: 0, d: 0 };
      bucket.a += w.a;
      bucket.d += w.d;
      weeks[date] = bucket;
    }
    await sleep(250); // be polite to the stats endpoint's secondary rate limit
  }
  if (skipped > 0) {
    console.warn(`  ${account.login}: ${skipped}/${repos.length} repos skipped (no access) — line totals for this account are undercounted`);
  }
  return weeks;
}

const perUser = {};
for (const account of ACCOUNTS) {
  try {
    perUser[account.login] = await fetchAccountWeeks(account);
  } catch (err) {
    console.warn(`${account.login}: failed entirely (${err.message}) — treating as zero weeks so the build still succeeds`);
    perUser[account.login] = {};
  }
}

const usernames = ACCOUNTS.map((a) => a.login);
const allWeeks = new Set();
for (const login of usernames) {
  for (const date of Object.keys(perUser[login])) allWeeks.add(date);
}

const weeks = [...allWeeks].sort().map((date) => {
  const byUser = Object.fromEntries(
    usernames.map((login) => [login, perUser[login][date] ?? { a: 0, d: 0 }]),
  );
  const additions = Object.values(byUser).reduce((sum, w) => sum + w.a, 0);
  const deletions = Object.values(byUser).reduce((sum, w) => sum + w.d, 0);
  return { week: date, additions, deletions, byUser };
});

const output = {
  generatedAt: new Date().toISOString(),
  usernames,
  startDate: START_DATE,
  weeks,
};

await import("node:fs/promises").then((fs) => fs.writeFile(OUT_PATH, JSON.stringify(output)));
console.log(`Wrote ${weeks.length} weeks to ${OUT_PATH.pathname}`);
