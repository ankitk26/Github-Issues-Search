"use server";
export async function searchIssues(query: string, page: number) {
  try {
    if (!query) {
      return null;
    }
    const res = await fetch(
      `https://api.github.com/search/issues?q=${query}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data.items);

    return res;
  } catch (e) {
    console.log(e);
  }
}
