import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";

export default function Header() {
  const githubUrl = "https://github.com/ankitk26/Github-Issues-Search";

  return (
    <nav className="flex items-center justify-between px-10 py-4">
      <Link href="/">
        <h3 className="text-xl font-semibold">Github Issues Search</h3>
      </Link>

      <div className="flex items-center gap-5">
        <ThemeToggler />
        <a href={githubUrl} target="_blank">
          <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
        </a>
      </div>
    </nav>
  );
}
