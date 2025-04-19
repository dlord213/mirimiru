import { Clock } from "lucide-react";
import Header from "./components/Header";

import { useEffect } from "react";
import { NavLink, useLoaderData } from "react-router";
import dayjs from "dayjs";

export default function Search() {
  const data = useLoaderData();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <main className="relative mx-auto mb-12 flex min-h-screen max-w-7xl flex-col gap-4">
      <Header />
      <div className="flex flex-col">
        <p className="text-gray-400">Searched for</p>
        <h1 className="text-4xl font-bold">
          {data.query.replaceAll("_", " ")}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.mangas.map((manga: any) => (
          <NavLink
            to={`/manga/${manga.mangaUrl}`}
            className="grid grid-cols-2 items-start gap-4 overflow-hidden"
          >
            <img
              src={`/api/image-proxy?url=${manga.imageUrl}`}
              className="h-full rounded-3xl object-cover shadow"
            />
            <div className="flex flex-col gap-6 overflow-hidden">
              <h1 className="max-h-[128px] text-xl font-medium">
                {manga.title}
              </h1>
              <div className="flex flex-row items-center gap-4">
                <Clock size={24} color="#242424" />
                <p className="">
                  {dayjs(manga.lastUpdated).format("MM/DD").toString()}
                </p>
              </div>
              <ul className="menu bg-base-300 rounded-box">
                {manga.chapters.map((chapter: any) => (
                  <li>
                    <NavLink to={`/manga/${manga.mangaUrl}/${chapter.url}`}>
                      {chapter.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </NavLink>
        ))}
      </div>
    </main>
  );
}
