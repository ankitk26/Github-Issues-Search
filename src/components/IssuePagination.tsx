"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { useSearchParams } from "next/navigation";

export default function IssuePagination() {
  const params = useSearchParams();

  return (
    <Pagination>
      <PaginationContent>
        {Array.from(Array(10).keys()).map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i + 1 === Number(params.get("page"))}
              href={`/?query=${params.get("query")}&page=${i + 1}`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
