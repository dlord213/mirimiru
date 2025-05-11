import Header from "../components/Header";
import axios from "axios";

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";

export default function NSFWHome() {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: trendingManhwasData } = useQuery({
    queryKey: ["home_nsfw_manhwas_trending_manhwas"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manhwa18cc/get-trending-manhwas");

      console.log(data);

      return data;
    },
    refetchOnWindowFocus: false,
  });

  const { data: latestManhwasData } = useQuery({
    queryKey: ["home_nsfw_manhwas_latest_manhwas"],
    queryFn: async () => {
      const { data } = await axios.get("/api/manhwa18cc/get-latest-manhwas");

      console.log(data);

      return data;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const verified = localStorage.getItem("MIRIMIRU_NSFW_AGE_VERIFICATION");

    if (!verified) {
      navigate("/nsfw/age-verify");
    } else if (verified == "verified") {
      setIsInitialized(true);
    } else {
      navigate("/nsfw/age-verify");
    }
  }, [navigate]);

  if (!isInitialized) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <LoaderPinwheel size={128} className="animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative mx-auto mb-12 flex min-h-screen max-w-7xl flex-col gap-4">
      <Header />
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black dark:text-stone-50">
          Popular titles
        </h1>
        {trendingManhwasData && trendingManhwasData.status == 200 ? (
          <div className="grid grid-cols-6 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800 dark:text-stone-50">
            {trendingManhwasData.manhwas.slice(0, 6).map((manhwa: any) => (
              <NavLink
                to={`/manhwa/${manhwa.url}`}
                key={manhwa.url}
                className="relative max-h-[360px] max-w-[240px] cursor-pointer flex-row gap-4 overflow-hidden rounded-3xl shadow transition-all delay-0 duration-300 hover:scale-105"
              >
                <img
                  src={`/api/image-proxy?url=${manhwa.img}`}
                  className="aspect-square h-full object-cover brightness-75"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-gray-400 px-4 py-2">
                  <h1 className="font-bold text-white text-shadow-gray-600 text-shadow-md">
                    {manhwa.title}
                  </h1>
                </div>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4 dark:border-none dark:bg-stone-800 dark:text-stone-50">
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
            <div className="skeleton h-[360px] w-[240px]" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-black dark:text-stone-50">
          Latest releases
        </h1>
        {latestManhwasData && trendingManhwasData.status == 200 ? (
          <div className="grid grid-cols-3 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800 dark:text-stone-50">
            {latestManhwasData.manhwas.map((release: any) => (
              <NavLink
                to={`/manhwa/${release.url}`}
                className="grid grid-cols-2 items-start gap-4 overflow-hidden"
                key={release.url}
              >
                <img
                  src={`/api/image-proxy?url=${release.img}`}
                  className="h-full rounded-3xl object-cover shadow"
                />
                <div className="flex flex-col gap-4 overflow-hidden">
                  <h1 className="max-h-[128px] text-xl font-medium">
                    {release.title}
                  </h1>
                  <ul className="menu bg-base-300 rounded-box dark:bg-stone-700">
                    {release.chapters.map((chapter: any) => (
                      <li>
                        <NavLink to={`/manhwa/${chapter.url}`}>
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
          <div className="grid grid-cols-3 gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-md dark:border-none dark:bg-stone-800 dark:text-stone-50">
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
