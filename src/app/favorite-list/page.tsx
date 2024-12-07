"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import FavoriteCityContainer from "@/features/favoritesList/favoriteCityContainer/FavoriteCityContainer";
import styles from "./page.module.scss";
import FavoriteCityCardSkeleton from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/FavoriteCityCardSkeleton";
import Modal from "../components/elements/modal/Modal";
import EditPlaceNameModal from "@/features/favoritesList/editPlaceNameModal/EditPlaceNameModal";
import FavoritesListHeader from "@/features/favoritesList/favoritesListHeader/FavoritesListHeader";
import DeleteActionPanel from "@/features/favoritesList/deleteActionPanel/DeleteActionPanel";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const FavoriteList = () => {
  const {
    favoriteCitiesData,
    favoriteCitiesWithWeather,
    fetchWeatherData,
    loading,
    isEditModalOpen,
    setIsEditModalOpen,
    weatherFetched,
    favoriteCitiesReady,
  } = useUserFavoriteCities();
  const { data: session } = useSession();

  useEffect(() => {
    if (
      weatherFetched ||
      !session?.user?.id ||
      !Array.isArray(favoriteCitiesData) ||
      !favoriteCitiesReady
    )
      return;

    fetchWeatherData();
  }, [session?.user?.id, favoriteCitiesReady]);

  return (
    <div className={styles.favoritesList}>
      <FavoritesListHeader />

      <div className={styles.favoritesList__favoritesContainer}>
        {loading ? (
          <div className={styles.favoritesList}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <FavoriteCityCardSkeleton key={index} />
              ))}
          </div>
        ) : (
          favoriteCitiesWithWeather.map((favoriteCityWithWeather) => {
            return (
              <FavoriteCityContainer
                key={favoriteCityWithWeather.id}
                userId={session?.user.id}
                favoriteCityWithWeather={favoriteCityWithWeather}
              />
            );
          })
        )}
      </div>

      <DeleteActionPanel />

      <Modal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        content={
          <EditPlaceNameModal
            isModalOpen={isEditModalOpen}
            setIsModalOpen={setIsEditModalOpen}
          />
        }
      />
    </div>
  );
};

export default FavoriteList;
