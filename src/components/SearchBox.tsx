import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function SearchBox() {
  async function redirectToResultsPage(data: FormData) {
    "use server";
    const query = data.get("search-query");
    redirect(`?query=${query}&page=1`);
  }

  return (
    <form
      action={redirectToResultsPage}
      className="m-10 flex gap-4 items-center"
    >
      <Input name="search-query" placeholder="Search for any issues" />
      <Button type="submit">Search</Button>
    </form>
  );
}
