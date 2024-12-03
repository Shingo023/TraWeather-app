"use client";

import styles from "./CurrentWeather.module.scss";
import StarIcon from "./StarIcon";
import CurrentDateTime from "./CurrentDateTime";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import CurrentWeatherSkelton from "./CurrentWeatherSkelton";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";

const CurrentWeather = () => {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const cityToDisplay = searchParams.get("place");
  const address = searchParams.get("address");

  const { currentWeather, timezone } = useDisplayedCityWeather();

  useEffect(() => {
    if (currentWeather) {
      setLoading(false);
    }
  }, [currentWeather]);

  // Render skeletons while loading
  if (loading) {
    return <CurrentWeatherSkelton />;
  }

  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__info}>
        <div className={styles.currentWeather__infoTop}>
          <div className={styles.currentWeather__citySection}>
            <div className={styles.currentWeather__cityName}>
              {cityToDisplay}
            </div>
            <StarIcon />
          </div>
          <div className={styles.currentWeather__stateAndCountry}>
            <div className={styles.currentWeather__stateName}>{address}</div>
          </div>
          {currentWeather && timezone && <CurrentDateTime />}
        </div>

        <div className={styles.currentWeather__infoBottom}>
          <div className={styles.currentWeather__temp}>
            {currentWeather?.currentTemp}°
          </div>
          <div className={styles.currentWeather__feelslikeTemp}>
            Feels like {currentWeather?.currentFeelslikeTemp}°
          </div>
        </div>
      </div>

      <div className={styles.currentWeather__weatherIconContainer}>
        <WeatherIcon
          weatherIcon={currentWeather?.currentWeatherIcon ?? null}
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};
export default CurrentWeather;
