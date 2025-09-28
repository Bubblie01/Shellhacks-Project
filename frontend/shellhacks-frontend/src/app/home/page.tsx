// app/home/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Componets/navbar";
import "../globals.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import TutorialFab from "../Componets/TutorialFab";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Container } from "@tsparticles/engine";
import { loadStarsPreset } from '@tsparticles/preset-stars'
import BackgroundParticles from "../Componets/BackgroundParticles";

export default function Home() {
  const router = useRouter();
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const [inputValue, setInputValue] = useState("");
  const maxLen = 250;

  // create (or reuse) a session for this user
  useEffect(() => {
    const existing = sessionStorage.getItem("agent_session_id");
    const uuid = existing ?? crypto.randomUUID();
    sessionStorage.setItem("agent_session_id", uuid);

    if (isLoading || !isAuthenticated || !user) return;

    (async () => {
      try {
        await getAccessTokenSilently();
        const username = (user?.name ?? "").replace(/\s+/g, "_") || "user";
        sessionStorage.setItem("agent_username", username);

        const link = `http://localhost:8000/apps/base_agent/users/${username}/sessions/${uuid}`;
        fetch(link, { method: "POST" }).catch(() => {});
      } catch {
        // allow UX even without token
      }
    })();
  }, [isLoading, isAuthenticated, user, getAccessTokenSilently]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    sessionStorage.setItem("agent_input", trimmed);
    router.push("/display");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#0A014F] min-h-screen overflow-hidden text-white">
      <BackgroundParticles />
      <TutorialFab />

        {/* Navbar trigger */}
        <div className="absolute top-5 left-5">
          <Navbar />
        </div>

        {/* Title with icon (centered, subtle and consistent) */}
        <div className="flex items-center justify-center gap-x-3 mt-8">
          {user && (
            <h1 className="text-3xl font-bold tracking-wide">
              Welcome {user.name}!
            </h1>
          )}
        </div>

        {/* Map */}
        <div className="mx-auto mt-6 w-full max-w-3xl px-4">
          <iframe
            className="aspect-video w-full rounded-2xl shadow-lg border border-white/10"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGlFIC2YyWVZEEGYJbLQMdBujLkLgWkUg&q=United+States"
            title="Location map"
          />
        </div>

        {/* Input area */}
        <div className="mt-6 max-w-3xl mx-auto px-4">
          <div className="flex justify-between text-sm">
            <span
              className={`transition-colors ${
                inputValue.length > maxLen - 20
                  ? "text-red-300"
                  : inputValue.length > maxLen - 50
                  ? "text-amber-300"
                  : "opacity-90"
              }`}
              aria-live="polite"
            >
              Character Limit: {inputValue.length}/{maxLen}
            </span>
            <span className="hidden sm:inline opacity-70">
              Shift+Enter for newline • Enter to send
            </span>
          </div>

          <label htmlFor="agent-textarea" className="sr-only">
            Message for the AI
          </label>

          <textarea
            id="agent-textarea"
            className="textarea w-full h-28 mt-2 resize-none rounded-xl bg-gray-200/95 text-black
                       focus:outline-none focus:ring-2 focus:ring-[#7765E3] focus:ring-offset-2 focus:ring-offset-[#0A014F]"
            maxLength={maxLen}
            placeholder="Type your follow-up for the AI… (Shift+Enter for newline, Enter to send)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKeyDown}
          />

          <div className="flex justify-center mt-5">
            <button
              className="btn btn-success btn-wide md:btn-lg
                         disabled:opacity-50 disabled:cursor-not-allowed
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 active:scale-[0.99] transition"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              type="button"
            >
              Done
            </button>
          </div>
        </div>
      
    </div>
  );
}
