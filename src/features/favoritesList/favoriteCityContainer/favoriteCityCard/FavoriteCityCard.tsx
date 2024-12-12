"use client";

import { FavoriteCityCardPropsType, WeatherIconType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import { backgroundMapping, iconMapping } from "@/utils/weatherIconMapping";
import { useMemo, useState } from "react";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import Button from "@/app/components/elements/button/Button";
import WeatherForecast from "./weatherForecast/WeatherForecast";
import { getWeatherForNext24Hours } from "@/utils/weatherUtils";
import { useRouter } from "next/navigation";
import HomeLocationIcon from "./homeLocationIcon/HomeLocationIcon";
import PlaceNameEditor from "./placeNameEditor/PlaceNameEditor";
import ExternalLinkComponent from "./externalLink/ExternalLink";

const FavoriteCityCard = ({
  userId,
  favoriteCityWithWeather,
}: FavoriteCityCardPropsType) => {
  const [showTodaysWeather, setShowTodaysWeather] = useState(true);

  const currentWeather = favoriteCityWithWeather.weather.currentConditions
    .icon as WeatherIconType;

  const userFavoriteCityId = favoriteCityWithWeather.id;
  const cityName = favoriteCityWithWeather.customName;
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

  const backgroundWeather =
    currentWeather !== undefined ? backgroundMapping[currentWeather] : null;
  const currentWeatherIcon =
    currentWeather !== undefined ? iconMapping[currentWeather] : null;
  const lastWeatherFetchDateTime =
    favoriteCityWithWeather.lastWeatherFetchDateTime;
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
      className={styles.cityCard__card}
      style={{ backgroundImage: `url(${backgroundWeather})` }}
    >
      <div className={styles.cityCard__header}>
        <div className={styles.cityCard__cityInfo}>
          <HomeLocationIcon
            cityName={cityName}
            userFavoriteCityId={userFavoriteCityId}
            userId={userId}
          />
          <div className={styles.cityCard__cityName}>{cityName}</div>

          <PlaceNameEditor
            cityName={cityName}
            userFavoriteCityId={userFavoriteCityId}
            cityAddress={cityAddress}
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
          <div className={styles.cityCard__currentDateTime}>
            {lastWeatherFetchDateTime}
          </div>
          <div className={styles.cityCard__currentWeather}>
            <div className={styles.cityCard__currentWeatherIconContainer}>
              <WeatherIcon
                weatherIcon={currentWeatherIcon}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.cityCard__currentTemp}>{currentTemp}°</div>
          </div>
          <div className={styles.cityCard__buttons}>
            <Button
              className="primary"
              text="Weather Details"
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
              iconHeight={50}
              iconWidth={50}
              className="favoriteCityCard"
            />
          </div>
          <div className={styles.cityCard__placeInfoLinks}>
            <ExternalLinkComponent
              linkName="Tourist Attractions"
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
