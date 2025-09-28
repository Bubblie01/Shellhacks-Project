// app/Componets/TutorialFab.tsx
"use client";

import React, { useEffect, useState } from "react";

export default function TutorialFab() {
  const [open, setOpen] = useState(false);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent background scroll and prevent layout shift by adding body padding
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (open) {
      // width of the removed scrollbar
      const scrollbarWidth = window.innerWidth - root.clientWidth;
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }

    // cleanup on unmount just in case
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <>
      {/* Bottom-right FAB */}
      <button
        type="button"
        aria-label="Open tutorial"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[70] btn btn-lg btn-circle shadow-xl
                   bg-gradient-to-r from-[#4D4092] to-[#7765E3] border-white/20 text-white
                   hover:from-[#6a5be0] hover:to-[#8c82f0]"
      >
        ?
      </button>

      {/* DaisyUI modal (state-driven) */}
      <div
        className={`modal ${open ? "modal-open" : ""} z-[80]`}
        onClick={() => setOpen(false)} // click backdrop to close
        aria-hidden={!open}
      >
        <div
          className="modal-box rounded-3xl bg-[#1b226d]/90 text-white shadow-2xl ring-1 ring-white/15"
          onClick={(e) => e.stopPropagation()} // keep clicks inside
          role="dialog"
          aria-modal="true"
          aria-label="How to use TripMate"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">How to use TripMate</h3>
            <button
              className="btn btn-sm btn-ghost text-white"
              onClick={() => setOpen(false)}
              aria-label="Close tutorial"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <div className="alert bg-white/10 border-white/10">
              <span>1) On the Home page, type your trip details (budget, dates, interests).</span>
            </div>
            <div className="alert bg-white/10 border-white/10">
              <span>2) Click <strong>Done</strong> to send. You’ll see responses stream in like a conversation.</span>
            </div>
            <div className="alert bg-white/10 border-white/10">
              <span>3) On the Itinerary page, keep chatting to refine your plan (preferences, timing, etc.).</span>
            </div>
            <div className="alert bg-white/10 border-white/10">
              <span>Tip: Include known costs (flight/hotel) for a more accurate budget breakdown.</span>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-action">
            <button
              className="btn btn-primary bg-[#3B60E4] border-white/20 hover:bg-[#4a6ef0]"
              onClick={() => setOpen(false)}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
