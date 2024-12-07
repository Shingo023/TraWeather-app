"use client";

import { FavoriteCityContainerPropsType } from "@/types";
import { useState } from "react";
import styles from "./FavoriteCityContainer.module.scss";
import FavoriteCityDeletionSelector from "./favoriteCityDeletionSelector/FavoriteCityDeletionSelector";
import FavoriteCityCard from "./favoriteCityCard/FavoriteCityCard";
import React from "react";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";
import { saveNewFavoriteCitiesOrder } from "@/utils/apiHelper";

const FavoriteCityContainer = ({
  userId,
  favoriteCityWithWeather,
}: FavoriteCityContainerPropsType) => {
  const [isDragging, setIsDragging] = useState(false);
  const userFavoriteCityId = favoriteCityWithWeather.id;
  const {
    deleteActive,
    draggedCityId,
    setDraggedCityId,
    favoriteCitiesWithWeather,
    setFavoriteCitiesWithWeather,
    setFavoriteCitiesData,
  } = useUserFavoriteCities();

  // Handle drag events
  const handleDragStart = (userFavoriteCityId: number) => {
    setDraggedCityId(userFavoriteCityId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (targetUserFavoriteCityId: number) => {
    if (draggedCityId === null) return;

    const updatedCitiesWithWeather = [...favoriteCitiesWithWeather];
    const draggedCityIndex = updatedCitiesWithWeather.findIndex(
      (city) => city.id === draggedCityId
    );
    const targetCityIndex = updatedCitiesWithWeather.findIndex(
      (city) => city.id === targetUserFavoriteCityId
    );

    // Reorder the cities
    const [draggedCity] = updatedCitiesWithWeather.splice(draggedCityIndex, 1);
    updatedCitiesWithWeather.splice(targetCityIndex, 0, draggedCity);

    setFavoriteCitiesWithWeather(updatedCitiesWithWeather);
    setDraggedCityId(null);

    const newCityOrder = updatedCitiesWithWeather.map((city) => city.id);
    await saveNewFavoriteCitiesOrder(userId, newCityOrder);

    const newDisplayOrders = newCityOrder.map((id: number, index) => ({
      id,
      displayOrder: index,
    }));

    setFavoriteCitiesData((prev) =>
      prev.map((city) => {
        const updatedOrder = newDisplayOrders.find(
          (item) => item.id === city.id
        );
        return updatedOrder && updatedOrder.displayOrder !== city.displayOrder
          ? { ...city, displayOrder: updatedOrder.displayOrder }
          : city;
      })
    );
  };

  return (
    <div className={styles.cityCardContainer}>
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
        <FavoriteCityDeletionSelector
          favoriteCityId={favoriteCityWithWeather.favoriteCityId}
        />

        <FavoriteCityCard
          userId={userId}
          favoriteCityWithWeather={favoriteCityWithWeather}
        />
      </div>
    </div>
  );
};

export default React.memo(FavoriteCityContainer);
