import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-2 z-50 my-4 flex h-full flex-row items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4 shadow">
      <div className="flex flex-row items-center gap-4">
        <div className="h-[48px] w-[48px] rounded-3xl bg-gray-200" />
        <h1 className="text-xl font-bold">Mirimiru</h1>
      </div>
      <label className="input flex flex-row items-center gap-4">
        <Search size={24} />
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
    </header>
  );
}
