"use client";

import { WeeklyComponent } from "@/features/weather/weeklyComponent/WeeklyComponent";
import SearchBar from "@/features/weather/searchBar/SearchBar";
import CurrentWeather from "@/features/weather/currentWeather/CurrentWeather";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.scss";
import TodaysHighlights from "@/features/weather/todaysHighlights/TodaysHighlights";
import TodaysForecast from "@/features/weather/todaysForecast/TodaysForecast";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";
import ErrorMessage from "@/app/components/elements/errorMessage/ErrorMessage";

export default function WeatherPage() {
  const { lat, lng } = useParams();
  const { updateWeatherStates } = useDisplayedCityWeather();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (!lat || !lng) return;
    updateWeatherStates(Number(lat), Number(lng));
  }, [lat, lng]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  return (
    <div className={styles.weatherPage}>
      {errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <>
          <div className={styles.weatherPage__leftContent}>
            <SearchBar />
            <CurrentWeather />
            <TodaysForecast />
            <TodaysHighlights />
          </div>
          <div className={styles.weatherPage__rightContent}>
            <WeeklyComponent />
          </div>
        </>
      )}
    </div>
  );
}
