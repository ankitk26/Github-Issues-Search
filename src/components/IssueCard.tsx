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

interface Props {
  issue: Issue;
}

export default function IssueCard({ issue }: Props) {
  const issueUserGithubUrl = `https://github.com/${issue.user.login}`;
  const issueRepoUrl = issue.url.replace("api.", "").replace("repos/", "");

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={
            issue.state === "open" ? "text-orange-500" : "text-purple-500"
          }
        >
          {issue.title}
        </CardTitle>
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

        {issue.state}
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={issue.user.avatar_url} alt={issue.user.login} />
          <AvatarFallback>{issue.user.login[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <small className="muted">
          Created by{" "}
          <a href={issueUserGithubUrl} target="_blank" className="underline">
            {issue.user.login}
          </a>
        </small>
      </CardFooter>
    </Card>
  );
}
