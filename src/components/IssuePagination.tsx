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
  const params = useSearchParams();
  const query = params.get("query");
  const page = Number(params.get("page"));

  const totalPages = Math.ceil(totalCount / 30);

  const startPage = Math.max(1, page - 4);
  const endPage = Math.min(totalPages, startPage + 9);

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <>
            <PaginationLink
              aria-label="Go to next page"
              size="default"
              href={`/?query=${query}&page=1`}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </PaginationLink>
            <PaginationItem>
              <PaginationPrevious href={`/?query=${query}&page=${page - 1}`} />
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
              href={`/?query=${query}&page=${pageNumber}`}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page !== totalPages && (
          <>
            <PaginationItem>
              <PaginationNext href={`/?query=${query}&page=${page + 1}`} />
            </PaginationItem>
            <PaginationLink
              aria-label="Go to next page"
              size="default"
              href={`/?query=${query}&page=${totalPages}`}
            >
              <DoubleArrowRightIcon className="h-4 w-4" />
            </PaginationLink>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
}
