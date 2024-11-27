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
import FavoriteCityCardSkeleton from "@/features/favoritesList/favoriteCityCard/FavoriteCityCardSkeleton";
import { RotateCw, Trash2 } from "lucide-react";
import Button from "../components/elements/button/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCity } from "@/utils/apiHelper";

const FavoriteList = () => {
  const [favoriteCities, setFavoriteCities] = useState<UserFavoriteCity[]>([]);
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);
  const [homeLocationId, setHomeLocationId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [draggedCityId, setDraggedCityId] = useState<number | null>(null);
  const [deleteActive, setDeleteActive] = useState(false);
  const [favoriteCitiesToDelete, setFavoriteCitiesToDelete] = useState<
    number[]
  >([]); // favoriteCityIds

  const { data: session } = useSession();

  const fetchFavoriteCities = async () => {
    try {
      const response = await fetch(
        `/api/user-favorite-cities?userId=${session?.user?.id}`
      );
      const userFavoriteCitiesData = await response.json();
      setFavoriteCities(userFavoriteCitiesData);
      return userFavoriteCitiesData;
    } catch (error) {
      console.error("Error fetching favorite cities:", error);
    }
  };

  const fetchWeatherData = async (cities: UserFavoriteCity[]) => {
    try {
      // Fetch weather data for each favorite city
      const favoriteCitiesWithWeatherData = await Promise.all(
        cities.map(async (userFavoriteCity: UserFavoriteCity) => {
          if (userFavoriteCity.isDefaultCity) {
            setHomeLocationId(userFavoriteCity.id);
          }

          const weatherResponse = await fetch(
            `/api/weather/favorite-cities?lat=${userFavoriteCity.latitude}&lng=${userFavoriteCity.longitude}`
          );
          const weatherData: WeatherDataForFavoritesList =
            await weatherResponse.json();

          return {
            ...userFavoriteCity,
            weather: weatherData,
          };
        })
      );

      favoriteCitiesWithWeatherData.sort(
        (a, b) => a.displayOrder - b.displayOrder
      );

      setFavoriteCitiesWithWeather(favoriteCitiesWithWeatherData);
    } catch (error) {
      console.error("Error fetching weather data of favorite cities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const cities = await fetchFavoriteCities();
      if (cities.length > 0) {
        await fetchWeatherData(cities);
      }
    };

    fetchAllData();
  }, [session?.user?.id]);

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

  // Button actions
  const deleteSelectedCities = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      await Promise.all(
        favoriteCitiesToDelete.map((favoriteCityId) => {
          deleteCity(session.user.id, favoriteCityId);
        })
      );

      setFavoriteCities((prev) => {
        return prev.filter(
          (item) => !favoriteCitiesToDelete.includes(item.favoriteCityId)
        );
      });

      setFavoriteCitiesWithWeather((prev) => {
        return prev.filter(
          (item) => !favoriteCitiesToDelete.includes(item.favoriteCityId)
        );
      });
      setFavoriteCitiesToDelete([]);
      setDeleteActive(false);
      toast.success("Selected cities have been removed from your favorites.");
    } catch (error) {
      console.error("Error deleting favorite cities:", error);
      toast.error("Failed to remove selected cities from favorites.");
    } finally {
      setLoading(false);
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
      <div className={styles.favoritesList__header}>
        <div
          className={`${styles.favoritesList__iconContainer} ${
            deleteActive ? styles.deleteActive : ""
          }`}
          onClick={() => setDeleteActive((prev) => !prev)}
        >
          <Trash2 className={styles.favoritesList__icon} />
        </div>
        <div className={styles.favoritesList__headerTitle}>Favorite List</div>
        <div
          className={styles.favoritesList__iconContainer}
          onClick={() => {
            if (!session?.user?.id) return;

            setLoading(true);
            fetchWeatherData(favoriteCities);
          }}
        >
          <RotateCw className={styles.favoritesList__icon} />
        </div>
      </div>

      <div
        className={`${styles.favoritesList__deleteButtons} ${
          deleteActive ? styles.deleteActive : styles.deleteInactive
        }`}
      >
        <Button
          className="deleteCancel"
          onClick={() => {
            setDeleteActive(false);
            setFavoriteCitiesToDelete([]);
          }}
          text="Cancel"
          type="button"
        />
        <Button
          className="delete"
          onClick={deleteSelectedCities}
          text={`Delete(${favoriteCitiesToDelete.length})`}
          type="button"
          isDisabled={!favoriteCitiesToDelete.length}
        />
      </div>

      <div className={styles.favoritesList__favoritesContainer}>
        {favoriteCitiesWithWeather.map((favoriteCityWithWeather) => {
          const favoriteCityId = favoriteCityWithWeather.favoriteCityId;
          const userFavoriteCityId = favoriteCityWithWeather.id;
          const favoriteCityPlaceId = favoriteCityWithWeather.placeId;
          const cityName = favoriteCityWithWeather.customName;
          const cityAddress = favoriteCityWithWeather.address;
          const currentTemp = Math.round(
            favoriteCityWithWeather.weather.currentConditions.temp
          );
          const currentWeather = favoriteCityWithWeather.weather
            .currentConditions.icon as WeatherIconType;
          const timeZone = favoriteCityWithWeather.weather.timezone;
          const cityLat = favoriteCityWithWeather.latitude;
          const cityLng = favoriteCityWithWeather.longitude;

          const weeklyWeather = favoriteCityWithWeather.weather.weeklyWeather;

          const todaysWeather = favoriteCityWithWeather.weather.days[0].hours;
          const tomorrowsWeather =
            favoriteCityWithWeather.weather.days[1].hours;

          return (
            <FavoriteCityContainer
              key={userFavoriteCityId}
              userId={session?.user.id}
              favoriteCityId={favoriteCityId}
              userFavoriteCityId={userFavoriteCityId}
              cityName={cityName}
              cityAddress={cityAddress}
              cityPlaceId={favoriteCityPlaceId}
              currentTemp={currentTemp}
              currentWeather={currentWeather}
              timeZone={timeZone}
              homeLocationId={homeLocationId}
              setHomeLocationId={setHomeLocationId}
              cityLat={cityLat}
              cityLng={cityLng}
              weeklyWeather={weeklyWeather}
              todaysWeather={todaysWeather}
              tomorrowsWeather={tomorrowsWeather}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              deleteActive={deleteActive}
              setFavoriteCitiesToDelete={setFavoriteCitiesToDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FavoriteList;
