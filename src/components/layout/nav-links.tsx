import Link from "next/link";
import { Button } from "../ui/button";
const NavLinks = () => {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <Button variant={"ghost"} asChild size={"lg"}>
          <Link href="/categories">Categories</Link>
        </Button>
      </li>
      <li>
        <Button variant={"ghost"} asChild size={"lg"}>
          <Link href="/dashboard">Projects</Link>
        </Button>
      </li>
    </ul>
  );
};
export default NavLinks;
