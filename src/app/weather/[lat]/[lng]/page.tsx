"use client";

import { WeeklyComponent } from "@/features/weather/weeklyComponent/WeeklyComponent";
import SearchBar from "@/features/weather/searchBar/SearchBar";
import CurrentWeather from "@/features/weather/currentWeather/CurrentWeather";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./page.module.scss";
import TodaysHighlights from "@/features/weather/todaysHighlights/TodaysHighlights";
import TodaysForecast from "@/features/weather/todaysForecast/TodaysForecast";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";
import {
  fetchDisplayedCityWeatherData,
  fetchFavoriteCities,
} from "@/utils/apiHelper";
import ErrorMessage from "@/app/components/elements/errorMessage/ErrorMessage";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

export default function WeatherPage() {
  const { lat, lng } = useParams();
  const latitude = Number(lat);
  const longitude = Number(lng);
  const { updateWeatherStates } = useDisplayedCityWeather();
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const fetchWeatherData = async (lat: number, lng: number) => {
    try {
      const weatherData = await fetchDisplayedCityWeatherData(lat, lng);
      updateWeatherStates(weatherData);
      console.log(weatherData);
    } catch (error) {
      setErrorMessage("Failed to load weather data for the displayed city");
    }
  };

  useEffect(() => {
    if (!latitude || !longitude) return;
    fetchWeatherData(latitude, longitude);
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
