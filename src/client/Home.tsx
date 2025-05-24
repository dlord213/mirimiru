import Header from "./components/Header";
import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { useEffect } from "react";

function Home() {
  const { data: hottestMangaData } = useQuery({
    queryKey: ["home_hottestmangadata"],
    queryFn: async () => {
      const { data } = await axios.get(
        "/api/manganato/get-latest-manga?page=1",
      );

      return data;
    },
    refetchOnWindowFocus: false,
  });

  const { data: latestMangaReleases } = useQuery({
    queryKey: ["home_latestmangareleases"],
    queryFn: async () => {
      const { data } = await axios.get(
        "/api/manganato/get-latest-manga-releases",
      );

      console.log(data);

      return data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    document.title = "mirimiru / Home";
  }, []);

  return (
    <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-4 dark:bg-stone-950">
      <Header />
      <meta name="keywords" content="manga, webtoons, anime" />
      <meta name="description" content="Mirimiru's homepage." />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black dark:text-stone-50">
          Popular titles
        </h1>
        {hottestMangaData && hottestMangaData.status == 200 ? (
          <div className="grid grid-cols-6 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800">
            {hottestMangaData.mangas.slice(0, 6).map((manga: any) => (
              <NavLink
                to={`/manga/${manga.mangaUrl}`}
                key={manga.mangaUrl}
                className="relative max-h-[360px] max-w-[240px] cursor-pointer flex-row gap-4 overflow-hidden rounded-3xl shadow transition-all delay-0 duration-300 hover:scale-105"
              >
                <img
                  src={`/api/image-proxy?url=${manga.imageUrl}`}
                  className="aspect-square h-full object-cover brightness-75"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-gray-400 px-4 py-2">
                  <h1 className="font-bold text-white text-shadow-gray-600 text-shadow-md">
                    {manga.title}
                  </h1>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800">
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
          </div>
        )}
      </div>
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-4xl font-black dark:text-stone-50">
          Latest releases
        </h1>
        {latestMangaReleases && latestMangaReleases.status == 200 ? (
          <div className="grid grid-cols-3 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800">
            {latestMangaReleases.new_releases.map((release: any) => (
              <NavLink
                to={`/manga/${release.mangaUrl}`}
                className="grid grid-cols-2 items-start gap-4 overflow-hidden"
              >
                <img
                  src={`/api/image-proxy?url=${release.imageUrl}`}
                  className="h-full rounded-3xl object-cover shadow"
                />
                <div className="flex flex-col gap-4 overflow-hidden">
                  <h1 className="max-h-[128px] text-xl font-medium dark:text-stone-50">
                    {release.title}
                  </h1>
                  <ul className="menu bg-base-300 rounded-box dark:bg-stone-700 dark:text-stone-50">
                    {release.chapters.map((chapter: any) => (
                      <li>
                        <NavLink
                          to={`/manga/${release.mangaUrl}/${chapter.url}`}
                        >
                          {chapter.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800">
            <div className="grid grid-cols-2 items-start gap-4 overflow-hidden">
              <div className="skeleton h-full" />
              <div className="flex flex-col gap-4">
                <div className="skeleton h-full" />
                <div className="skeleton h-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
