"use client";

import { FavoriteCityCardPropsType, WeatherIconType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import { backgroundMapping, iconMapping } from "@/utils/weatherIconMapping";
import { ExternalLink, Pencil } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMemo, useState } from "react";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import Button from "@/app/components/elements/button/Button";
import WeatherForecast from "./weatherForecast/WeatherForecast";
import { getWeatherForNext24Hours } from "@/utils/weatherUtils";
import { useRouter } from "next/navigation";
import { MapPinIcon } from "@heroicons/react/24/solid";
import ToolTip from "@/app/components/elements/toolTip/ToolTip";

const FavoriteCityCard = ({
  userId,
  favoriteCityWithWeather,
  homeLocationId,
  setHomeLocationId,
  setIsEditModalOpen,
  setPlaceInfoToEdit,
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

  // Functions
  const updateHomeLocationApi = async (body: any) => {
    const response = await fetch(`/api/users/${userId}/default-city`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update default city");
    }
    return response;
  };

  const updateHomeLocation = async (newHomeLocationId: number | null) => {
    try {
      await updateHomeLocationApi({
        currentHomeLocationId: homeLocationId,
        newHomeLocationId,
      });
      setHomeLocationId(newHomeLocationId);
      toast.success(
        `${cityName} has been successfully set as the home location.`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unsetHomeLocation = async () => {
    try {
      await updateHomeLocationApi({
        currentHomeLocationId: homeLocationId,
      });
      setHomeLocationId(null);
      toast.success(`${cityName} has been unset as the home location.`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (userFavoriteCityId === homeLocationId) {
      unsetHomeLocation();
    } else {
      updateHomeLocation(userFavoriteCityId);
    }
  };

  const handleWeatherInfoClick = () => {
    router.push(
      // `/weather/${cityLat}/${cityLng}?place=${placeNameToDisplay}&address=${cityAddress}&id=${cityPlaceId}`
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
          <div className={styles.cityCard__homeIconContainer}>
            <MapPinIcon
              className={`${styles.cityCard__homeIcon} ${
                userFavoriteCityId === homeLocationId
                  ? styles.homeIconActive
                  : ""
              }`}
              onClick={handleIconClick}
            />
            <div className={styles.cityCard__tooltip}>
              <ToolTip
                message={
                  userFavoriteCityId === homeLocationId
                    ? "Unset home location"
                    : "Set as home location"
                }
                width={110}
              />
            </div>
          </div>
          <div className={styles.cityCard__cityName}>{cityName}</div>

          <div
            className={styles.cityCard__editIconContainer}
            onClick={(event) => {
              event.stopPropagation();
              const placeInfoToEdit = {
                cityName,
                userFavoriteCityId,
                cityAddress,
              };
              setPlaceInfoToEdit(placeInfoToEdit);
              setIsEditModalOpen(true);
            }}
          >
            <div className={styles.cityCard__editIcon}>
              <Pencil width={20} height={20} />
            </div>
            <div className={styles.cityCard__tooltip}>
              <ToolTip message="Edit Place Name" width={130} />
            </div>
          </div>
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
                cardWidth={110}
              />
            ) : (
              <WeatherForecast
                dailyOrWeeklyWeather={weeklyWeather}
                iconHeight={50}
                iconWidth={50}
                cardWidth={110}
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
