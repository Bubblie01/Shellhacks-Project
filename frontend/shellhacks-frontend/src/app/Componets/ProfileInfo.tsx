"use client";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileInfo() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-[10rem] text-[#3B60E4] w-30 h-30"></span>
      </div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={() => loginWithRedirect({ appState: { returnTo: "/home" } })}
          className="px-8 py-4 bg-blue-600 text-white text-2xl rounded-lg"
        >
          Login
        </button>
      </div>
    );
  }

  // user is authenticated
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="fade-in p-16 bg-[#7765E3] rounded-2xl shadow-2xl text-white max-w-4xl w-full">
        <p className="text-6xl text-center mb-10">Welcome {user!.name}!</p>
        <div className="flex items-center gap-10">
          <img
            src={user!.picture}
            alt={user!.name ?? "User"}
            className="w-[250px] h-[250px] rounded-full object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold">Name: {user!.name}</h2>
            <p className="text-3xl">Email: {user!.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
