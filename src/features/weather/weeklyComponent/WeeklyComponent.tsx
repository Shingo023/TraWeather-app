"use client";

import {
  DailyWeatherHighlightsType,
  WeatherDay,
  WeatherIconType,
} from "@/types";
import styles from "./WeeklyComponent.module.scss";
import { iconMapping } from "@/utils/weatherIconMapping";
import React, { useEffect, useState } from "react";
import WeeklyComponentSkeleton from "./WeeklyComponentSkeleton";
import {
  extractDailyHighlights,
  getWeatherForNext24Hours,
} from "@/utils/weatherUtils";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";
import WeeklyForecastWeatherCard from "./weeklyForecastWeatherCard/WeeklyForecastWeatherCard";

export const WeeklyComponent = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const {
    displayedCityWeather,
    setTwentyFourHoursWeather,
    setDailyWeatherHighlights,
    loading,
  } = useDisplayedCityWeather();

  const weeklyWeather: WeatherDay[] | undefined = displayedCityWeather?.days;

  useEffect(() => {
    if (!displayedCityWeather) return;
    const today = displayedCityWeather.days[0].datetime;
    setSelectedDate(today);
  }, [displayedCityWeather]);

  const handleClick = (date: string, selectedDateWeather: WeatherDay) => {
    if (!displayedCityWeather) return;
    const today = displayedCityWeather.days[0].datetime;
    if (date === today) {
      const todaysHourlyWeather = displayedCityWeather.days[0].hours;
      const tomorrowsHourlyWeather = displayedCityWeather.days[1].hours;
      const twentyFourHoursWeatherData = getWeatherForNext24Hours(
        todaysHourlyWeather,
        tomorrowsHourlyWeather,
        displayedCityWeather.timezone
      );
      setTwentyFourHoursWeather(twentyFourHoursWeatherData);
    } else {
      setTwentyFourHoursWeather(selectedDateWeather.hours);
    }
    setSelectedDate(date);
    const selectedDateWeatherHighlights: DailyWeatherHighlightsType =
      extractDailyHighlights(selectedDateWeather);
    setDailyWeatherHighlights(selectedDateWeatherHighlights);
  };

  // Render skeletons while loading
  if (loading) {
    return <WeeklyComponentSkeleton />;
  }

  return (
    <div className={styles.WeeklyComponent}>
      <div className={styles.WeeklyComponent__content}>
        <h2>Weekly Forecast</h2>
        <ul className={styles.WeeklyComponentList}>
          {weeklyWeather ? (
            weeklyWeather.map((dailyWeather, index) => {
              const dailyWeatherIcon =
                iconMapping[dailyWeather.icon as WeatherIconType];

              return (
                <WeeklyForecastWeatherCard
                  key={index}
                  dailyWeather={dailyWeather}
                  dailyWeatherIcon={dailyWeatherIcon}
                  handleClick={handleClick}
                  selectedDate={selectedDate}
                />
              );
            })
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  );
};
