import { LoaderPinwheel } from "lucide-react";
import Header from "../components/Header";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function NSFWHome() {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

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
    </main>
  );
}
