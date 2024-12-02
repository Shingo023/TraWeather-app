"use client";

import { FavoriteCityContainerPropsType } from "@/types";
import { useState } from "react";
import styles from "./FavoriteCityContainer.module.scss";
import FavoriteCityDeletionSelector from "./favoriteCityDeletionSelector/FavoriteCityDeletionSelector";
import FavoriteCityCard from "./favoriteCityCard/FavoriteCityCard";
import React from "react";

const FavoriteCityContainer = ({
  userId,
  favoriteCityWithWeather,
  homeLocationId,
  setHomeLocationId,
  handleDragStart,
  handleDrop,
  handleDragOver,
  deleteActive,
  setFavoriteCitiesToDelete,
  setIsEditModalOpen,
  setPlaceInfoToEdit,
}: FavoriteCityContainerPropsType) => {
  const [isDragging, setIsDragging] = useState(false);
  const userFavoriteCityId = favoriteCityWithWeather.id;

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
          deleteActive={deleteActive}
          setFavoriteCitiesToDelete={setFavoriteCitiesToDelete}
          favoriteCityId={favoriteCityWithWeather.favoriteCityId}
        />

        <FavoriteCityCard
          userId={userId}
          favoriteCityWithWeather={favoriteCityWithWeather}
          homeLocationId={homeLocationId}
          setHomeLocationId={setHomeLocationId}
          setIsEditModalOpen={setIsEditModalOpen}
          setPlaceInfoToEdit={setPlaceInfoToEdit}
        />
      </div>
    </div>
  );
};

export default React.memo(FavoriteCityContainer);
