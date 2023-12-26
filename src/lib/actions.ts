"use server";

import { Issue, SearchParams } from "@/types/types";

export async function searchIssues(searchParams: SearchParams): Promise<{
  issues: Issue[] | null;
  resultsCount: number;
}> {
  try {
    console.log(searchParams);
    const query = searchParams.query;
    const page = searchParams.page;

    const queryString = `q=${query}`;

    const url = `https://api.github.com/search/issues?${queryString}&page=${page}`;
    console.log("api call to", url);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        accept: "application/vnd.github+json",
      },
    }).then((res) => res.json());

    const issues = res.items;
    const resultsCount = res.total_count;

    return {
      issues,
      resultsCount,
    };
  } catch (e) {
    console.log(e);
    return {
      issues: null,
      resultsCount: 0,
    };
  }
}
