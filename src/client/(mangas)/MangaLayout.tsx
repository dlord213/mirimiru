import { Outlet, useLoaderData } from "react-router";
import MangaContext from "../contexts/MangaContext";

export default function MangaLayout() {
  const mangaInfo = useLoaderData();

  return (
    <MangaContext.Provider value={mangaInfo}>
      <Outlet />
    </MangaContext.Provider>
  );
}
