"use client";

import styles from "./FavoritesListHeader.module.scss";
import { RotateCw, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const FavoritesListHeader = () => {
  const { data: session } = useSession();
  const {
    deleteActive,
    setDeleteActive,
    setLoading,
    fetchWeatherData,
    favoriteCitiesData,
  } = useUserFavoriteCities();

  const favoriteCityExists = favoriteCitiesData!.length > 0;

  return (
    <div className={styles.favoritesList__header}>
      {favoriteCityExists ? (
        <div
          className={`${styles.favoritesList__iconContainer} ${
            deleteActive ? styles.deleteActive : ""
          }`}
          onClick={() => setDeleteActive((prev) => !prev)}
        >
          <Trash2 className={styles.favoritesList__icon} />
        </div>
      ) : null}

      <div className={styles.favoritesList__headerTitle}>Favorite List</div>
      {favoriteCityExists ? (
        <div
          className={styles.favoritesList__iconContainer}
          onClick={() => {
            if (!session?.user?.id || !Array.isArray(favoriteCitiesData))
              return;

            setLoading(true);
            fetchWeatherData();
          }}
        >
          <RotateCw className={styles.favoritesList__icon} />
        </div>
      ) : null}
    </div>
  );
};

export default FavoritesListHeader;
