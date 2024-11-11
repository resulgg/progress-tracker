import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Progress Tracker
        </Link>
        <nav className="space-x-4">
          <Link
            href="/auth/login"
            className="text-muted-foreground hover:text-primary"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="text-muted-foreground hover:text-primary"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
} 