import Filters from "@/components/Filters";
import IssueCard from "@/components/IssueCard";
import IssuePagination from "@/components/IssuePagination";
import { searchIssues } from "@/lib/actions";
import { SearchParams } from "@/types/types";
import { redirect } from "next/navigation";

interface Props {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: Props) {
  const query = searchParams.query;
  const page = Number(searchParams.page);

  const { issues, totalCount } = await searchIssues(searchParams);

  const totalPages = Math.ceil(totalCount / 30);
  const actualCount = Math.min(totalCount, 30 * 30);

  // Redirect to page 1 if redirected to page with no results
  if (query !== undefined && totalPages === 1 && page > 1) {
    redirect(`?query=${query}&page=1`);
  }

  return (
    <section className="m-10">
      <Filters />

      {issues && totalCount > 0 && <IssuePagination totalCount={actualCount} />}

      {issues && (
        <section className="mt-12">
          {totalCount !== 0 && (
            <small className="mb-3">{actualCount} issues found</small>
          )}
          <div className="grid gap-4 lg:grid-cols-3">
            {issues?.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </section>
      )}

      {issues && totalCount === 0 && (
        <div className="mt-10 text-center">
          <small>No issues found with given filter</small>
        </div>
      )}
    </section>
  );
}
