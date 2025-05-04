import { Outlet, useLoaderData } from "react-router";
import NSFWContext from "../contexts/NSFWContext";

export default function NSFWLayout() {
  const data = useLoaderData();

  return (
    <NSFWContext.Provider value={data}>
      <Outlet />
    </NSFWContext.Provider>
  );
}
