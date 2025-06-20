import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export default function Header() {
  const [query, setQuery] = useState("");
  const [isSearchBarVisible, setSearchBarVisibility] = useState(true);

  const navigate = useNavigate();

  return (
    <header className="sticky top-2 z-50 my-4 flex h-full flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 shadow dark:border-none dark:bg-stone-900 dark:text-stone-100">
      <NavLink to="/" className="flex flex-row items-center gap-4">
        <h1 className="text-3xl ml-4 font-bold">mirimiru</h1>
      </NavLink>
      <div className="flex flex-row items-center gap-4">
        <NavLink
          to={"/latest"}
          className="rounded-3xl px-6 py-2 hover:bg-gray-200/50 dark:hover:bg-stone-700/50"
        >
          <h1>Latest</h1>
        </NavLink>
        <NavLink
          to={"/popular"}
          className="rounded-3xl px-6 py-2 hover:bg-gray-200/50 dark:hover:bg-stone-700/50"
        >
          <h1>Popular</h1>
        </NavLink>
        <NavLink
          to={"/genres"}
          className="rounded-3xl px-6 py-2 hover:bg-gray-200/50 dark:hover:bg-stone-700/50"
        >
          <h1>Genres</h1>
        </NavLink>
        <NavLink
          to={"/nsfw"}
          className="rounded-3xl px-6 py-2 hover:bg-gray-200/50 dark:hover:bg-stone-700/50"
        >
          <h1>NSFW</h1>
        </NavLink>
      </div>
      {isSearchBarVisible ? (
        <div className="flex flex-row items-center gap-4">
          <label className="input flex flex-row items-center gap-4 dark:bg-stone-700">
            <Search size={24} className="text-[#242424] dark:text-stone-50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(kbd) => {
                if (kbd.key === "Enter" && query) {
                  navigate(`/search/${query.replaceAll(" ", "_")}`);
                }
              }}
            />
          </label>
          <button
            className="dark:hover-bg-stone-700 rounded-3xl p-1 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-stone-700"
            onClick={() => setSearchBarVisibility(false)}
          >
            <ChevronRight size={24} className="shrink-0" />
          </button>
        </div>
      ) : (
        <button
          className="rounded-3xl p-1 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-stone-700"
          onClick={() => setSearchBarVisibility(true)}
        >
          <Search size={24} className="shrink-0" />
        </button>
      )}
    </header>
  );
}
