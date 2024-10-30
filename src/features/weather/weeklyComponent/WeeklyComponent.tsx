"use client";

import { WeatherData, WeatherDay, WeatherIconType } from "@/types";
import styles from "./WeeklyComponent.module.scss";
import { iconMapping } from "@/utils/weatherIconMapping";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { Umbrella } from "lucide-react";
import { formatDate } from "@/utils/dateUtils";
import WeeklyComponentSkeleton from "./WeeklyComponentSkeleton";

export const WeeklyComponent = ({
  displayedCityWeather,
  setTodaysWeather,
}: {
  displayedCityWeather: WeatherData | null;
  setTodaysWeather: Dispatch<SetStateAction<WeatherDay | null>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const weeklyWeather: WeatherDay[] | undefined = displayedCityWeather?.days;

  useEffect(() => {
    if (!displayedCityWeather) return;
    const today = displayedCityWeather.days[0].datetime;
    setSelectedDate(today);
  }, [displayedCityWeather]);

  useEffect(() => {
    if (weeklyWeather && weeklyWeather.length > 0) {
      setLoading(false);
    }
  }, [weeklyWeather]);

  const handleClick = (date: string, selectedDateWeather: WeatherDay) => {
    setSelectedDate(date);
    setTodaysWeather(selectedDateWeather);
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
                <li
                  className={`${styles.WeeklyComponentItem} ${
                    dailyWeather.datetime === selectedDate && styles.active
                  }`}
                  key={index}
                  onClick={() =>
                    handleClick(dailyWeather.datetime, dailyWeather)
                  }
                >
                  <p className={styles.WeeklyComponentItem__date}>
                    {formatDate(dailyWeather.datetime)}
                  </p>
                  <div className={styles.WeeklyComponentItem__weatherInfo}>
                    <div
                      className={styles.WeeklyComponentItem__weatherInfoLeft}
                    >
                      <div>
                        <WeatherIcon
                          weatherIcon={dailyWeatherIcon}
                          width={60}
                          height={60}
                        />
                      </div>
                    </div>
                    <div
                      className={styles.WeeklyComponentItem__weatherInfoRight}
                    >
                      <p>
                        {Math.round(dailyWeather.tempmax)}°/
                        {Math.round(dailyWeather.tempmin)}°
                      </p>
                      <div className={styles.chanceOfRain}>
                        <Umbrella className={styles.chanceOfRain__icon} />
                        <p>{Math.round(dailyWeather.precipprob / 5) * 5}%</p>
                      </div>
                    </div>
                  </div>
                </li>
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
