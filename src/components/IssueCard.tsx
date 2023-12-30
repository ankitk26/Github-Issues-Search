import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Issue } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons";

interface Props {
  issue: Issue;
}

export default function IssueCard({ issue }: Props) {
  const getUserProfile = (username: string) => `https://github.com/${username}`;

  const issueRepoUrl = issue.url.replace("api.", "").replace("repos/", "");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          {issue.state === "open" && (
            <LockOpen2Icon className="w-4 h-4 text-orange-500" />
          )}
          {issue.state === "closed" && (
            <LockClosedIcon className="w-4 h-4 text-purple-500" />
          )}
          <CardTitle>{issue.title}</CardTitle>
        </div>
        <CardDescription>
          <a href={issueRepoUrl} target="_blank" className="hover:underline">
            {issueRepoUrl}
          </a>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-3 mt-3">
          {issue.labels.length > 0 &&
            issue.labels.map((label) => (
              <Badge key={label.id}>{label.name}</Badge>
            ))}
        </div>
        {issue.assignee && (
          <div className="mt-4">
            <small>
              Assigned to{" "}
              <a
                href={`https://github.com/${issue.assignee.login}`}
                target="_blank"
                className="underline"
              >
                {issue.assignee.login}
              </a>
            </small>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-2 mt-3">
        <Avatar>
          <AvatarImage src={issue.user.avatar_url} alt={issue.user.login} />
          <AvatarFallback>{issue.user.login[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <small className="muted">
            Created by{" "}
            <a
              href={getUserProfile(issue.user.login)}
              target="_blank"
              className="underline"
            >
              {issue.user.login}
            </a>
          </small>
          <small className="text-xs text-gray-500">
            {new Date(issue.created_at).toLocaleDateString()}
          </small>
        </div>
      </CardFooter>
    </Card>
  );
}
