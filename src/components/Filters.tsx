"use client";
import { issueLabels } from "@/data/constants";
import { TextIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
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
import { useMemo, useState } from "react";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultSearchParams = useMemo(() => {
    return {
      search: searchParams.get("search")?.replaceAll('"', "") ?? "",
      language: searchParams.get("language") ?? "",
      state: searchParams.get("state") ?? "none",
      label: searchParams.get("label")?.replaceAll('"', "") ?? "none",
      sort: searchParams.get("sort") ?? "none",
      assignee: searchParams.get("assignee") ?? "none",
      user: searchParams.get("user") ?? "",
      labelInput: searchParams.has("input")
        ? searchParams.get("label") ?? "none"
        : "",
    };
  }, [searchParams]);

  const [labelAsInput, setLabelAsInput] = useState(searchParams.has("input"));

  function searchIssues(data: FormData) {
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
      if (key === "label-input") {
        finalParams += "&input=1";
      }
      params[key === "label-input" ? "label" : key] = val
        .toString()
        .replaceAll('"', "");
    });

    if (Object.entries(params).length === 0) {
      toast("Enter some filters to display issues");
      return;
    }

    const queryString = Object.entries(params)
      .map(([key, val]) => {
        const value =
          val.toString().replaceAll('"', "").split(" ").length > 1
            ? `"${val}"`
            : val;
        return key + "=" + encodeURIComponent(value);
      })
      .join("&");

    // console.log(queryString);
    router.replace(`?${queryString}${finalParams}`);
  }

  return (
    <form
      action={searchIssues}
      className="grid items-stretch lg:grid-cols-4 gap-x-8 gap-y-10"
    >
      <div className="flex flex-col items-start gap-3">
        <Label>Search text</Label>
        <Input
          name="search"
          placeholder="Search in title, body and comments"
          defaultValue={defaultSearchParams.search}
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <Label>Language</Label>
        <Input
          name="language"
          placeholder="python"
          defaultValue={defaultSearchParams.language}
        />
      </div>

      <div className="flex flex-col items-start gap-3">
        <Label>Status</Label>
        <Select name="state" defaultValue={defaultSearchParams.state}>
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

      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <Label>Labels</Label>
          <button
            type="button"
            onClick={() => setLabelAsInput((prev) => !prev)}
            className={labelAsInput ? "text-purple-500" : "text-gray-500"}
          >
            <TextIcon />
          </button>
        </div>

        {labelAsInput ? (
          <Input
            name="label-input"
            placeholder="Enter label"
            defaultValue={defaultSearchParams.labelInput}
          />
        ) : (
          <Select name="label" defaultValue={defaultSearchParams.label}>
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
        )}
      </div>

      <div className="flex flex-col items-start gap-3">
        <Label>Order results</Label>
        <Select name="sort" defaultValue={defaultSearchParams.sort}>
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

      <div className="flex flex-col items-start gap-3">
        <Label>Has assignee</Label>
        <Select name="assignee" defaultValue={defaultSearchParams.assignee}>
          <SelectTrigger>
            <SelectValue placeholder="Assignee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">All</SelectItem>
            <SelectItem value="no">No Assignee</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col items-start gap-3">
        <Label>Repo Owner</Label>
        <Input
          name="user"
          defaultValue={defaultSearchParams.user}
          placeholder="ankitk26"
        />
      </div>

      <Button type="submit" className="w-full h-full">
        Search
      </Button>
    </form>
  );
}
