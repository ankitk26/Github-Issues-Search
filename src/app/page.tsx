import IssueCard from "@/components/IssueCard";
import IssuePagination from "@/components/IssuePagination";
import SearchBox from "@/components/SearchBox";
import SearchBoxFormData from "@/components/SearchBoxFormData";
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

  if (query !== undefined && totalPages === 1 && page > 1) {
    redirect(`?query=${query}&page=1`);
  }

  return (
    <section className="m-10">
      <SearchBoxFormData />
      {page !== undefined && totalCount > 0 && (
        <IssuePagination totalCount={Math.min(totalCount, 30 * 30)} />
      )}
      {query && (
        <div className="grid grid-cols-3 mt-14 gap-4">
          {issues?.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
      {query && totalCount === 0 && (
        <div className="mt-10 text-center">
          <small>No issues found with given filter</small>
        </div>
      )}
    </section>
  );
}
