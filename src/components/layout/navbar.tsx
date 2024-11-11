import UserButton from "@/components/auth/user-button";
import AppLogo from "./app-logo";
import ThemeToggle from "@/components/theme-button";
import CoolProButton from "../subscription/cool-pro-button";

const Navbar = async () => {
  return (
    <header className="flex justify-between items-center p-4 py-4 md:py-8 max-w-[1650px] mx-auto w-full">
      <AppLogo />
      <div className="flex items-center gap-x-2">
        <CoolProButton />
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
};
export default Navbar;
