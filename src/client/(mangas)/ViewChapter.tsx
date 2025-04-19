import MangaContext from "../contexts/MangaContext";

import { NavLink, To, useLoaderData } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Book, Home } from "lucide-react";

export default function ViewChapter() {
  let data = useLoaderData();
  const mangaData = useContext(MangaContext);

  const [mode, setMode] = useState("Manhwa"); // Manga | Manhwa
  const [currentImageIndex, setCurrentIndex] = useState(0);

  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < data.images.length &&
    setCurrentIndex(currentImageIndex + 1);

  const pages = [
    <>
      <div className="relative flex h-screen overflow-hidden">
        <img
          src={`/api/image-proxy?url=${data.images[currentImageIndex].src}`}
          className="absolute inset-0 h-full w-full object-contain"
        />

        <button
          onClick={gotoPrevious}
          className="z-10 flex w-1/2 items-center justify-start bg-transparent transition-all delay-0 duration-300 hover:bg-gray-800/5"
        >
          <ArrowLeft size={48} className="ml-4 text-white" />
        </button>

        <button
          onClick={gotoNext}
          className="z-10 flex w-1/2 items-center justify-end bg-transparent transition-all delay-0 duration-300 hover:bg-gray-800/5"
        >
          <ArrowRight size={48} className="mr-4 text-white" />
        </button>
      </div>
    </>,
    <>
      <div className="flex flex-col overflow-scroll">
        {data.images.map((_) => (
          <img src={`/api/image-proxy?url=${_.src}`} className="" key={_.alt} />
        ))}
      </div>
    </>,
  ];

  return (
    <main className="relative mx-auto flex h-screen max-w-7xl flex-col gap-4">
      {mode == "Manhwa" ? pages[1] : pages[0]}
      <div className="absolute bottom-4 z-50 flex w-full max-w-xl items-center gap-4 self-center rounded-3xl bg-gray-100 p-4 shadow-lg">
        <NavLink to={`/manga/${mangaData.manga.mangaUrl}`}>
          <Home
            size={36}
            color={"#242424"}
            className="rounded-full p-1 transition-all delay-0 duration-300 hover:cursor-pointer hover:bg-gray-300"
          />
        </NavLink>
        <div className="dropdown dropdown-top flex-1">
          <div className="flex flex-col">
            <p className="text-xs">Reading mode</p>
            <div tabIndex={0} role="button" className="btn m-1 flex gap-4">
              <h1>{mode}</h1>
            </div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
          >
            <div className="card-body">
              <p>Set mode</p>
              <ul tabIndex={0} className="menu rounded-box z-1 w-52 p-2">
                <li onClick={() => setMode("Manga")}>
                  <a>Manga</a>
                </li>
                <li onClick={() => setMode("Manhwa")}>
                  <a>Manhwa</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal" />
        <div className="dropdown dropdown-top flex-1">
          <div className="flex flex-col">
            <p className="text-xs">Chapters</p>
            <div tabIndex={0} role="button" className="btn m-1 flex">
              <h1>
                {data.chapter[0].toUpperCase()}
                {data.chapter.slice(1).replaceAll("-", " ")}
              </h1>
            </div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md"
          >
            <div className="card-body max-h-[50vh] overflow-scroll">
              <p>Chapters</p>
              {mangaData.chapters.map(
                (chapter: {
                  link: string;
                  title: string;
                  uploadDate: string;
                }) => (
                  <NavLink
                    to={`/manga/${mangaData.manga.mangaUrl}/${chapter.link}`}
                    className="flex flex-col gap-2 rounded-3xl bg-gray-100 p-4 shadow"
                    key={chapter.link}
                  >
                    <h1 className="text-lg font-medium">{chapter.title}</h1>
                  </NavLink>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
