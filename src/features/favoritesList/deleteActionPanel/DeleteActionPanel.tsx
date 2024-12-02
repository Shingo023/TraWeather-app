"use client";

import Button from "@/app/components/elements/button/Button";
import styles from "./DeleteActionPanel.module.scss";
import { useSession } from "next-auth/react";
import { deleteCity } from "@/utils/apiHelper";
import { DeleteActionPanelType } from "@/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const DeleteActionPanel = ({
  deleteActive,
  setDeleteActive,
  favoriteCitiesToDelete,
  setFavoriteCitiesToDelete,
  setLoading,
  setFavoriteCities,
  setFavoriteCitiesWithWeather,
}: DeleteActionPanelType) => {
  const { data: session } = useSession();

  const deleteSelectedCities = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      await Promise.all(
        favoriteCitiesToDelete.map((favoriteCityId) => {
          deleteCity(session.user.id, favoriteCityId);
        })
      );

      setFavoriteCities((prev) => {
        return prev.filter(
          (item) => !favoriteCitiesToDelete.includes(item.favoriteCityId)
        );
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
    } finally {
      setLoading(false);
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
