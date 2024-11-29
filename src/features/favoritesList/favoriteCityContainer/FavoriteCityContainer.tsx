import { FavoriteCityContainerPropsType } from "@/types";
import EditPlaceNameModal from "../editPlaceNameModal/EditPlaceNameModal";
import { useState } from "react";
import styles from "./FavoriteCityContainer.module.scss";
import FavoriteCityDeletionSelector from "../favoriteCityDeletionSelector/FavoriteCityDeletionSelector";
import CityCard from "../cityCard/CityCard";

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
  setIsEditModalOpen,
  setPlaceInfoToEdit,
}: FavoriteCityContainerPropsType) => {
  const [isDragging, setIsDragging] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [placeNameToDisplay, setPlaceNameToDisplay] = useState(
    favoriteCityWithWeather.customName
  );

  const userFavoriteCityId = favoriteCityWithWeather.id;

  return (
    <div className={styles.cityCardContainer}>
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
          // placeNameToDisplay={placeNameToDisplay}
          setIsEditModalOpen={setIsEditModalOpen}
          setPlaceInfoToEdit={setPlaceInfoToEdit}
        />
      </div>

      {/* use Modal component here */}
      {/* <EditPlaceNameModal
        cityName={favoriteCityWithWeather.customName}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        setPlaceNameToDisplay={setPlaceNameToDisplay}
        userFavoriteCityId={favoriteCityWithWeather.id}
        cityAddress={favoriteCityWithWeather.address}
      /> */}
    </div>
  );
};

export default FavoriteCityContainer;
