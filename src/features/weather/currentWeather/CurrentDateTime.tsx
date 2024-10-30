"use client";

import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import styles from "./CurrentWeather.module.scss";
import { RotateCw } from "lucide-react";
import { CurrentDateAndTimePropsType, WeatherData } from "@/types";
import React from "react";

const CurrentDateTime = ({
  placeTimeZone,
  setDisplayedCityWeather,
  latitude,
  longitude,
  setLoading,
}: CurrentDateAndTimePropsType) => {
  const currentTimeAndDate =
    placeTimeZone !== undefined
      ? getCurrentTimeAndDate(placeTimeZone)
      : undefined;

  const updateWeatherInfo = async () => {
    setLoading(true);
    setDisplayedCityWeather(null);

    if (latitude !== undefined && longitude !== undefined) {
      try {
        const weatherResponse = await fetch(
          `/api/weather?lat=${latitude}&lng=${longitude}`
        );
        const updatedWeather: WeatherData = await weatherResponse.json();

        setDisplayedCityWeather(updatedWeather);
        setLoading(false);
      } catch (error) {
        console.error("Error updating weather information:", error);
      }
    } else {
      console.error("Latitude or longitude is undefined.");
    }
  };

  return (
    <div className={styles.currentWeather__dateTimeContainer}>
      <div
        className={styles.currentWeather__dateTime}
        onClick={updateWeatherInfo}
      >
        {currentTimeAndDate}
      </div>
      <div className={styles.currentWeather__updateIconContainer}>
        <RotateCw className={styles.currentWeather__updateIcon} />
      </div>
    </div>
  );
};

export default React.memo(CurrentDateTime);
