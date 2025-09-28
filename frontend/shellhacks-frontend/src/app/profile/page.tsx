"use client";
import Navbar from "../Componets/navbar";
import React, { useMemo, useState } from "react";

type Person = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  bio: string;
  picCss?: string
};

export default function Home() {
  const people: Person[] = useMemo(
    () => [
      {
        id: "1",
        name: "Rohan Suresh",
        role: "Backend/AI Engineer",
        email: "rohan.suresh712@gmail.com",
        avatar: "https://media1.tenor.com/m/DFfCL02_DCcAAAAC/cat-look.gif",
        bio: "Led the backend efforts while also doing the root AI agent and the API calls",
      },
      {
        id: "2",
        name: "Joshua Sawyer",
        role: "Backend/API Engineer",
        email: "jawshs08@gmail.com",
        avatar: "https://media1.tenor.com/m/I_50ZzW-Ti0AAAAd/dfghjkl.gif",
        bio: "Designed the cultural and event AI agents as well as connected agents to each other, helped set up API calls",
        picCss: "object-top",
      },
      {
        id: "3",
        name: "Isaiah Rivera",
        role: "Frontend/UI/UX/AI Middleman Designer",
        email: "isaiahekindred@gmail.com",
        avatar: "https://media1.tenor.com/m/JWPDuXIDQukAAAAC/cat-osu.gif",
        bio: "Designed the UI for the website using Daisy UI, connected the frontend and backend as well as the AI",
      },
      {
        id: "4",
        name: "Reece Wilson",
        role: "Frontend/UI/UX/AI Engineer",
        email: "reecewilson124@gmail.com",
        avatar: "https://media1.tenor.com/m/aw2Mkb0s-YwAAAAC/silly-reaction-meme.gif",
        bio: "Designed the Google Maps Integration, Helped connect the AI prompt with the results",
      },
    ],
    []
  );

  const [selected, setSelected] = useState<Person>(people[0]);

  return (
    <div className="relative min-h-screen bg-[#0A014F] text-white overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />

      <Navbar />

      {/* BIG card like the example */}
      <main className="pt-28 pb-36 px-4 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <div
            key={selected.id}
            className="card bg-[#1b226d]/50 text-white shadow-2xl ring-1 ring-white/10 animate-fadeIn"
          >
            {/* Large figure on top */}
            <figure className="bg-[#3B60E4]">
              <img
                src={selected.avatar}
                alt={selected.name}
                className={`w-full h-80 md:h-[26rem] object-cover ${selected.picCss}`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/avatar.png";
                }}
              />
            </figure>

            {/* Spacious body */}
            <div className="card-body p-8 md:p-10">
              <h2 className="card-title text-3xl md:text-4xl">{selected.name}</h2>

              <p className="text-lg md:text-xl opacity-95 leading-relaxed">
                {selected.bio}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="badge badge-lg bg-white/15 border-white/20 rounded text-white px-3 py-3 mx-3 transition delay-50 duration-300 ease-in-out hover:scale-110 hover:shadow-sm shadow-white motion-reduce:transition-none motionreduce:hover:transform-none">
                  {selected.role}
                </span>
                <span className="badge badge-lg bg-white/10 border-white/20 rounded text-white px-3 py-3 mx-3 transition delay-50 duration-300 ease-in-out hover:scale-110 hover:shadow-sm shadow-white motion-reduce:transition-none motionreduce:hover:transform-none">
                  {selected.email}
                </span>
              </div>

              <div className="card-actions justify-end mt-6">
                <a
                  href={`mailto:${selected.email}`}
                  className="btn btn-primary btn-lg normal-case rounded transition duration-300 ease-in-out hover:scale-110 hover:shadow-sm shadow-white motion-reduce:transition-none motionreduce:hover:transform-none"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dock selector (click to swap the big card) */}
      <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center">
        <div className="dock bg-white/10 text-white/90 backdrop-blur-md ring-1 ring-white/15 rounded-2xl px-4 py-10 shadow-2xl">
          {people.map((p) => {
            const active = selected.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`group relative mx-2 md:mx-3 rounded-2xl p-3 transition-all duration-300 ease-out
                            ${active ? "scale-[1.12] bg-white/10 ring-2 ring-white/30 shadow-lg shadow-indigo-500/20" : "hover:bg-white/10"}`}
                aria-pressed={active}
                title={p.name}
              >
                <div
                  className={`h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden
                              transition-all duration-300 ease-out`}
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className={`h-full w-full object-cover transition-transform duration-300
                                ${active ? "scale-105" : "group-hover:scale-105"}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/avatar.png";
                    }}
                  />
                </div>

                <span
                  className={`dock-label mt-0 block whitespace-nowrap rounded-lg px-2 py-0.5
                              text-sm md:text-base font-medium bg-[#0A014F]/80 ring-2 ring-white/10
                              ${active ? "opacity-100 translate-y-0" : "opacity-90"}`}
                >
                  {p.name.split(" ")[0]}
                </span>

                {active && (
                  <span className="pointer-events-none absolute inset-0 -z-10 rounded-5xl bg-indigo-400/25 blur-2xl animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
