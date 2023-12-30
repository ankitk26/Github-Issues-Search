import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Header() {
  return (
    <nav className="flex items-center justify-between px-10 py-4">
      <Link href="/">
        <h3 className="text-xl font-semibold tracking-wide">
          Github Issues Search
        </h3>
      </Link>
      <div className="flex items-center gap-5">
        <ThemeToggler />
        <a href="https://github.com/ankitk26/git-issues-search" target="_blank">
          <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
        </a>
      </div>
    </nav>
  );
}
