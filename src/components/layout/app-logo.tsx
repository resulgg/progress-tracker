import Link from "next/link";

const AppLogo = () => {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2 hover:bg-accent rounded-xl transition-all duration-300 ease-in-out p-2 px-4 group relative overflow-hidden"
    >
      <span className="font-extrabold text-3xl text-foreground relative group-hover:text-primary/90 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-primary/80 after:to-primary after:scale-x-0 after:origin-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-left">
        Progress
      </span>
      <span className="bg-gradient-to-br from-primary to-primary/90 p-2 px-4 text-2xl font-bold rounded-xl text-primary-foreground hidden md:block transition-all duration-300 ease-in-out relative before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-background before:to-background/95 before:scale-y-0 before:origin-bottom group-hover:before:scale-y-100 before:transition-transform before:duration-300 before:z-0 group-hover:translate-y-[-2px] overflow-hidden border-2 border-transparent group-hover:border-primary">
        <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
          Tracker
        </span>
      </span>
    </Link>
  );
};
export default AppLogo;
