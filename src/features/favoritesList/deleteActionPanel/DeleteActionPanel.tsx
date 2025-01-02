"use client";

import Button from "@/app/components/elements/button/Button";
import styles from "./DeleteActionPanel.module.scss";
import { useSession } from "next-auth/react";
import { deleteCity } from "@/utils/apiHelper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const DeleteActionPanel = () => {
  const { data: session } = useSession();
  const {
    setLoading,
    favoriteCitiesToDelete,
    favoriteCitiesData,
    setFavoriteCitiesData,
    setFavoriteCitiesWithWeather,
    setFavoriteCitiesPlaceIds,
    setFavoriteCitiesToDelete,
    setDeleteActive,
    deleteActive,
  } = useUserFavoriteCities();

  const deleteSelectedCities = async () => {
    if (!session?.user?.id) return;

    try {
      await Promise.all(
        favoriteCitiesToDelete.map(async (favoriteCityId) => {
          try {
            await deleteCity(session.user.id, favoriteCityId);
          } catch (error) {
            console.error(
              `Failed to delete city with ID ${favoriteCityId}:`,
              error
            );
          }
        })
      );

      setFavoriteCitiesData((prev) => {
        const updatedFavoriteCities = prev.filter(
          (item) => !favoriteCitiesToDelete.includes(item.favoriteCityId)
        );
        setFavoriteCitiesPlaceIds(
          updatedFavoriteCities.map((city) => city.placeId) ?? []
        );
        return updatedFavoriteCities;
      });

      setFavoriteCitiesWithWeather((prev) => {
        return prev.filter(
          (item) => !favoriteCitiesToDelete.includes(item.favoriteCityId)
        );
      });

      setFavoriteCitiesToDelete([]);
      setDeleteActive(false);
      toast.success("Selected cities have been removed from your favorites.");
    } catch (error) {
      console.error("Error deleting favorite cities:", error);
      toast.error("Failed to remove selected cities from favorites.");
    }
  };

  return (
    <div
      className={`${styles.favoritesList__deleteButtons} ${
        deleteActive ? styles.deleteActive : styles.deleteInactive
      }`}
    >
      <Button
        className="deleteCancel"
        onClick={() => {
          setDeleteActive(false);
          setFavoriteCitiesToDelete([]);
        }}
        text="Cancel"
        type="button"
      />
      <Button
        className="delete"
        onClick={deleteSelectedCities}
        text={`Delete(${favoriteCitiesToDelete.length})`}
        type="button"
        isDisabled={!favoriteCitiesToDelete.length}
      />
    </div>
  );
};

export default DeleteActionPanel;
