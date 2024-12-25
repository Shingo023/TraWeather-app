"use client";

import styles from "./CurrentWeather.module.scss";
import { RotateCw } from "lucide-react";
import React from "react";
import { useParams } from "next/navigation";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";

const CurrentDateTime = () => {
  const { lat, lng } = useParams();
  const { updateWeatherStates, lastWeatherFetchDateTime } =
    useDisplayedCityWeather();

  const updateWeatherInfo = async () => {
    if (!lat || !lng) return;
    updateWeatherStates(Number(lat), Number(lng));
  };

  return (
    <div className={styles.currentWeather__dateTimeContainer}>
      <div
        className={styles.currentWeather__dateTime}
        onClick={updateWeatherInfo}
      >
        {lastWeatherFetchDateTime}
      </div>
      <div className={`iconContainer ${styles.updateIcon}`}>
        <RotateCw className="icon" />
      </div>
    </div>
  );
};

export default React.memo(CurrentDateTime);
