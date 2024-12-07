"use client";

import { FavoriteCityCardPropsType, WeatherIconType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import { backgroundMapping, iconMapping } from "@/utils/weatherIconMapping";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import Button from "@/app/components/elements/button/Button";
import WeatherForecast from "./weatherForecast/WeatherForecast";
import { getWeatherForNext24Hours } from "@/utils/weatherUtils";
import { useRouter } from "next/navigation";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";
import HomeLocationIcon from "./homeLocationIcon/HomeLocationIcon";
import PlaceNameEditor from "./placeNameEditor/PlaceNameEditor";

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
  const currentDateTime = useMemo(
    () => getCurrentTimeAndDate(timeZone),
    [timeZone]
  );
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

  const handleAttractionInfoClick = async () => {
    const zoomLevel = 15;
    const searchQuery = encodeURIComponent("tourist attraction");
    const googleMapsUrl = `https://www.google.com/maps/search/${searchQuery}/@${cityLat},${cityLng},${zoomLevel}z`;

    window.open(googleMapsUrl, "_blank");
  };

  const handleEventInfoClick = async () => {
    // Construct the search query using city name and address
    const searchQuery = encodeURIComponent(`${cityAddress}, ${cityName}`);

    // Construct the Eventbrite URL
    const googleMapsUrl = `https://www.eventbrite.com/d/nearby--${searchQuery}/?page=1&sort=best`;

    // Construct the Facebook events URL
    // const googleMapsUrl = `https://www.facebook.com/events/search/?q=${searchQuery}`;

    // Open the constructed URL in a new tab
    window.open(googleMapsUrl, "_blank");
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
            {currentDateTime}
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
            {showTodaysWeather === true ? (
              <WeatherForecast
                dailyOrWeeklyWeather={twentyFourHoursWeather}
                iconHeight={50}
                iconWidth={50}
                cardWidth={100}
                cardColor="rgba(255, 255, 255, 0.3)"
              />
            ) : (
              <WeatherForecast
                dailyOrWeeklyWeather={weeklyWeather}
                iconHeight={50}
                iconWidth={50}
                cardWidth={100}
                cardColor="rgba(255, 255, 255, 0.3)"
              />
            )}
          </div>
          <div className={styles.cityCard__placeInfoLinks}>
            <div onClick={handleAttractionInfoClick}>
              Tourist Attractions
              <ExternalLink width={20} height={20} />
            </div>
            <div onClick={handleEventInfoClick}>
              Events
              <ExternalLink width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCityCard;
