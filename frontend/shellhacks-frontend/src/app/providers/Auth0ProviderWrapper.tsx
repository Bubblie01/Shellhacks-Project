"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";

export default function Auth0ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider
      domain="dev-cicajg17b3i3mwri.us.auth0.com"
      clientId="nUDLnrgeMyMmz5B7SoBUiE2YTGmez81F"
      authorizationParams={{
        connection: "google-oauth2",
        redirect_uri: "http://localhost:3000/home"
      }}
    >
      {children}
    </Auth0Provider>
  );
}
