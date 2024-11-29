"use client";

import { Dispatch, SetStateAction } from "react";
import styles from "./FavoritesListHeader.module.scss";
import { RotateCw, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { UserFavoriteCity } from "@/types";

const FavoritesListHeader = ({
  deleteActive,
  setDeleteActive,
  setLoading,
  fetchWeatherData,
  favoriteCities,
}: {
  deleteActive: boolean;
  setDeleteActive: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  fetchWeatherData: (cities: UserFavoriteCity[]) => Promise<void>;
  favoriteCities: UserFavoriteCity[];
}) => {
  const { data: session } = useSession();

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
          fetchWeatherData(favoriteCities);
        }}
      >
        <RotateCw className={styles.favoritesList__icon} />
      </div>
    </div>
  );
};

export default FavoritesListHeader;
