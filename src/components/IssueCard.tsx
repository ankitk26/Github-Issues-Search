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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <a href={""}>
            {issue.repositoryURL}
            {issue.title}
          </a>
        </CardTitle>
        <CardDescription>{issue.repositoryURL}</CardDescription>
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
          <AvatarImage src={issue.user.avatarURL} alt={issue.user.login} />
          <AvatarFallback>{issue.user.login[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <small className="muted">
          Created by{" "}
          <a href={issueUserGithubUrl} className="underline">
            {issue.user.login}
          </a>
        </small>
      </CardFooter>
    </Card>
  );
}
