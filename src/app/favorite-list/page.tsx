"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FavoriteCityWithWeather,
  PlaceInfoToEditType,
  UserFavoriteCity,
  WeatherDataForFavoritesList,
} from "@/types";
import FavoriteCityContainer from "@/features/favoritesList/favoriteCityContainer/FavoriteCityContainer";
import styles from "./page.module.scss";
import FavoriteCityCardSkeleton from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/FavoriteCityCardSkeleton";
import Modal from "../components/elements/modal/Modal";
import EditPlaceNameModal from "@/features/favoritesList/editPlaceNameModal/EditPlaceNameModal";
import FavoritesListHeader from "@/features/favoritesList/favoritesListHeader/FavoritesListHeader";
import DeleteActionPanel from "@/features/favoritesList/deleteActionPanel/DeleteActionPanel";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [placeInfoToEdit, setPlaceInfoToEdit] =
    useState<PlaceInfoToEditType | null>(null);

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

      const sortedFavoriteCitiesWithWeather =
        favoriteCitiesWithWeatherData.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );

      setFavoriteCitiesWithWeather(sortedFavoriteCitiesWithWeather);
    } catch (error) {
      console.error("Error fetching weather data of favorite cities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.user?.id) return;
    const fetchAllData = async () => {
      const cities = await fetchFavoriteCities();
      if (cities.length > 0) {
        await fetchWeatherData(cities);
      }
    };

    fetchAllData();
  }, [session?.user?.id]);

  // Handle drag events
  const handleDragStart = useCallback((userFavoriteCityId: number) => {
    setDraggedCityId(userFavoriteCityId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    async (targetUserFavoriteCityId: number) => {
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
    },
    [draggedCityId, favoriteCitiesWithWeather, session?.user.id]
  );

  return (
    <div className={styles.favoritesList}>
      <FavoritesListHeader
        deleteActive={deleteActive}
        setDeleteActive={setDeleteActive}
        setLoading={setLoading}
        fetchWeatherData={fetchWeatherData}
        favoriteCities={favoriteCities}
      />

      <div className={styles.favoritesList__favoritesContainer}>
        {loading ? (
          <div className={styles.favoritesList}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <FavoriteCityCardSkeleton key={index} />
              ))}
          </div>
        ) : (
          favoriteCitiesWithWeather.map((favoriteCityWithWeather) => {
            return (
              <FavoriteCityContainer
                key={favoriteCityWithWeather.id}
                userId={session?.user.id}
                favoriteCityWithWeather={favoriteCityWithWeather}
                homeLocationId={homeLocationId}
                setHomeLocationId={setHomeLocationId}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
                deleteActive={deleteActive}
                setFavoriteCitiesToDelete={setFavoriteCitiesToDelete}
                setIsEditModalOpen={setIsEditModalOpen}
                setPlaceInfoToEdit={setPlaceInfoToEdit}
              />
            );
          })
        )}
      </div>

      <DeleteActionPanel
        deleteActive={deleteActive}
        setDeleteActive={setDeleteActive}
        setFavoriteCitiesToDelete={setFavoriteCitiesToDelete}
        favoriteCitiesToDelete={favoriteCitiesToDelete}
        setLoading={setLoading}
        setFavoriteCities={setFavoriteCities}
        setFavoriteCitiesWithWeather={setFavoriteCitiesWithWeather}
      />

      {placeInfoToEdit ? (
        <Modal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          content={
            <EditPlaceNameModal
              cityName={placeInfoToEdit.cityName}
              cityAddress={placeInfoToEdit.cityAddress}
              userFavoriteCityId={placeInfoToEdit.userFavoriteCityId}
              isModalOpen={isEditModalOpen}
              setIsModalOpen={setIsEditModalOpen}
              setFavoriteCitiesWithWeather={setFavoriteCitiesWithWeather}
              setPlaceInfoToEdit={setPlaceInfoToEdit}
            />
          }
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default FavoriteList;
