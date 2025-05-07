import ReactDOM from "react-dom/client";
import Home from "./Home";
import Manga from "./(mangas)/Manga";
import axios from "axios";
import ViewMangaChapter from "./(mangas)/ViewChapter";
import MangaLayout from "./(mangas)/MangaLayout";
import Search from "./Search";
import GlobalFallback from "./GlobalFallback";

import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./global.css";
import GlobalErrorBoundary from "./GlobalErrorBoundary";
import AgeVerify from "./(nsfw)/AgeVerify";
import NSFWHome from "./(nsfw)/Home";
import ManhwaLayout from "./(manhwas)/ManhwaLayout";
import Manhwa from "./(manhwas)/Manhwa";
import ViewManhwaChapter from "./(manhwas)/ViewChapter";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    HydrateFallback: GlobalFallback,
    ErrorBoundary: GlobalErrorBoundary,
  },
  {
    path: "/manga/:mangaTitle",
    loader: async ({ params }) => {
      const { data } = await axios.get(
        `/api/manganato/get-manga-info?title=${params.mangaTitle}`,
      );
      return { ...data };
    },
    HydrateFallback: GlobalFallback,
    Component: MangaLayout,
    ErrorBoundary: GlobalErrorBoundary,
    children: [
      {
        index: true,
        HydrateFallback: GlobalFallback,
        ErrorBoundary: GlobalErrorBoundary,
        Component: Manga,
      },
      {
        path: ":chapter",
        ErrorBoundary: GlobalErrorBoundary,
        HydrateFallback: GlobalFallback,
        Component: ViewMangaChapter,
        loader: async ({ params }) => {
          let { data } = await axios.get(
            `/api/manganato/get-manga-images?title=${params.mangaTitle}&chapter=${params.chapter}`,
          );

          return { ...data, chapter: params.chapter };
        },
      },
    ],
  },
  {
    path: "/search/:query",
    Component: Search,
    loader: async ({ params }) => {
      const { data } = await axios.get(
        `/api/manganato/search-manga?q=${params.query}`,
      );

      return { ...data };
    },
    ErrorBoundary: GlobalErrorBoundary,
    HydrateFallback: GlobalFallback,
  },
  {
    path: "/nsfw",
    ErrorBoundary: GlobalErrorBoundary,
    HydrateFallback: GlobalFallback,
    children: [
      {
        path: "age-verify",
        Component: AgeVerify,
        ErrorBoundary: GlobalErrorBoundary,
        HydrateFallback: GlobalFallback,
      },
      {
        index: true,
        Component: NSFWHome,
      },
    ],
  },
  {
    path: "manhwa/:manhwaTitle",
    loader: async ({ params }) => {
      const { data } = await axios.get(
        `/api/manhwa18cc/get-manhwa-info?title=${params.manhwaTitle}`,
      );
      return { ...data };
    },
    HydrateFallback: GlobalFallback,
    Component: ManhwaLayout,
    ErrorBoundary: GlobalErrorBoundary,
    children: [
      {
        index: true,
        HydrateFallback: GlobalFallback,
        ErrorBoundary: GlobalErrorBoundary,
        Component: Manhwa,
      },
      {
        path: ":chapter",
        ErrorBoundary: GlobalErrorBoundary,
        HydrateFallback: GlobalFallback,
        Component: ViewManhwaChapter,
        loader: async ({ params }) => {
          let { data } = await axios.get(
            `/api/manhwa18cc/get-manhwa-images?title=${params.manhwaTitle}&chapter=${params.chapter}`,
          );

          return { ...data, chapter: params.chapter };
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
