// app/home/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Componets/navbar";
import "../globals.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const [inputValue, setInputValue] = useState("");

  // create (or reuse) a session for this user
  useEffect(() => {
    const existing = sessionStorage.getItem("agent_session_id");
    const uuid = existing ?? crypto.randomUUID();
    sessionStorage.setItem("agent_session_id", uuid);

    if (isLoading || !isAuthenticated || !user) return;

    (async () => {
      try {
        await getAccessTokenSilently();
        const username = (user?.name ?? "").replace(/\s+/g, "_");
        sessionStorage.setItem("agent_username", username);

        // start session on backend (fire-and-forget)
        const link = `http://localhost:8000/apps/base_agent/users/${username}/sessions/${uuid}`;
        fetch(link, { method: "POST", headers: { "Content-Type": "text/plain" }, body: "" }).catch(
          () => {}
        );
      } catch {
        // ignore; we still allow local UX
      }
    })();
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently]);

  const handleSend = () => {
    sessionStorage.setItem("agent_input", inputValue.trim());
    router.push("/display");
  };

  return (
    <div className="bg-[#0A014F] min-h-screen overflow-hidden text-white">
      <div className="absolute top-5 left-5">
        <Navbar />
      </div>

      <iframe
        className="h-120 w-250 flex mx-auto rounded-full pt-5 mb-5"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGlFIC2YyWVZEEGYJbLQMdBujLkLgWkUg&q=United+States"
      />

      <div className="flex justify-center">
        <p>Character Limit: {inputValue.length}/250</p>
      </div>

      <div className="flex justify-center">
        <textarea
          className="textarea bg-gray-400 w-250 h-35 text-black"
          maxLength={250}
          placeholder="Place where you want to vacation here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="flex justify-center mt-5">
        <button
          className="btn btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
          onClick={handleSend}
          disabled={!inputValue.trim()}
        >
          Done
        </button>
      </div>
    </div>
  );
}
