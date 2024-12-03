"use client";

import { WeeklyComponent } from "@/features/weather/weeklyComponent/WeeklyComponent";
import SearchBar from "@/features/weather/searchBar/SearchBar";
import CurrentWeather from "@/features/weather/currentWeather/CurrentWeather";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  CurrentWeatherType,
  TodaysWeatherType,
  WeatherData,
  WeatherDataForForecast,
  WeatherIconType,
} from "@/types";
import { useSession } from "next-auth/react";
import styles from "./page.module.scss";
import TodaysHighlights from "@/features/weather/todaysHighlights/TodaysHighlights";
import TodaysForecast from "@/features/weather/todaysForecast/TodaysForecast";
import { getWeatherForNext24Hours } from "@/utils/weatherUtils";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import { iconMapping } from "@/utils/weatherIconMapping";

export default function WeatherPage() {
  const { lat, lng } = useParams();

  const [displayedCityWeather, setDisplayedCityWeather] =
    useState<WeatherData | null>(null);
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherType | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [todaysWeather, setTodaysWeather] = useState<TodaysWeatherType | null>(
    null
  );
  const [twentyFourHoursWeather, setTwentyFourHoursWeather] = useState<
    WeatherDataForForecast[] | null
  >(null);
  const [currentDateTime, setCurrentDateTime] = useState<string | null>(null);

  const router = useRouter();
  const { data: session } = useSession();

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      const weatherResponse = await fetch(
        `/api/weather?lat=${latitude}&lng=${longitude}`
      );
      const weatherData: WeatherData = await weatherResponse.json();

      setDisplayedCityWeather(weatherData);
      console.log(weatherData);

      const currentWeatherData = {
        currentTemp: Math.round(weatherData.currentConditions.temp),
        currentFeelslikeTemp: Math.round(
          weatherData.currentConditions.feelslike
        ),
        currentWeatherIcon:
          iconMapping[weatherData.currentConditions.icon as WeatherIconType],
      };
      setCurrentWeather(currentWeatherData);

      setTimezone(weatherData.timezone);

      const todaysWeatherData = {
        datetime: weatherData.days[0].datetime,
        humidity: Math.round(weatherData.days[0].humidity),
        snowDepth: weatherData.days[0].snowdepth ?? 0,
        weatherOverview: weatherData.days[0].description,
        visibility: weatherData.days[0].visibility,
        feelsLikeTempMax: Math.round(weatherData.days[0].feelslikemax),
        feelsLikeTempMin: Math.round(weatherData.days[0].feelslikemin),
        sunrise: weatherData.days[0].sunrise,
        sunset: weatherData.days[0].sunset,
        uvIndexData: (180 * weatherData.days[0].uvindex * 10) / 100,
      };
      setTodaysWeather(todaysWeatherData);

      const todaysHourlyWeather = weatherData.days[0].hours;
      const tomorrowsHourlyWeather = weatherData.days[1].hours;
      const twentyFourHoursWeatherData = getWeatherForNext24Hours(
        todaysHourlyWeather,
        tomorrowsHourlyWeather,
        weatherData.timezone
      );
      setTwentyFourHoursWeather(twentyFourHoursWeatherData);

      const currentDateAndTime = getCurrentTimeAndDate(weatherData.timezone);
      setCurrentDateTime(currentDateAndTime);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    if (!session?.user.id || !lat || !lng) return;
    fetchWeatherData(Number(lat), Number(lng));
  }, [lat, lng, session?.user.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  return (
    <div className={styles.weatherPage}>
      <div className={styles.weatherPage__leftContent}>
        <SearchBar />
        <CurrentWeather
          fetchWeatherData={fetchWeatherData}
          currentWeather={currentWeather}
          latitude={lat as string}
          longitude={lng as string}
          currentDateTime={currentDateTime}
          timezone={timezone}
        />
        <TodaysForecast
          twentyFourHoursWeather={twentyFourHoursWeather}
          todaysWeather={todaysWeather}
        />
        <TodaysHighlights
          todaysWeather={todaysWeather}
          timeZone={displayedCityWeather?.timezone}
          currentDateTime={currentDateTime}
        />
      </div>
      <div className={styles.weatherPage__rightContent}>
        <WeeklyComponent
          displayedCityWeather={displayedCityWeather}
          setTodaysWeather={setTodaysWeather}
          setTwentyFourHoursWeather={setTwentyFourHoursWeather}
        />
      </div>
    </div>
  );
}
