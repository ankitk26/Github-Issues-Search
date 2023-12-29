"use client";

import { useRouter } from "next/navigation";
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

export default function SearchBoxFormData() {
  const router = useRouter();

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

    data.forEach((val, key) => {
      if (val === "" || val === "none") {
        return;
      }
      params[key] = val.toString();
    });

    const queryString = Object.entries(params)
      .map(([key, val]) => {
        const value = val.toString().split(" ").length > 1 ? `"${val}"` : val;
        return key + "=" + value;
      })
      .join("&");

    router.replace(`?${queryString}&page=1`);

    // console.log(params);
  }

  return (
    <form action={handleForm} className="flex flex-wrap gap-8 items-center">
      <div className="flex flex-col gap-2 items-start">
        <Label>Search text in issue</Label>
        <Input name="search" placeholder="Search for any issues" />
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Language</Label>
        <Input name="language" placeholder="Language" />
      </div>

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Status</Label>
        <Select name="state">
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

      {/* <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Labels</Label>
        <LabelComboBox
          updateQueryParams={updateQueryParams}
          labelValue={queryParams.label}
        />
      </div> */}

      <div className="flex items-start flex-col gap-2 flex-1">
        <Label>Order results</Label>
        <Select name="sort">
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
        <Select name="assignee">
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
        <Input name="user" />
      </div>

      <Button type="submit">Search</Button>
    </form>
  );
}
