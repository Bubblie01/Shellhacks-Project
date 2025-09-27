"use client";

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileInfo() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!isAuthenticated) {
    return (
      <button onClick={() => loginWithRedirect({ appState: { returnTo: "/home" } })}>
        Login
      </button>
    );
  }

  // user is guaranteed now
  return (
    <div className="p-[5%] bg-[#7765E3] mx-[10%] mt-[10%]">
        <p className="text-6xl text-center">Welcome {user!.name}!</p>
        <div className="flex mt-5">
            <img src={user!.picture} alt={user!.name ?? "User"} className="w-[250px]" />
            <h2 className="text-2xl"> Name: {user!.name}</h2>
            <p className="text-2xl"> Email: {user!.email}</p>
        </div>
    </div>
  );
}
