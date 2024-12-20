"use client";

import styles from "./CurrentWeather.module.scss";
import StarIcon from "./StarIcon";
import CurrentDateTime from "./CurrentDateTime";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { useSearchParams } from "next/navigation";
import CurrentWeatherSkelton from "./CurrentWeatherSkelton";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";
import ToolTip from "@/app/components/elements/toolTip/ToolTip";

const CurrentWeather = () => {
  const searchParams = useSearchParams();
  const cityToDisplay = searchParams.get("place");
  const address = searchParams.get("address");

  const { currentWeather, timezone, loading } = useDisplayedCityWeather();

  if (loading) {
    return <CurrentWeatherSkelton />;
  }

  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__citySection}>
        <div className={styles.currentWeather__cityNameContainer}>
          <div className={styles.currentWeather__cityName}>{cityToDisplay}</div>
          <div className={styles.currentWeather__cityNameTooltip}>
            <ToolTip message={address!} width={160} />
          </div>
        </div>
        <StarIcon />
      </div>

      <div className={styles.currentWeather__infoSection}>
        <div className={styles.currentWeather__info}>
          {currentWeather && timezone && <CurrentDateTime />}
          <div className={styles.currentWeather__temp}>
            {currentWeather?.currentTemp}°
          </div>
          <div className={styles.currentWeather__feelslikeTemp}>
            Feels like {currentWeather?.currentFeelslikeTemp}°
          </div>
        </div>
        <div className={styles.currentWeather__weatherIconContainer}>
          <WeatherIcon
            weatherIcon={currentWeather?.currentWeatherIcon ?? null}
            priority={true}
          />
        </div>
      </div>
    </div>
  );
};
export default CurrentWeather;
