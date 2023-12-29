"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchText") ?? ""
  );
  const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({
    language: localStorage.getItem("language") ?? "",
    state: localStorage.getItem("state") ?? "none",
    label: localStorage.getItem("label") ?? "none",
    user: localStorage.getItem("user") ?? "",
  });
  const [hasAssignee, setHasAssignee] = useState(
    localStorage.getItem("assignee") ?? "all"
  );
  const [orderBy, setOrderBy] = useState(
    searchParams.get("sort")?.toString() ?? "none"
  );

  function updateQueryParams(key: string, value: string) {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  }

  function getResults(e: FormEvent) {
    e.preventDefault();

    const finalParams = { ...queryParams };
    if (hasAssignee === "no") {
      finalParams["no"] = "assignee";
      localStorage.setItem("assignee", "no");
    } else {
      localStorage.removeItem("assignee");
    }

    const paramsToQuery = Object.entries(finalParams)
      .filter(([key, val]) => {
        localStorage.removeItem(key);
        return val !== "none" && val !== "";
      })
      .map(([key, val]) => {
        localStorage.setItem(key, val);
        return key + ":" + val;
      })
      .join(" ");

    if (searchText === "" && paramsToQuery.length === 0) {
      toast("Enter some filters to display issues");
      return;
    }

    let queryString = "?query=";

    if (searchText !== "") {
      queryString += `"${searchText}" `;
      localStorage.setItem("searchText", searchText);
    } else {
      localStorage.removeItem("searchText");
    }

    queryString += paramsToQuery;

    if (orderBy !== "none") {
      queryString += `&sort=${orderBy}`;
    }

    queryString += "&page=1";

    console.log(queryString);
    router.replace(queryString);
  }

  return (
    <form onSubmit={getResults} className="flex flex-wrap gap-8 items-center">
      <div className="flex flex-col gap-2 items-start">
        <Label>Search text in issue</Label>
        <Input
          value={searchText}
          placeholder="Search for any issues"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
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
        <Select
          value={orderBy}
          onValueChange={(val) => setOrderBy(val)}
          defaultValue={searchParams.get("sort")?.toString()}
        >
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
        <Label>Has assignee</Label>
        <Select
          value={hasAssignee}
          onValueChange={(val) => setHasAssignee(val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="no">No Assignee</SelectItem>
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
