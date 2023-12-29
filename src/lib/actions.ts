"use server";

import { Issue, SearchParams } from "@/types/types";

export async function searchIssues(searchParams: SearchParams): Promise<{
  issues: Issue[] | null;
  totalCount: number;
}> {
  try {
    console.log(searchParams);

    const paramsMap = new Map<string, string>(Object.entries(searchParams));

    let queryString = "q=";
    if (paramsMap.has("search")) {
      queryString += paramsMap.get("search");
    }

    queryString += Object.entries(searchParams)
      .map(([key, val]) => {
        if (key === "search" || key === "page" || key === "sort") {
          return "";
        }
        if (key === "assignee") {
          return "no:assignee";
        }
        const value = val.toString().split(" ").length > 1 ? `"${val}"` : val;
        return key + ":" + value;
      })
      .join(" ");

    queryString += "is:issue";

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

    return {
      issues,
      totalCount,
    };
  } catch (e) {
    // console.log(e);
    return {
      issues: null,
      totalCount: 0,
    };
  }
}
