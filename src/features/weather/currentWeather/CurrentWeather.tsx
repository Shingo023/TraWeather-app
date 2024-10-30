"use client";

import { CurrentWeatherPropsType, WeatherIconType } from "@/types";
import { iconMapping } from "@/utils/weatherIconMapping";
import styles from "./CurrentWeather.module.scss";
import StarIcon from "./StarIcon";
import CurrentDateTime from "./CurrentDateTime";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { useEffect, useState } from "react";

const CurrentWeather = ({
  displayedCityWeather,
  setDisplayedCityWeather,
  cityToDisplay,
  address,
  placeId,
  favoriteCitiesPlaceIds,
  setFavoriteCitiesPlaceIds,
  latitude,
  longitude,
}: CurrentWeatherPropsType) => {
  const [loading, setLoading] = useState(true);

  const currentTemp = displayedCityWeather?.currentConditions.temp
    ? Math.round(displayedCityWeather.currentConditions.temp)
    : undefined;

  const currentFeelslikeTemp = displayedCityWeather?.currentConditions.feelslike
    ? Math.round(displayedCityWeather.currentConditions.feelslike)
    : undefined;

  const currentWeather = displayedCityWeather?.currentConditions.icon as
    | WeatherIconType
    | undefined;

  const placeTimeZone = displayedCityWeather?.timezone;

  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : null;

  useEffect(() => {
    if (displayedCityWeather && favoriteCitiesPlaceIds) {
      setLoading(false);
    }
  }, [displayedCityWeather]);

  // Render skeletons while loading
  if (loading) {
    return (
      <div className={styles.currentWeather}>
        <div className={styles.currentWeather__info}>
          <div className={styles.currentWeather__infoTop}>
            <div className={styles.currentWeather__skeletonCityName} />
            <div className={styles.currentWeather__skeletonAddress} />
            <div className={styles.currentWeather__skeletonDateTime} />
          </div>
          <div className={styles.currentWeather__infoTop}>
            <div className={styles.currentWeather__skeletonTemp} />
            <div className={styles.currentWeather__skeletonFeelslikeTemp} />
          </div>
        </div>

        <div className={styles.currentWeather__skeletonWeatherIcon} />
      </div>
    );
  }

  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__info}>
        <div className={styles.currentWeather__infoTop}>
          <div className={styles.currentWeather__citySection}>
            <div className={styles.currentWeather__cityName}>
              {cityToDisplay}
            </div>
            <StarIcon
              displayedCityWeather={displayedCityWeather}
              cityToDisplay={cityToDisplay}
              address={address}
              placeId={placeId}
              favoriteCitiesPlaceIds={favoriteCitiesPlaceIds}
              setFavoriteCitiesPlaceIds={setFavoriteCitiesPlaceIds}
            />
          </div>
          <div className={styles.currentWeather__stateAndCountry}>
            <div className={styles.currentWeather__stateName}>{address}</div>
          </div>
          {displayedCityWeather && (
            <CurrentDateTime
              placeTimeZone={placeTimeZone}
              setDisplayedCityWeather={setDisplayedCityWeather}
              latitude={latitude}
              longitude={longitude}
              setLoading={setLoading}
            />
          )}
        </div>

        <div className={styles.currentWeather__infoBottom}>
          <div className={styles.currentWeather__temp}>{currentTemp}°</div>
          <div className={styles.currentWeather__feelslikeTemp}>
            Feels like {currentFeelslikeTemp}°
          </div>
        </div>
      </div>

      <div className={styles.currentWeather__weatherIconContainer}>
        <WeatherIcon
          weatherIcon={currentWeatherIcon}
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};
export default CurrentWeather;
