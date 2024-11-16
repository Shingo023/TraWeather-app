"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FavoriteCityWithWeather,
  UserFavoriteCity,
  WeatherDataForFavoritesList,
  WeatherIconType,
} from "@/types";
import FavoriteCityContainer from "@/features/favoritesList/favoriteCityContainer/FavoriteCityContainer";
import styles from "./page.module.scss";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";
import FavoriteCityCardSkeleton from "@/features/favoritesList/favoriteCityCard/FavoriteCityCardSkeleton";
import { getWeatherForNext24Hours } from "@/utils/weatherUtils";

const FavoriteList = () => {
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);
  const [homeLocationId, setHomeLocationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [draggedCityId, setDraggedCityId] = useState<number | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchFavoriteCitiesWithWeather = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(
          `/api/user-favorite-cities?userId=${session.user.id}`
        );
        const userFavoriteCitiesData = await response.json();

        // Fetch weather data for each favorite city
        const favoriteCitiesWithWeatherData = await Promise.all(
          userFavoriteCitiesData.map(
            async (userFavoriteCity: UserFavoriteCity) => {
              if (userFavoriteCity.isDefault) {
                setHomeLocationId(userFavoriteCity.id);
              }

              const weatherResponse = await fetch(
                `/api/weather/favorite-cities?lat=${userFavoriteCity.favoriteCity.latitude}&lng=${userFavoriteCity.favoriteCity.longitude}`
              );
              const weatherData: WeatherDataForFavoritesList =
                await weatherResponse.json();

              return {
                ...userFavoriteCity,
                weather: weatherData,
              };
            }
          )
        );

        favoriteCitiesWithWeatherData.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );

        setFavoriteCitiesWithWeather(favoriteCitiesWithWeatherData);
      } catch (error) {
        console.error("Error fetching favorite cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCitiesWithWeather();
  }, [status === "authenticated", session?.user?.id]);

  // Handle drag events
  const handleDragStart = (userFavoriteCityId: number) => {
    setDraggedCityId(userFavoriteCityId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (targetUserFavoriteCityId: number) => {
    if (draggedCityId === null) return;

    const updatedCities = [...favoriteCitiesWithWeather];
    const draggedCityIndex = updatedCities.findIndex(
      (city) => city.id === draggedCityId
    );
    const targetCityIndex = updatedCities.findIndex(
      (city) => city.id === targetUserFavoriteCityId
    );

    // Reorder the cities
    const [draggedCity] = updatedCities.splice(draggedCityIndex, 1);
    updatedCities.splice(targetCityIndex, 0, draggedCity);

    setFavoriteCitiesWithWeather(updatedCities);
    setDraggedCityId(null);

    // Save the new order to the database
    const response = await fetch(`/api/update-favorite-cities-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session?.user.id,
        cityOrder: updatedCities.map((city) => city.id),
      }),
    });

    if (!response.ok) {
      console.error("Request failed with status:", response.status);
    } else {
      try {
        const data = await response.json();
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  };

  // Render skeletons while loading
  if (loading) {
    const skeletons = Array(4).fill(null);

    return (
      <div className={styles.favoritesList}>
        {skeletons.map((_, index) => (
          <FavoriteCityCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.favoritesList}>
      {favoriteCitiesWithWeather.map((favoriteCityWithWeather) => {
        const userId = session?.user.id;
        const userFavoriteCityId = favoriteCityWithWeather.id;
        const favoriteCityPlaceId =
          favoriteCityWithWeather.favoriteCity.placeId;
        const cityName = favoriteCityWithWeather.customName;
        const cityAddress = favoriteCityWithWeather.favoriteCity.address;
        const currentTemp = Math.round(
          favoriteCityWithWeather.weather.currentConditions.temp
        );
        const currentWeather = favoriteCityWithWeather.weather.currentConditions
          .icon as WeatherIconType;
        const timeZone = favoriteCityWithWeather.favoriteCity.timeZone;
        const currentDateTime = getCurrentTimeAndDate(timeZone);
        const cityLat = favoriteCityWithWeather.favoriteCity.latitude;
        const cityLng = favoriteCityWithWeather.favoriteCity.longitude;

        const weeklyWeather = favoriteCityWithWeather.weather.weeklyWeather;

        const todaysWeather = favoriteCityWithWeather.weather.days[0].hours;
        const tomorrowsWeather = favoriteCityWithWeather.weather.days[1].hours;
        const twentyFourHoursWeather = getWeatherForNext24Hours(
          todaysWeather,
          tomorrowsWeather,
          timeZone
        );

        return (
          <FavoriteCityContainer
            key={userFavoriteCityId}
            userId={userId}
            userFavoriteCityId={userFavoriteCityId}
            cityName={cityName}
            cityAddress={cityAddress}
            cityPlaceId={favoriteCityPlaceId}
            currentTemp={currentTemp}
            currentWeather={currentWeather}
            currentDateTime={currentDateTime}
            homeLocationId={homeLocationId}
            setHomeLocationId={setHomeLocationId}
            cityLat={cityLat}
            cityLng={cityLng}
            weeklyWeather={weeklyWeather}
            twentyFourHoursWeather={twentyFourHoursWeather}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
          />
        );
      })}
    </div>
  );
};

export default FavoriteList;
