"use client";

import { Check } from "lucide-react";
import styles from "./FavoriteCityDeletionSelector.module.scss";
import { useEffect, useState } from "react";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const FavoriteCityDeletionSelector = ({
  favoriteCityId,
}: {
  favoriteCityId: number;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { deleteActive, setFavoriteCitiesToDelete } = useUserFavoriteCities();

  useEffect(() => {
    if (!deleteActive) {
      setIsChecked(false);
    }
  }, [deleteActive]);

  const selectCityToDelete = (favoriteCityId: number) => {
    setIsChecked((prev) => !prev);
    setFavoriteCitiesToDelete((prev) => {
      if (prev.includes(favoriteCityId)) {
        return prev.filter((id) => id !== favoriteCityId);
      } else {
        return [...prev, favoriteCityId];
      }
    });
  };

  return (
    <div className={styles.cityCard__deleteSection}>
      <div
        className={`${styles.cityCard__iconContainer} ${
          isChecked ? styles.isChecked : ""
        }`}
        onClick={() => {
          selectCityToDelete(favoriteCityId);
        }}
      >
        <Check className={styles.cityCard__deleteCheckIcon} />
      </div>
    </div>
  );
};

export default FavoriteCityDeletionSelector;
