// app/Componets/TutorialFab.tsx
"use client";

import React, { useEffect, useState } from "react";

export default function TutorialFab() {
  const [open, setOpen] = useState(false);

  // ESC closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll + compensate only while open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (open) {
      // lock scroll
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      // compensate if a real scrollbar was removed (Windows)
      if (scrollbarWidth > 0) {
        html.style.paddingRight = `${scrollbarWidth}px`;
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      html.style.paddingRight = "";
      body.style.paddingRight = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      html.style.paddingRight = "";
      body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <>
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

      <div
        className={`modal ${open ? "modal-open" : ""} z-[80]`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <div
          className="modal-box rounded-3xl bg-[#1b226d]/90 text-white shadow-2xl ring-1 ring-white/15"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="How to use Toureigner"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">How to use Toureigner</h3>
            <button className="btn btn-sm btn-ghost text-white" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

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
