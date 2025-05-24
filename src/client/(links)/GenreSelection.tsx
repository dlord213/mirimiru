import axios from "axios";
import Header from "../components/Header";

import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, LoaderPinwheel } from "lucide-react";
import { GENRES } from "../types";

export default function ViewGenres() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery({
    enabled: !!selectedGenre,
    retry: 2,
    refetchOnWindowFocus: false,
    queryKey: [selectedGenre, "selected-genre", currentPage],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/api/manganato/get-filtered-genre-mangas?genre=${selectedGenre}&page=${currentPage == 1 ? 1 : currentPage}`,
        );

        console.log(data);

        return data;
      } catch (err) {
        throw err;
      }
    },
  });

  return (
    <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-4 dark:bg-stone-950">
      <Header />
      <meta name="keywords" content="genres, mangas, anime, manga, webtoon" />
      <meta
        name="description"
        content="Finding mangas by genre? Check out here in Mirimiru."
      />
      <h1 className="text-4xl font-black dark:text-stone-50">Genres</h1>
      <div className="flex flex-row flex-wrap gap-4">
        {GENRES.map((genre) => (
          <button
            className={
              selectedGenre == genre.name.toLowerCase()
                ? "btn btn-soft btn-neutral btn-active rounded-3xl p-4"
                : "btn btn-soft btn-neutral rounded-3xl p-4"
            }
            key={genre.url}
            onClick={() => {
              const query = genre.url.split("/").pop();
              setSelectedGenre(query);
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>
      <div className="mb-24 flex h-full flex-col gap-4">
        {data && data.status == 200 ? (
          <div className="grid grid-cols-4 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800">
            {data.mangas.map((release: any) => (
              <NavLink
                to={`/manga/${release.mangaUrl}`}
                className="flex flex-col gap-4 overflow-auto"
              >
                <img
                  src={`/api/image-proxy?url=${release.imageUrl}`}
                  className="h-full rounded-3xl object-cover shadow"
                />
                <h1 className="w-full text-xl font-medium text-ellipsis dark:text-stone-50">
                  {release.title}
                </h1>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800 dark:shadow-none">
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
      {data && data.status == 200 && (
        <div className="fixed bottom-2 flex w-full max-w-6xl flex-row items-center justify-between self-center rounded-3xl p-4 dark:bg-stone-900">
          <h1 className="text-2xl font-bold dark:text-stone-50">
            Page {currentPage}
          </h1>
          <div className="flex flex-row items-center gap-2">
            {currentPage != 1 && (
              <button
                className="btn btn-soft btn-neutral btn-lg flex flex-row items-center gap-4 dark:border-none dark:bg-stone-700 dark:text-stone-50 dark:hover:bg-stone-600"
                onClick={() => {
                  if (currentPage != 1) {
                    setCurrentPage((prev) => prev - 1);
                  }
                }}
              >
                <ChevronLeft className="" size={16} />
                <h1>Previous</h1>
              </button>
            )}

            <button
              className="btn btn-soft btn-neutral btn-lg flex flex-row items-center gap-4 dark:border-none dark:bg-stone-700 dark:text-stone-50 dark:hover:bg-stone-600"
              onClick={() => {
                setCurrentPage((prev) => prev + 1);
                console.log(currentPage);
              }}
            >
              <h1>Next</h1>
              <ChevronRight className="" size={16} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
