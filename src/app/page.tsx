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
  const page = searchParams.page;

  const { issues, totalCount } = await searchIssues(searchParams);

  return (
    <section>
      <SearchBox />
      {(totalCount > 0 || page !== undefined) && (
        <IssuePagination totalCount={Math.min(totalCount, 30 * 30)} />
      )}
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
