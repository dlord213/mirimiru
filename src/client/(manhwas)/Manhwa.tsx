import ManhwaContext from "../contexts/ManhwaContext";
import dayjs from "dayjs";
import Header from "../components/Header";

import { useContext, useEffect } from "react";
import { UserPen, Clock, ChartArea } from "lucide-react";
import { NavLink } from "react-router";

export default function Manhwa() {
  const data = useContext(ManhwaContext);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data.manhwa) {
    return (
      <main className="relative mx-auto mb-4 flex min-h-screen max-w-7xl flex-col gap-4">
        <Header />
        <div className="absolute top-4 -z-50 h-[55vh] w-full">
          <img
            src={`/api/image-proxy?url=${data.manhwa.image}`}
            className="h-[55vh] w-full rounded-3xl object-cover brightness-[0.35]"
          />
        </div>

        <div className="relative grid grid-flow-row gap-4">
          <div className="flex flex-row items-start gap-8 px-8">
            <img
              src={`/api/image-proxy?url=${data.manhwa.image}`}
              className="h-[50vh] rounded-3xl object-contain"
            />
            <div className="flex max-h-[45vh] flex-col gap-4 overflow-scroll">
              <h1 className="text-3xl font-black text-white text-shadow-black text-shadow-md">
                {data.manhwa.title}
              </h1>
              {data.manhwa.alternativeTitles && (
                <p className="h-fit overflow-scroll text-sm font-medium text-gray-300 text-shadow-black text-shadow-sm">
                  {data.manhwa.alternativeTitles}
                </p>
              )}
              {data.manhwa.summary && (
                <p className="h-[22vh] overflow-scroll font-medium text-gray-200 text-shadow-black text-shadow-sm">
                  {data.manhwa.summary}
                </p>
              )}
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-4">
                  <UserPen size={24} color="#efefef" />
                  <p className="text-gray-200 text-shadow-black text-shadow-sm">
                    {data.manhwa.author}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <ChartArea size={24} color="#efefef" />
                  <p className="text-gray-200 text-shadow-black text-shadow-sm">
                    {data.manhwa.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[0.5fr_1fr] gap-16 px-8">
            <div className="sticky top-28 flex h-screen flex-col gap-4">
              <h1 className="text-xl font-medium">Genres</h1>
              <div className="flex flex-row flex-wrap gap-2">
                {data.manhwa.genres.map((genre: string) => (
                  <p className="w-fit bg-gray-100 p-4 shadow" key={genre}>
                    {genre[0].toUpperCase()}
                    {genre.slice(1).toLowerCase().replaceAll("_", " ")}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between">
                <h1 className="text-5xl font-black">Chapters</h1>
                <div className="flex flex-row gap-4">
                  <NavLink
                    to={`${data.manhwa.chapters[data.manhwa.chapters.length - 1].link}`}
                    className="btn btn-soft btn-neutral"
                  >
                    Start reading
                  </NavLink>
                  <NavLink
                    to={`${data.manhwa.chapters[0].link}`}
                    className="btn btn-soft btn-neutral"
                  >
                    Read latest chapter
                  </NavLink>
                </div>
              </div>

              {data.manhwa.chapters.map(
                (chapter: { url: string; title: string; date: string }) => (
                  <NavLink
                    to={chapter.url}
                    className="flex flex-col gap-2 rounded-3xl bg-gray-100 p-4 shadow"
                    key={chapter.url}
                  >
                    <h1 className="text-lg font-medium">{chapter.title}</h1>
                    <div className="flex flex-row items-center gap-2">
                      <Clock size={24} color={"#99a1af"} />
                      <p className="text-sm text-gray-400">
                        {dayjs(chapter.date).format("MM/DD/YY")}
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
}
