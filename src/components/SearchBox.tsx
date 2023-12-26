"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({
    language: "",
    state: "all",
    user: "",
  });

  const router = useRouter();

  function updateQueryParams(key: string, value: string) {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  }

  function getResults(e: FormEvent) {
    e.preventDefault();

    const keys = Object.keys(queryParams);

    const paramsToQuery = keys
      .filter((key) => {
        if (key === "state" && queryParams.state === "all") {
          return false;
        }
        return queryParams[key] !== "";
      })
      .map(
        (key) =>
          encodeURIComponent(key) + ":" + encodeURIComponent(queryParams[key])
      )
      .join("+");

    let queryString = "";
    if (query !== "") {
      queryString += `query=${encodeURIComponent(query)}${
        paramsToQuery.length > 0 ? "+" : ""
      }`;
    }

    if (query === "") {
      queryString += "query=";
    }

    queryString += paramsToQuery;
    console.log(queryString);

    router.push(`?${queryString}&page=1`);
  }

  return (
    <form onSubmit={getResults} className="m-10 flex gap-4 items-center">
      <Input
        value={query}
        placeholder="Search for any issues"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Input
        value={queryParams.language}
        placeholder="Language"
        onChange={(e) => updateQueryParams("language", e.target.value)}
      />
      <Select
        value={queryParams.state}
        onValueChange={(val) => updateQueryParams("state", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      <Input
        value={queryParams.user}
        placeholder="Repo owner"
        onChange={(e) => updateQueryParams("user", e.target.value)}
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
