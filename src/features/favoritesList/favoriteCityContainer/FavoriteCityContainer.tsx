"use client";

import { FavoriteCityContainerPropsType } from "@/types";
import { useState } from "react";
import styles from "./FavoriteCityContainer.module.scss";
import FavoriteCityDeletionSelector from "./favoriteCityDeletionSelector/FavoriteCityDeletionSelector";
import FavoriteCityCard from "./favoriteCityCard/FavoriteCityCard";
import React from "react";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const FavoriteCityContainer = ({
  userId,
  favoriteCityWithWeather,
  handleDragStart,
  handleDrop,
  handleDragOver,
}: FavoriteCityContainerPropsType) => {
  const [isDragging, setIsDragging] = useState(false);
  const userFavoriteCityId = favoriteCityWithWeather.id;
  const { deleteActive } = useUserFavoriteCities();

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
