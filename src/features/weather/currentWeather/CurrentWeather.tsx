"use client";

import { CurrentWeatherPropsType } from "@/types";
import styles from "./CurrentWeather.module.scss";
import StarIcon from "./StarIcon";
import CurrentDateTime from "./CurrentDateTime";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import CurrentWeatherSkelton from "./CurrentWeatherSkelton";

const CurrentWeather = ({
  fetchWeatherData,
  currentWeather,
  latitude,
  longitude,
  currentDateTime,
  timezone,
}: CurrentWeatherPropsType) => {
  const [favoriteCitiesPlaceIds, setFavoriteCitiesPlaceIds] = useState<
    string[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const cityToDisplay = searchParams.get("place");
  const address = searchParams.get("address");
  const placeId = searchParams.get("id");

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchFavoriteCitiesPlaceIds = async () => {
      try {
        const response = await fetch(
          `/api/users/${session.user.id}/favorite-cities/placeIds`
        );
        const favoriteCitiesPlaceIdsData = await response.json();
        setFavoriteCitiesPlaceIds(favoriteCitiesPlaceIdsData);
      } catch (error) {
        console.error("Error fetching favorite cities place IDs:", error);
      }
    };
    fetchFavoriteCitiesPlaceIds();
  }, [session?.user?.id]);

  useEffect(() => {
    if (currentWeather && favoriteCitiesPlaceIds) {
      setLoading(false);
    }
  }, [currentWeather, favoriteCitiesPlaceIds]);

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
            <StarIcon
              latitude={latitude}
              longitude={longitude}
              timezone={timezone}
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
          {currentWeather && timezone && (
            <CurrentDateTime
              placeTimeZone={timezone}
              fetchWeatherData={fetchWeatherData}
              latitude={latitude}
              longitude={longitude}
              setLoading={setLoading}
              currentDateTime={currentDateTime}
            />
          )}
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
