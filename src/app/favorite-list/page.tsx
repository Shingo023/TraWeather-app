"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FavoriteCityContainer from "@/features/favoritesList/favoriteCityContainer/FavoriteCityContainer";
import styles from "./page.module.scss";
import FavoriteCityCardSkeleton from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/FavoriteCityCardSkeleton";
import Modal from "../components/elements/modal/Modal";
import EditPlaceNameModal from "@/features/favoritesList/editPlaceNameModal/EditPlaceNameModal";
import FavoritesListHeader from "@/features/favoritesList/favoritesListHeader/FavoritesListHeader";
import DeleteActionPanel from "@/features/favoritesList/deleteActionPanel/DeleteActionPanel";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const FavoriteList = () => {
  const [draggedCityId, setDraggedCityId] = useState<number | null>(null);

  const {
    favoriteCitiesData,
    favoriteCitiesWithWeather,
    setFavoriteCitiesWithWeather,
    setHomeLocationId,
    fetchWeatherData,
    loading,
    isEditModalOpen,
    setIsEditModalOpen,
  } = useUserFavoriteCities();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id || !favoriteCitiesData) return;
    fetchWeatherData();
  }, [session?.user?.id, favoriteCitiesData]);

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
      <FavoritesListHeader />

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
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
                handleDragOver={handleDragOver}
              />
            );
          })
        )}
      </div>

      <DeleteActionPanel />

      <Modal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        content={
          <EditPlaceNameModal
            isModalOpen={isEditModalOpen}
            setIsModalOpen={setIsEditModalOpen}
          />
        }
      />
    </div>
  );
};

export default FavoriteList;
