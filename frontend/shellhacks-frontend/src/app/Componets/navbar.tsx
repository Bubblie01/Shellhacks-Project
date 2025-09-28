"use client";
import React from "react";
import Link from "next/link";
import "../globals.css";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { logout, user } = useAuth0();

  const displayName = user?.name ?? user?.nickname ?? user?.email ?? "Guest";
  const picture = user?.picture ?? "/avatar.png"; // fallback avatar

  return (
    <div className="relative drawer">
      {/* Toggle */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page content */}
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="drawer-button group fixed top-5 left-5 inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-white shadow-lg
                     bg-gradient-to-r from-[#4D4092] to-[#7765E3]
                     hover:from-[#6a5be0] hover:to-[#8c82f0]
                     active:scale-[0.98] transition-all duration-200"
          aria-label="Open navigation menu"
        >
          <span className="text-xl leading-none">≡</span>
          <span className="text-sm font-semibold opacity-90 group-hover:opacity-100">
            Menu
          </span>
        </label>
      </div>

      {/* Drawer side */}
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

        <aside
          className="menu min-h-full w-80 p-5 md:w-96
                     text-white shadow-2xl
                     bg-gradient-to-b from-[#4D4092] via-[#5a4ac3] to-[#7765E3]
                     backdrop-blur supports-[backdrop-filter]:bg-opacity-90"
        >
          {/* Header / Profile */}
          <div className="mb-6 mt-2 flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
              <img
                src={picture}
                alt={displayName}
                className="rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/avatar.png";
                }}
              />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium leading-tight">{displayName}</p>
              {user?.email && <p className="text-xs opacity-80">{user.email}</p>}
              <p className="text-xs opacity-80">Signed in</p>
            </div>
          </div>

          <nav className="mt-2 space-y-2">
            <Link
              href="../home"
              className="block rounded-xl px-4 py-3 font-medium
                         hover:bg-white/10 hover:ring-1 hover:ring-white/15
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 text-xl"
            >
              Home
            </Link>

            <Link
              href="../profile"
              className="block rounded-xl px-4 py-3 font-medium
                         hover:bg-white/10 hover:ring-1 hover:ring-white/15
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 text-xl"
            >
              About Us
            </Link>
          </nav>

          <div className="mt-auto pt-6">
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="w-full rounded-2xl px-4 py-3 font-semibold text-white shadow-lg
                         bg-black/70 hover:bg-black
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
                         active:scale-[0.98] transition-all"
            >
              Log Out
            </button>

            <p className="mt-4 text-center text-xs opacity-70">
              Made for ShellHacks 2025
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Navbar;
