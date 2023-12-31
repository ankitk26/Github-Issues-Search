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

import { useSearchParams } from "next/navigation";

interface Props {
  totalCount: number;
}

export default function IssuePagination({ totalCount }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));

  const params = new URLSearchParams(searchParams);

  // const currentUrl = "/?" + params.toString().replace(`&page=${page}`, "");
  const entries = Object.fromEntries(params.entries());
  const currentUrl =
    "/?" +
    Object.entries(entries)
      .map(([key, val]) => `${key}=${val}`)
      .join("&")
      .replace(`&page=${page}`, "");

  const totalPages = Math.ceil(totalCount / 30);

  const startPage = Math.max(1, page - 4);
  const endPage = Math.min(totalPages, startPage + 9);

  if (totalPages === 1) {
    return null;
  }

  return (
    <Pagination className="mt-20">
      <PaginationContent>
        {page !== 1 && totalPages > 10 && (
          <>
            <PaginationLink
              aria-label="Go to next page"
              size="default"
              href={`${currentUrl}&page=1`}
            >
              <DoubleArrowLeftIcon className="w-4 h-4" />
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
              <DoubleArrowRightIcon className="w-4 h-4" />
            </PaginationLink>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
