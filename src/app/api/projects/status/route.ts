import { projects } from '@/data/projects';
import { NextResponse } from 'next/server';

type GitHubCommit = {
  sha: string;
};

export const revalidate = 3600;

export const GET = async () => {
  const headers = new Headers({
    Accept: 'application/vnd.github+json',
    'User-Agent': 'chad-luman-portfolio-integrity-check',
  });

  if (process.env.GITHUB_TOKEN) {
    headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN}`);
  }

  const statuses = await Promise.all(
    projects.map(async (project) => {
      const repository = new URL(project.repositoryUrl).pathname
        .split('/')
        .filter(Boolean)
        .at(-1);

      try {
        const response = await fetch(
          `https://api.github.com/repos/chadluman/${repository}/commits?per_page=1`,
          { headers, next: { revalidate } },
        );

        if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
        const commits = (await response.json()) as GitHubCommit[];
        const latestRevision = commits[0]?.sha.slice(0, 8) || null;

        return {
          slug: project.slug,
          title: project.title,
          recordedRevision: project.sourceRevision,
          latestRevision,
          current: Boolean(latestRevision?.startsWith(project.sourceRevision)),
          available: true,
        };
      } catch {
        return {
          slug: project.slug,
          title: project.title,
          recordedRevision: project.sourceRevision,
          latestRevision: null,
          current: false,
          available: false,
        };
      }
    }),
  );

  return NextResponse.json(
    { checkedAt: new Date().toISOString(), statuses },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
};
