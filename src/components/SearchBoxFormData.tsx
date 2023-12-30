"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { issueLabels } from "@/data/constants";

export default function SearchBoxFormData() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // function getResults(e: FormEvent) {
  //   e.preventDefault();

  //   const finalParams = { ...queryParams };
  //   if (hasAssignee === "no") {
  //     finalParams["no"] = "assignee";
  //     localStorage.setItem("assignee", "no");
  //   } else {
  //     localStorage.removeItem("assignee");
  //   }

  //   const paramsToQuery = Object.entries(finalParams)
  //     .filter(([key, val]) => {
  //       localStorage.removeItem(key);
  //       return val !== "none" && val !== "";
  //     })
  //     .map(([key, val]) => {
  //       localStorage.setItem(key, val);
  //       return key + ":" + val;
  //     })
  //     .join(" ");

  //   if (searchText === "" && paramsToQuery.length === 0) {
  //     toast("Enter some filters to display issues");
  //     return;
  //   }

  //   let queryString = "?query=";

  //   if (searchText !== "") {
  //     queryString += `"${searchText}" `;
  //     localStorage.setItem("searchText", searchText);
  //   } else {
  //     localStorage.removeItem("searchText");
  //   }

  //   queryString += paramsToQuery;

  //   if (orderBy !== "none") {
  //     queryString += `&sort=${orderBy}`;
  //   }

  //   queryString += "&page=1";

  //   console.log(queryString);
  //   router.replace(queryString);
  // }

  function handleForm(data: FormData) {
    let params = {} as {
      [key: string]: string | number;
    };

    let finalParams = "&page=1";
    data.forEach((val, key) => {
      if (val === "" || val === "none") {
        return;
      }
      if (key === "sort") {
        finalParams += `&sort=${val}`;
        return;
      }
      params[key] = val.toString();
    });

    if (Object.entries(params).length === 0) {
      toast("Enter some filters to display issues");
      return;
    }

    const queryString = Object.entries(params)
      .map(([key, val]) => {
        const value = val.toString().split(" ").length > 1 ? `"${val}"` : val;
        return key + "=" + encodeURIComponent(value);
      })
      .join("&");

    console.log("client", queryString);
    router.replace(`?${queryString}${finalParams}`);
  }

  return (
    <form action={handleForm} className="flex flex-wrap gap-8 items-center">
      <div className="flex flex-col gap-2 items-start">
        <Label>Search text in issue</Label>
        <Input
          name="search"
          placeholder="Search for any issues"
          defaultValue={searchParams.get("search") ?? ""}
        />
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Language</Label>
        <Input
          name="language"
          placeholder="Language"
          defaultValue={searchParams.get("language") ?? ""}
        />
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Status</Label>
        <Select name="state" defaultValue={searchParams.get("state") ?? ""}>
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
        <Select name="label" defaultValue={searchParams.get("label") ?? "none"}>
          <SelectTrigger>
            <SelectValue placeholder="Label" />
          </SelectTrigger>
          <SelectContent>
            {issueLabels.map((label) => (
              <SelectItem key={label.value} value={label.value}>
                {label.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Order results</Label>
        <Select name="sort" defaultValue={searchParams.get("sort") ?? "none"}>
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
          name="assignee"
          defaultValue={searchParams.get("assignee")?.toString() ?? "none"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            <SelectItem value="no">No Assignee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Repo Owner</Label>
        <Input name="user" defaultValue={searchParams.get("user") ?? ""} />
      </div>

      <Button type="submit">Search</Button>
    </form>
  );
}
