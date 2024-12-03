"use client";

import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import styles from "./CurrentWeather.module.scss";
import { RotateCw } from "lucide-react";
import { CurrentDateAndTimePropsType, WeatherData } from "@/types";
import React, { useEffect } from "react";

const CurrentDateTime = ({
  fetchWeatherData,
  placeTimeZone,
  // setDisplayedCityWeather,
  latitude,
  longitude,
  setLoading,
  // setCurrentDateTime,
  currentDateTime,
}: CurrentDateAndTimePropsType) => {
  const updateWeatherInfo = async () => {
    setLoading(true);
    // setDisplayedCityWeather(null);

    if (latitude !== undefined && longitude !== undefined) {
      fetchWeatherData(Number(latitude), Number(longitude));
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
        {currentDateTime}
      </div>
      <div className={styles.currentWeather__updateIconContainer}>
        <RotateCw className={styles.currentWeather__updateIcon} />
      </div>
    </div>
  );
};

export default React.memo(CurrentDateTime);
