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
import { LabelComboBox } from "./LabelComboBox";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({
    language: "",
    state: "none",
    user: "",
    label: "",
    issue: "",
  });
  const [orderBy, setOrderBy] = useState("");

  const router = useRouter();

  function updateQueryParams(key: string, value: string) {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  }

  function getResults(e: FormEvent) {
    e.preventDefault();

    const paramsToQuery = Object.entries(queryParams)
      .filter(([, val]) => val !== "none" && val !== "")
      .map(
        ([key, val]) => encodeURIComponent(key) + ":" + encodeURIComponent(val)
      )
      .join("+");

    let queryString = "";

    if (query !== "") {
      queryString += `query=${encodeURIComponent(`"${query}"`)}${
        paramsToQuery.length > 0 ? "+" : ""
      }`;
    }

    if (query === "") {
      if (paramsToQuery.length === 0) {
        toast("Enter some filters to display issues");
        return;
      }
      queryString += "query=";
    }

    queryString += paramsToQuery;

    if (orderBy !== "" && orderBy !== "none") {
      queryString += `&sort=${orderBy}`;
    }

    queryString += "&page=1";

    router.push(`?${queryString}`);
  }

  return (
    <form onSubmit={getResults} className="flex flex-wrap gap-8 items-center">
      <div className="flex flex-col gap-2 flex-1 items-start">
        <Label>Search text in issue</Label>
        <Input
          value={query}
          placeholder="Search for any issues"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Language</Label>
        <Input
          value={queryParams.language}
          placeholder="Language"
          onChange={(e) => updateQueryParams("language", e.target.value)}
        />
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Status</Label>
        <Select
          value={queryParams.state}
          onValueChange={(val) => updateQueryParams("state", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Labels</Label>
        <LabelComboBox
          updateQueryParams={updateQueryParams}
          labelValue={queryParams.label}
        />
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Order results</Label>
        <Select value={orderBy} onValueChange={(val) => setOrderBy(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Order results" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="comments">Comments</SelectItem>
            <SelectItem value="reactions">Reactions</SelectItem>
            <SelectItem value="interactions">Interactions</SelectItem>
            <SelectItem value="created">Created on</SelectItem>
            <SelectItem value="updated">Updated on</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Repo Owner</Label>
        <Input
          value={queryParams.user}
          onChange={(e) => updateQueryParams("user", e.target.value)}
        />
      </div>

      <Button type="submit">Search</Button>
    </form>
  );
}
