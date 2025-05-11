import axios from "axios";
import Header from "../components/Header";

import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, LoaderPinwheel } from "lucide-react";

export default function ViewLatestReleases() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [IsNSFWVisible, setNSFWVisibility] = useState(false);
  const [currentMangaPage, setCurrentMangaPage] = useState(1);

  const { data: latestMangaReleases } = useQuery({
    queryKey: ["links_latestreleases", currentMangaPage],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/manganato/get-latest-manga?page=${currentMangaPage}`,
      );

      console.log(data);

      return data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const verified = localStorage.getItem("MIRIMIRU_NSFW_AGE_VERIFICATION");

    if (!verified) {
      setNSFWVisibility(false);
    } else if (verified == "verified") {
      setNSFWVisibility(true);
    }

    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <LoaderPinwheel size={128} className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative mx-auto mb-12 flex min-h-screen max-w-7xl flex-col gap-4 dark:bg-stone-950">
      <Header />
      <div className="mb-12 flex h-full flex-col gap-4">
        {latestMangaReleases && latestMangaReleases.status == 200 ? (
          <div className="grid grid-cols-4 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800">
            {latestMangaReleases.mangas.map((release: any) => (
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
      <div className="fixed bottom-2 flex w-full max-w-6xl flex-row items-center justify-between self-center rounded-3xl p-4 dark:bg-stone-900">
        <h1 className="text-2xl font-bold dark:text-stone-50">
          Latest releases
        </h1>
        <div className="flex flex-row items-center gap-2">
          {currentMangaPage != 1 && (
            <button
              className="btn btn-soft btn-neutral btn-lg flex flex-row items-center gap-4 dark:border-none dark:bg-stone-700 dark:text-stone-50 dark:hover:bg-stone-600"
              onClick={() => {
                if (currentMangaPage != 1) {
                  setCurrentMangaPage((prev) => prev - 1);
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
              setCurrentMangaPage((prev) => prev + 1);
              console.log(currentMangaPage);
            }}
          >
            <h1>Next</h1>
            <ChevronRight className="" size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}
