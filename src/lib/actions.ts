"use server";

import { Issue, SearchParams } from "@/types/types";

export async function searchIssues(searchParams: SearchParams): Promise<{
  issues: Issue[] | null;
  totalCount: number;
}> {
  try {
    const paramsMap = new Map<string, string>(Object.entries(searchParams));
    if (paramsMap.size === 0) {
      return {
        issues: null,
        totalCount: 0,
      };
    }

    let queryString = "q=";
    if (paramsMap.has("search")) {
      queryString += paramsMap.get("search") + " ";
    }

    queryString += Object.entries(searchParams)
      .filter(([key]) => !["search", "page", "sort", "input"].includes(key))
      .map(([key, val]) => {
        if (key === "assignee") {
          return "no:assignee";
        }
        return `${key}:${val}`;
      })
      .join(" ");

    queryString += " is:issue";

    if (paramsMap.has("sort")) {
      queryString += `&sort=${paramsMap.get("sort")}`;
    }

    queryString += `&page=${paramsMap.get("page")}`;

    const url = `https://api.github.com/search/issues?${queryString}`;
    console.log(url);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        accept: "application/vnd.github+json",
      },
    }).then((res) => res.json());

    const issues = res.items;
    const totalCount = res.total_count;
    console.log({ totalCount });

    return {
      issues,
      totalCount,
    };
  } catch (e) {
    return {
      issues: null,
      totalCount: 0,
    };
  }
}
