"use client";

import {
  CurrentWeatherType,
  DailyWeatherHighlightsType,
  WeatherData,
  WeatherDataForForecast,
  WeatherIconType,
} from "@/types";
import { fetchDisplayedCityWeatherData } from "@/utils/apiHelper";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import { iconMapping } from "@/utils/weatherIconMapping";
import { getWeatherForNext24Hours } from "@/utils/weatherUtils";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the types for the weather data
interface WeatherDataContextType {
  displayedCityWeather: WeatherData | null;
  currentWeather: CurrentWeatherType | null;
  dailyWeatherHighlights: DailyWeatherHighlightsType | null;
  setDailyWeatherHighlights: React.Dispatch<
    React.SetStateAction<DailyWeatherHighlightsType | null>
  >;
  twentyFourHoursWeather: WeatherDataForForecast[] | null;
  setTwentyFourHoursWeather: React.Dispatch<
    React.SetStateAction<WeatherDataForForecast[] | null>
  >;
  lastWeatherFetchDateTime: string | null;
  timezone: string | null;
  updateWeatherStates: (lat: number, long: number) => void;
  todaysDate: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const DisplayedCityWeatherContext = createContext<
  WeatherDataContextType | undefined
>(undefined);

// WeatherProvider component to wrap your app
export const DisplayedCityWeatherProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [displayedCityWeather, setDisplayedCityWeather] =
    useState<WeatherData | null>(null);
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherType | null>(null);
  const [dailyWeatherHighlights, setDailyWeatherHighlights] =
    useState<DailyWeatherHighlightsType | null>(null);
  const [twentyFourHoursWeather, setTwentyFourHoursWeather] = useState<
    WeatherDataForForecast[] | null
  >(null);
  const [lastWeatherFetchDateTime, setLastWeatherFetchDateTime] = useState<
    string | null
  >(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [todaysDate, setTodaysDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const updateWeatherStates = async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const weatherData = await fetchDisplayedCityWeatherData(lat, lng);
      setDisplayedCityWeather(weatherData);
      console.log(weatherData);

      setCurrentWeather({
        currentTemp: Math.round(weatherData.currentConditions.temp),
        currentFeelslikeTemp: Math.round(
          weatherData.currentConditions.feelslike
        ),
        currentWeatherIcon:
          iconMapping[weatherData.currentConditions.icon as WeatherIconType],
      });

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
      setDailyWeatherHighlights(todaysWeatherData);
      setTodaysDate(weatherData.days[0].datetime);

      try {
        const next24HoursWeather = getWeatherForNext24Hours(
          weatherData.days[0].hours,
          weatherData.days[1].hours,
          weatherData.timezone
        );
        setTwentyFourHoursWeather(next24HoursWeather);
      } catch (weatherProcessError) {
        console.error(
          `Failed to process hourly weather data for coordinates (${lat}, ${lng}):`,
          weatherProcessError
        );
      }

      setLastWeatherFetchDateTime(getCurrentTimeAndDate(weatherData.timezone));
    } catch (fetchError) {
      console.error(
        `Failed to fetch weather data for coordinates (${lat}, ${lng}):`,
        fetchError instanceof Error ? fetchError.message : fetchError
      );
      toast.error("Failed to load weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DisplayedCityWeatherContext.Provider
      value={{
        displayedCityWeather,
        currentWeather,
        dailyWeatherHighlights,
        setDailyWeatherHighlights,
        twentyFourHoursWeather,
        setTwentyFourHoursWeather,
        lastWeatherFetchDateTime,
        timezone,
        updateWeatherStates,
        loading,
        setLoading,
        todaysDate,
      }}
    >
      {children}
    </DisplayedCityWeatherContext.Provider>
  );
};

// Custom hook to use the WeatherContext
export const useDisplayedCityWeather = () => {
  const context = useContext(DisplayedCityWeatherContext);
  if (!context) {
    throw new Error(
      "useDisplayedCityWeather must be used within a DisplayedCityWeatherProvider"
    );
  }
  return context;
};
