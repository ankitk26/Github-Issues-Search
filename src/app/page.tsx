import IssueCard from "@/components/IssueCard";
import IssuePagination from "@/components/IssuePagination";
import SearchBox from "@/components/SearchBox";
import { searchIssues } from "@/lib/actions";
import { Issue } from "@/types/types";

interface Props {
  searchParams: {
    query: string;
    page: number;
  };
}

export default async function Home({ searchParams }: Props) {
  const query = searchParams.query;
  const page = searchParams.page;

  const issues: Issue[] = await searchIssues(query, page);

  return (
    <section>
      <SearchBox />

      {query && <IssuePagination />}
      {query && (
        <div className="m-10 grid grid-cols-3 gap-4">
          {issues?.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </section>
  );
}
