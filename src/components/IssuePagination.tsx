"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  totalCount: number;
}

export default function IssuePagination({ totalCount }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const page = Number(searchParams.get("page"));
  const sort = searchParams.get("sort");

  const params = new URLSearchParams(searchParams);

  const currentUrl = `/?query=${query}${
    params.has("sort") ? `&sort=${sort}` : ""
  }`;

  const totalPages = Math.ceil(totalCount / 30);

  const startPage = Math.max(1, page - 4);
  const endPage = Math.min(totalPages, startPage + 9);

  if (totalPages === 1) {
    return null;
  }

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {page !== 1 && (
          <>
            <PaginationLink
              aria-label="Go to next page"
              size="default"
              href={`${currentUrl}&page=1`}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </PaginationLink>
            <PaginationItem>
              <PaginationPrevious href={`${currentUrl}&page=${page - 1}`} />
            </PaginationItem>
          </>
        )}

        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              isActive={pageNumber === page}
              href={`${currentUrl}&page=${pageNumber}`}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page !== totalPages && totalPages > 10 && (
          <>
            <PaginationItem>
              <PaginationNext href={`${currentUrl}&page=${page + 1}`} />
            </PaginationItem>

            <PaginationLink
              aria-label="Go to next page"
              size="default"
              href={`${currentUrl}&page=${totalPages}`}
            >
              <DoubleArrowRightIcon className="h-4 w-4" />
            </PaginationLink>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
