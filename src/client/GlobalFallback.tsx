import { LoaderPinwheel } from "lucide-react";

export default function GlobalFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoaderPinwheel size={128} className="animate-spin" />
    </div>
  );
}
