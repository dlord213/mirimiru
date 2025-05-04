import dayjs from "dayjs";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AgeVerify() {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const handleAgeVerification = () => {
    if (!date) return;

    const birthDate = dayjs(date);
    const today = dayjs();

    const age = today.diff(birthDate, "year");

    if (age < 18) {
      localStorage.setItem("MIRIMIRU_NSFW_AGE_VERIFICATION", "denied");
      alert("You must be at least 18 years old to access this content.");
      navigate("/");
    } else {
      localStorage.setItem("MIRIMIRU_NSFW_AGE_VERIFICATION", "verified");
      navigate("/nsfw");
    }
  };

  return (
    <main className="relative mx-auto mb-12 flex min-h-screen max-w-7xl flex-col items-center justify-center gap-4">
      <div className="flex w-full max-w-xl flex-col gap-4">
        <h1 className="text-3xl font-bold">mirimiru</h1>
        <div className="flex flex-row items-center gap-8 rounded-3xl border-gray-400 bg-gray-50 p-8 shadow">
          <AlertTriangle size={48} className="shrink-0" />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-medium">
              NSFW Warning : Age verification
            </h1>
            <p className="text-sm text-gray-500">
              This site contains adult content. You must be 18 years of age or
              older (or the age of majority in your jurisdiction) to enter. By
              continuing, you confirm that you are of legal age and that you
              consent to viewing explicit adult material. Please enter your date
              of birth to verify your age.
            </p>
            <div className="flex flex-row items-center gap-4">
              <input
                type="date"
                className="input validator"
                required
                placeholder="Pick a date in 2025"
                title="Must be valid URL"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button
                className="btn btn-soft btn-success"
                onClick={handleAgeVerification}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
