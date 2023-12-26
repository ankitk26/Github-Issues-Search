import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";

export default function Header() {
  return (
    <nav className="px-10 py-4 flex items-center justify-between">
      <Link href="/">
        <h3>Github Issues Search</h3>
      </Link>
      <ThemeToggler />
    </nav>
  );
}
