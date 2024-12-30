"use client";

import { FavoriteCityCardPropsType, WeatherIconType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import { getBackgroundWeather, iconMapping } from "@/utils/weatherIconMapping";
import { useMemo, useState } from "react";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import Button from "@/app/components/elements/button/Button";
import WeatherForecast from "./weatherForecast/WeatherForecast";
import { getWeatherForNext24Hours } from "@/utils/weatherUtils";
import { useRouter } from "next/navigation";
import HomeLocationIcon from "./homeLocationIcon/HomeLocationIcon";
import PlaceNameEditor from "./placeNameEditor/PlaceNameEditor";
import ExternalLinkComponent from "./externalLink/ExternalLink";
import { isOutsideDaytime } from "@/utils/mathUtils";
import useMediaQuery from "@/hooks/useMediaQuery";
import ToolTip from "@/app/components/elements/toolTip/ToolTip";

const FavoriteCityCard = ({
  userId,
  favoriteCityWithWeather,
}: FavoriteCityCardPropsType) => {
  const [showTodaysWeather, setShowTodaysWeather] = useState(true);
  const isTablet = useMediaQuery("(max-width: 768px)");

  const currentWeather = favoriteCityWithWeather.weather.currentConditions
    .icon as WeatherIconType;

  const userFavoriteCityId = favoriteCityWithWeather.id;
  const cityName = favoriteCityWithWeather.customName;
  const address = favoriteCityWithWeather.address;
  const timeZone = favoriteCityWithWeather.weather.timezone;
  const currentTemp = Math.round(
    favoriteCityWithWeather.weather.currentConditions.temp
  );
  const cityLat = favoriteCityWithWeather.latitude;
  const cityLng = favoriteCityWithWeather.longitude;
  const cityAddress = favoriteCityWithWeather.address;
  const cityPlaceId = favoriteCityWithWeather.placeId;

  const todaysWeather = favoriteCityWithWeather.weather.days[0].hours;
  const tomorrowsWeather = favoriteCityWithWeather.weather.days[1].hours;
  const weeklyWeather = favoriteCityWithWeather.weather.weeklyWeather;

  const sunrise = favoriteCityWithWeather.weather.sunrise;
  const sunset = favoriteCityWithWeather.weather.sunset;
  const lastWeatherFetchDateTime =
    favoriteCityWithWeather.lastWeatherFetchDateTime;

  const isNight = isOutsideDaytime(sunrise, sunset, lastWeatherFetchDateTime);

  const backgroundWeather = getBackgroundWeather(isNight, currentWeather);

  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : null;

  const twentyFourHoursWeather = useMemo(
    () => getWeatherForNext24Hours(todaysWeather, tomorrowsWeather, timeZone),
    [todaysWeather, tomorrowsWeather, timeZone]
  );

  const router = useRouter();

  const handleWeatherInfoClick = () => {
    router.push(
      `/weather/${cityLat}/${cityLng}?place=${cityName}&address=${cityAddress}&id=${cityPlaceId}`
    );
  };

  return (
    <div
      className={`${styles.cityCard__card} ${isNight ? styles.nightMode : ""}`}
      style={{ backgroundImage: `url(${backgroundWeather})` }}
    >
      <div className={styles.cityCard__header}>
        <div className={styles.cityCard__cityInfo}>
          <HomeLocationIcon
            cityName={cityName}
            userFavoriteCityId={userFavoriteCityId}
            userId={userId}
          />

          <div className={styles.cityCard__cityNameContainer}>
            <h2 className={styles.cityCard__cityName}>{cityName}</h2>
            <div className={`tooltip ${styles.cityNameTooltip}`}>
              <ToolTip message={address!} className="favoriteCityName" />
            </div>
          </div>

          <PlaceNameEditor
            cityName={cityName}
            userFavoriteCityId={userFavoriteCityId}
            cityAddress={cityAddress}
            isNight={isNight}
          />
        </div>

        <div className={styles.cityCard__forecastToggle}>
          <div
            className={`${styles.cityCard__selectedForecast} ${
              showTodaysWeather === true ? styles.forecastActive : ""
            } `}
            onClick={() => {
              if (showTodaysWeather === false) {
                setShowTodaysWeather(true);
              }
            }}
          >
            Today
          </div>
          <div
            className={`${styles.cityCard__selectedForecast} ${
              showTodaysWeather === false ? styles.forecastActive : ""
            } `}
            onClick={() => {
              if (showTodaysWeather === true) {
                setShowTodaysWeather(false);
              }
            }}
          >
            Week
          </div>
        </div>
      </div>

      <div className={styles.cityCard__weather}>
        <div className={styles.cityCard__currentInfo}>
          <h5 className={styles.cityCard__currentDateTime}>
            {lastWeatherFetchDateTime}
          </h5>
          <div className={styles.cityCard__currentWeather}>
            <div className={styles.cityCard__currentWeatherIconContainer}>
              <WeatherIcon weatherIcon={currentWeatherIcon} />
            </div>
            <h5 className={styles.cityCard__currentTemp}>{currentTemp}°</h5>
          </div>
          <div className={styles.cityCard__buttons}>
            <Button
              className="primary"
              text={isTablet ? "More" : "Weather Details"}
              type="button"
              onClick={handleWeatherInfoClick}
            />
          </div>
        </div>

        <div className={styles.cityCard__contentRight}>
          <div className={styles.cityCard__weatherForecast}>
            <WeatherForecast
              dailyOrWeeklyWeather={
                showTodaysWeather ? twentyFourHoursWeather : weeklyWeather
              }
              className={
                isNight ? "favoriteCityCardNightMode" : "favoriteCityCard"
              }
            />
          </div>
          <div className={styles.cityCard__placeInfoLinks}>
            <ExternalLinkComponent
              linkName="Tourist Spots"
              url={`https://www.google.com/maps/search/${encodeURIComponent(
                "tourist attraction"
              )}/@${cityLat},${cityLng},15z`}
            />

            <ExternalLinkComponent
              linkName="Events"
              url={`https://www.eventbrite.com/d/nearby--${encodeURIComponent(
                `${cityAddress}, ${cityName}`
              )}/?page=1&sort=best`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCityCard;

// Construct the Eventbrite URL
// Construct the Facebook events URL: {`https://www.facebook.com/events/search/?q=${encodeURIComponent(`${cityAddress}, ${cityName}`)}`};
