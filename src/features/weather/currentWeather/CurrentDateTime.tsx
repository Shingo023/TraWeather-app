"use client";

import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import styles from "./CurrentWeather.module.scss";
import { RotateCw } from "lucide-react";
import { CurrentDateAndTimePropsType, WeatherData } from "@/types";
import React, { useEffect } from "react";
import { fetchDisplayedCityWeatherData } from "@/utils/apiHelper";
import { useParams } from "next/navigation";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";

const CurrentDateTime = () =>
  //   {
  //   fetchWeatherData,
  //   placeTimeZone,
  //   // setDisplayedCityWeather,
  //   latitude,
  //   longitude,
  //   setLoading,
  //   // setCurrentDateTime,
  //   currentDateTime,
  // }: CurrentDateAndTimePropsType
  {
    const { lat, lng } = useParams();
    const { updateWeatherStates, currentDateTime } = useDisplayedCityWeather();

    const updateWeatherInfo = async () => {
      // setLoading(true);
      // setDisplayedCityWeather(null);

      if (lat !== undefined && lng !== undefined) {
        const updatedWeatherData = await fetchDisplayedCityWeatherData(
          Number(lat),
          Number(lng)
        );
        updateWeatherStates(updatedWeatherData);
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
