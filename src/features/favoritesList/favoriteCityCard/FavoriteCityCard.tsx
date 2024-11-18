"use client";

import { FavoriteCityCardPropsType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import { backgroundMapping, iconMapping } from "@/utils/weatherIconMapping";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import WeatherForecast from "./weatherForecast/WeatherForecast";
import Button from "@/app/components/elements/button/Button";
import { Check, ExternalLink, Pencil, Trash2 } from "lucide-react";

const FavoriteCityCard = React.memo(
  ({
    userFavoriteCityId,
    userId,
    cityName,
    cityAddress,
    cityPlaceId,
    currentTemp,
    currentWeather,
    currentDateTime,
    homeLocationId,
    setHomeLocationId,
    cityLat,
    cityLng,
    placeNameToDisplay,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    weeklyWeather,
    twentyFourHoursWeather,
    handleDragStart,
    handleDrop,
    handleDragOver,
    deleteActive,
  }: FavoriteCityCardPropsType) => {
    const [isDragging, setIsDragging] = useState(false);
    const [showTodaysWeather, setShowTodaysWeather] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const currentWeatherIcon =
      currentWeather !== undefined ? iconMapping[currentWeather] : null;
    const backgroundWeather =
      currentWeather !== undefined ? backgroundMapping[currentWeather] : null;
    const router = useRouter();

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
        `/weather/${cityLat}/${cityLng}?place=${placeNameToDisplay}&address=${cityAddress}&id=${cityPlaceId}`
      );
    };

    const handleAttractionInfoClick = async () => {
      // tourist attractions
      const zoomLevel = 15;
      const searchQuery = encodeURIComponent("tourist attraction");
      const googleMapsUrl = `https://www.google.com/maps/search/${searchQuery}/@${cityLat},${cityLng},${zoomLevel}z`;

      window.open(googleMapsUrl, "_blank");
    };

    const handleEventInfoClick = async () => {
      // events
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
        className={`${styles.cityCard} ${isDragging ? styles.dragging : ""} ${
          deleteActive ? styles.deleteActive : styles.deleteInactive
        }`}
        draggable
        onDragStart={() => {
          setIsDragging(true);
          handleDragStart(userFavoriteCityId);
        }}
        onDragEnd={() => setIsDragging(false)}
        onDragOver={handleDragOver}
        onDrop={() => {
          setIsDragging(false);
          handleDrop(userFavoriteCityId);
        }}
      >
        <div className={styles.cityCard__deleteSection}>
          <div
            className={`${styles.cityCard__iconContainer} ${
              isChecked ? styles.isChecked : ""
            }`}
            onClick={() => setIsChecked((prev) => !prev)}
          >
            <Check className={styles.cityCard__deleteCheckIcon} />
          </div>
        </div>
        <div
          className={styles.cityCard__card}
          style={{ backgroundImage: `url(${backgroundWeather})` }}
        >
          <div className={styles.cityCard__header}>
            <div className={styles.cityCard__cityInfo}>
              <div className={styles.cityCard__homeIconContainer}>
                <MapPinIcon
                  className={`${styles.cityCard__homeIcon} ${
                    userFavoriteCityId === homeLocationId ? styles.active : ""
                  }`}
                  onClick={handleIconClick}
                />
                <span className={styles.cityCard__homeIconTooltip}>
                  {userFavoriteCityId === homeLocationId
                    ? "Unset home location"
                    : "Set as home location"}
                </span>
              </div>
              <div className={styles.cityCard__cityName}>
                {placeNameToDisplay}
              </div>
              <div
                className={styles.cityCard__edit}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsEditModalOpen(true);
                }}
              >
                <Pencil width={20} height={20} />
              </div>
              <div
                className={styles.cityCard__delete}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsDeleteModalOpen(true);
                }}
              >
                <Trash2 width={20} height={20} />
              </div>
              {/* <div className={styles.cityCard__cityAddress}>{cityAddress}</div> */}
            </div>

            <div className={styles.cityCard__forecastToggle}>
              <div
                className={`${styles.cityCard__selectedForecast} ${
                  showTodaysWeather === true ? styles.active : ""
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
                  showTodaysWeather === false ? styles.active : ""
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
                <div className={styles.cityCard__currentTemp}>
                  {currentTemp}°
                </div>
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
      </div>
    );
  }
);

export default FavoriteCityCard;
