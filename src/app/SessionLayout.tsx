"use client";

import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DisplayedCityWeatherProvider } from "@/context/DisplayedCityWeatherContext";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SessionProvider>
        <ToastContainer />
        <DisplayedCityWeatherProvider>{children}</DisplayedCityWeatherProvider>
      </SessionProvider>
    </div>
  );
}
