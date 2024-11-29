"use client";

import { FavoriteCityCardPropsType, WeatherIconType } from "@/types";
import styles from "./FavoriteCityCard.module.scss";
import React, { useEffect, useState } from "react";
import FavoriteCityDeletionSelector from "../favoriteCityDeletionSelector/FavoriteCityDeletionSelector";
import CityCard from "../cityCard/CityCard";

const FavoriteCityCard = React.memo(
  ({
    userId,
    favoriteCityWithWeather,
    homeLocationId,
    setHomeLocationId,
    placeNameToDisplay,
    setIsEditModalOpen,
    handleDragStart,
    handleDrop,
    handleDragOver,
    deleteActive,
    setFavoriteCitiesToDelete,
  }: FavoriteCityCardPropsType) => {
    const [isDragging, setIsDragging] = useState(false);

    const userFavoriteCityId = favoriteCityWithWeather.id;

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
        <FavoriteCityDeletionSelector
          deleteActive={deleteActive}
          setFavoriteCitiesToDelete={setFavoriteCitiesToDelete}
          favoriteCityId={favoriteCityWithWeather.favoriteCityId}
        />

        <CityCard
          userId={userId}
          favoriteCityWithWeather={favoriteCityWithWeather}
          homeLocationId={homeLocationId}
          setHomeLocationId={setHomeLocationId}
          placeNameToDisplay={placeNameToDisplay}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </div>
    );
  }
);

export default FavoriteCityCard;
