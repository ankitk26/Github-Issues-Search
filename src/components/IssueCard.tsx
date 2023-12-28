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
  const issueUserGithubUrl = `https://github.com/${issue.user.login}`;
  const issueRepoUrl = issue.url.replace("api.", "").replace("repos/", "");

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 flex-wrap items-center">
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
        <div className="flex items-center gap-1 flex-wrap">
          {issue.labels.length > 0 &&
            issue.labels.map((label) => (
              <Badge key={label.name}>{label.name}</Badge>
            ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={issue.user.avatar_url} alt={issue.user.login} />
          <AvatarFallback>{issue.user.login[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <small className="muted">
            Created by{" "}
            <a href={issueUserGithubUrl} target="_blank" className="underline">
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
