import Link from "next/link";

const NavBarActionMenu = () => {
  return (
    <div>
      <nav className="flex gap-4">
        <button className="bg-black p-2 px-5 rounded-full items-center hover:bg-slate-700 hidden sm:inline-block">
          <Link className="text-white text-lg" href={""}>
            Offers
          </Link>
        </button>
        <button className="bg-black p-1 sm:p-2 px-2 sm:px-5 rounded-full items-center hover:bg-slate-700">
          <Link className="text-white text-sm sm:text-lg" href="/sign-in">
            Sign in
          </Link>
        </button>
        <button className="bg-red-600 p-2 px-5  rounded-full items-center hover:bg-red-500 hidden sm:inline-block">
          <Link className="text-white text-lg" href={""}>
            +Add
          </Link>
        </button>
      </nav>
    </div>
  );
};

export default NavBarActionMenu;
