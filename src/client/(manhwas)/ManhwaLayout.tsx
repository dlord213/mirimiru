import { Outlet, useLoaderData } from "react-router";
import ManhwaContext from "../contexts/ManhwaContext";
import { useEffect } from "react";

export default function ManhwaLayout() {
  const manhwaInfo = useLoaderData();

  return (
    <ManhwaContext.Provider value={manhwaInfo}>
      <Outlet />
    </ManhwaContext.Provider>
  );
}
