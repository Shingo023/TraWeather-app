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

  const { currentWeather, loading } = useDisplayedCityWeather();

  if (loading) {
    return <CurrentWeatherSkelton />;
  }

  return (
    <div className={styles.currentWeather}>
      <header className={styles.currentWeather__city}>
        <div className={styles.currentWeather__cityWrapper}>
          <div className={styles.currentWeather__cityNameContainer}>
            <h1 className={styles.currentWeather__cityName}>{cityToDisplay}</h1>
            <div className={styles.currentWeather__cityNameTooltip}>
              <ToolTip message={address!} className="cityName" />
            </div>
          </div>
          <StarIcon aria-label="Mark city as favorite" />
        </div>
        <CurrentDateTime />
      </header>

      <section className={styles.currentWeather__weather}>
        <div className={styles.currentWeather__info}>
          <p className={styles.currentWeather__temp}>
            {currentWeather?.currentTemp}°
          </p>
          <p className={styles.currentWeather__feelslikeTemp}>
            Feels like {currentWeather?.currentFeelslikeTemp}°
          </p>
        </div>
        <div className={`iconContainer ${styles.weatherIcon}`}>
          <WeatherIcon
            weatherIcon={currentWeather?.currentWeatherIcon ?? null}
            priority={true}
          />
        </div>
      </section>
    </div>
  );
};
export default CurrentWeather;
