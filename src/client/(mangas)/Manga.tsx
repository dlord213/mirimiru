import Header from "../components/Header";
import dayjs from "dayjs";
import MangaContext from "../contexts/MangaContext";

import { NavLink } from "react-router";
import { useContext } from "react";
import { ChartArea, Clock, UserPen } from "lucide-react";

export default function Manga() {
  const data = useContext(MangaContext);

  return (
    <main className="relative mx-auto mb-4 flex min-h-screen max-w-7xl flex-col gap-4">
      <Header />
      <div className="absolute top-4 -z-50 h-[55vh] w-full">
        <img
          src={`/api/image-proxy?url=${data.manga.imageUrl}`}
          className="h-[55vh] w-full rounded-3xl object-cover brightness-[0.35]"
        />
      </div>

      <div className="relative grid grid-flow-row gap-4">
        <div className="flex flex-row items-start gap-8 px-8">
          <img
            src={`/api/image-proxy?url=${data.manga.imageUrl}`}
            className="h-[50vh] rounded-3xl object-contain"
          />
          <div className="flex max-h-[45vh] flex-col gap-4">
            <h1 className="text-3xl font-black text-white text-shadow-black text-shadow-md">
              {data.manga.title}
            </h1>
            {data.manga.alternativeTitles && (
              <p className="h-fit text-sm font-medium text-gray-300 text-shadow-black text-shadow-sm">
                {data.manga.alternativeTitles}
              </p>
            )}
            {data.manga.summary && (
              <p className="h-[23vh] overflow-y-auto font-medium text-gray-200 text-shadow-black text-shadow-sm">
                {data.manga.summary}
              </p>
            )}
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-4">
                <UserPen size={24} color="#efefef" />
                {data.manga.authors.map((author: string) => (
                  <p className="text-gray-200 text-shadow-black text-shadow-sm">
                    {author}
                  </p>
                ))}
              </div>
              <div className="flex flex-row items-center gap-4">
                <Clock size={24} color="#efefef" />
                <p className="text-gray-200 text-shadow-black text-shadow-sm">
                  {data.manga.lastUpdated}
                </p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <ChartArea size={24} color="#efefef" />
                <p className="text-gray-200 text-shadow-black text-shadow-sm">
                  {data.manga.mangaStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[0.5fr_1fr] gap-16 px-8">
          <div className="sticky top-28 flex h-screen flex-col gap-4">
            <h1 className="text-xl font-medium dark:text-stone-50">Genres</h1>
            <div className="flex flex-row flex-wrap gap-2">
              {data.manga.genres.map((genre: string) => (
                <p className="w-fit rounded-xl bg-gray-100 p-4 shadow dark:bg-stone-700 dark:text-stone-50 dark:shadow-none">
                  {genre[0].toUpperCase()}
                  {genre.slice(1).toLowerCase().replaceAll("_", " ")}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-5xl font-black dark:text-stone-50">
                Chapters
              </h1>
              <div className="flex flex-row gap-4">
                <NavLink
                  to={`${data.chapters[data.chapters.length - 1].link}`}
                  className="btn btn-soft btn-neutral dark:border-none dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-700"
                >
                  Start reading
                </NavLink>
                <NavLink
                  to={`${data.chapters[0].link}`}
                  className="btn btn-soft btn-neutral dark:border-none dark:bg-stone-800 dark:text-stone-50 dark:hover:bg-stone-700"
                >
                  Read latest chapter
                </NavLink>
              </div>
            </div>

            {data.chapters.map(
              (chapter: {
                link: string;
                title: string;
                uploadDate: string;
              }) => (
                <NavLink
                  to={chapter.link}
                  className="flex flex-col gap-2 rounded-3xl bg-gray-100 p-4 shadow dark:bg-stone-700 dark:text-stone-50"
                  key={chapter.link}
                >
                  <h1 className="text-lg font-medium">{chapter.title}</h1>
                  <div className="flex flex-row items-center gap-2">
                    <Clock size={24} color={"#99a1af"} />
                    <p className="text-sm text-gray-400">
                      {dayjs(chapter.uploadDate).format("MM/DD/YY")}
                    </p>
                  </div>
                </NavLink>
              ),
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
