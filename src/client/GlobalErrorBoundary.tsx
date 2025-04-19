import { AlertTriangle } from "lucide-react";
import { NavLink } from "react-router";

export default function GlobalErrorBoundary() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-8 rounded-3xl border border-gray-300 bg-gray-50 px-12 py-4 shadow">
          <AlertTriangle size={64} color={"#242424"} />
          <div className="flex flex-col">
            <p className="text-gray-600">Error</p>
            <h1 className="text-xl font-bold">Something's wrong, try again.</h1>
          </div>
        </div>
        <NavLink to={"/"} className="btn btn-soft btn-neutral btn-lg">
          <p>Home</p>
        </NavLink>
      </div>
    </div>
  );
}
