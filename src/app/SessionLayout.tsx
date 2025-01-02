"use client";

import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DisplayedCityWeatherProvider } from "@/context/DisplayedCityWeatherContext";
import { UserFavoriteCitiesProvider } from "@/context/UserFavoriteCitiesContext";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SessionProvider>
        <ToastContainer />
        <UserFavoriteCitiesProvider>
          <DisplayedCityWeatherProvider>
            {children}
          </DisplayedCityWeatherProvider>
        </UserFavoriteCitiesProvider>
      </SessionProvider>
    </div>
  );
}
