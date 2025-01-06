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
import Link from "next/link";

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
  }, [
    session?.user?.id,
    favoriteCitiesReady,
    favoriteCitiesData,
    fetchWeatherData,
    weatherFetched,
  ]);

  return (
    <div className={styles.favoritesList}>
      <FavoritesListHeader />

      <div className={styles.favoritesList__favoritesContainer}>
        {favoriteCitiesWithWeather.length === 0 ? (
          <div className={styles.favoritesList__notification}>
            <h1>You have no favorite places yet.</h1>
            <p>
              Search for your favorite places on the weather page and click the
              star icon to add them to your favorites list!
            </p>
            <Link href={"/weather"}>Search for favorite places</Link>
          </div>
        ) : loading ? (
          <div className={styles.favoritesList}>
            {Array(favoriteCitiesData?.length ?? 0)
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
