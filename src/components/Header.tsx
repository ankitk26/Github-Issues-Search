import Link from "next/link";

export default function Header() {
  return (
    <nav className="px-10 py-4">
      <Link href="/">
        <h3>Github Issues Search</h3>
      </Link>
    </nav>
  );
}
