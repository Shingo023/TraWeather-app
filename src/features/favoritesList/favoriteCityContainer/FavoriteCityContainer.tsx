import { FavoriteCityContainerPropsType } from "@/types";
import EditPlaceNameModal from "../editPlaceNameModal/EditPlaceNameModal";
import FavoriteCityCard from "../favoriteCityCard/FavoriteCityCard";
import { useState } from "react";
import Modal from "@/app/components/elements/modal/Modal";
import DeleteFavoriteModal from "../deleteFavoriteModal/DeleteFavoriteModal";
import styles from "./FavoriteCityContainer.module.scss";

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
}: FavoriteCityContainerPropsType) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [placeNameToDisplay, setPlaceNameToDisplay] = useState(
    favoriteCityWithWeather.customName
  );

  return (
    <div className={styles.cityCardContainer}>
      <FavoriteCityCard
        userId={userId}
        favoriteCityWithWeather={favoriteCityWithWeather}
        homeLocationId={homeLocationId}
        setHomeLocationId={setHomeLocationId}
        placeNameToDisplay={placeNameToDisplay}
        setIsEditModalOpen={setIsEditModalOpen}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        deleteActive={deleteActive}
        setFavoriteCitiesToDelete={setFavoriteCitiesToDelete}
      />

      <EditPlaceNameModal
        cityName={favoriteCityWithWeather.customName}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        setPlaceNameToDisplay={setPlaceNameToDisplay}
        userFavoriteCityId={favoriteCityWithWeather.id}
        cityAddress={favoriteCityWithWeather.address}
      />
    </div>
  );
};

export default FavoriteCityContainer;
