"use client";

import { Dispatch, SetStateAction } from "react";
import styles from "./FavoritesListHeader.module.scss";
import { RotateCw, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { UserFavoriteCity } from "@/types";
import React from "react";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const FavoritesListHeader = () =>
  //   {
  //   deleteActive,
  //   setDeleteActive,
  //   setLoading,
  //   fetchWeatherData,
  //   favoriteCities,
  // }: {
  //   deleteActive: boolean;
  //   setDeleteActive: Dispatch<SetStateAction<boolean>>;
  //   setLoading: Dispatch<SetStateAction<boolean>>;
  //   fetchWeatherData: (cities: UserFavoriteCity[]) => Promise<void>;
  //   favoriteCities: UserFavoriteCity[];
  // }
  {
    const { data: session } = useSession();
    const { deleteActive, setDeleteActive, setLoading, fetchWeatherData } =
      useUserFavoriteCities();

    return (
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
            fetchWeatherData();
          }}
        >
          <RotateCw className={styles.favoritesList__icon} />
        </div>
      </div>
    );
  };

export default FavoritesListHeader;
