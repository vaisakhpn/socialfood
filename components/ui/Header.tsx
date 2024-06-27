import Link from "next/link";
import SearchBox from "../SearchBox";
import NavBarActionMenu from "../NavBarActionMenu";

export default function Header() {
  return (
    <div className="w-full  bg-header p-1">
      <header className="header">
        <Link className="text-black font-bold text-xl sm:text-3xl" href="/">
          Logo
        </Link>
        <div className="sm:flex sm:flex-row flex flex-col sm:gap-5 gap-2 text-xs sm:text-sm">
          <SearchBox label="Kochi.." />
          <SearchBox label="Name of the Food or Restaurant" />
        </div>
        <NavBarActionMenu />
      </header>
    </div>
  );
}
