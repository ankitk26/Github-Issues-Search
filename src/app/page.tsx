import IssueCard from "@/components/IssueCard";
import IssuePagination from "@/components/IssuePagination";
import SearchBox from "@/components/SearchBox";
import { searchIssues } from "@/lib/actions";
import { SearchParams } from "@/types/types";

interface Props {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: Props) {
  const query = searchParams.query;

  const { issues, resultsCount } = await searchIssues(searchParams);

  return (
    <section>
      <SearchBox />
      {resultsCount > 0 ||
        (Object.keys(searchParams).length > 0 && <IssuePagination />)}
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
