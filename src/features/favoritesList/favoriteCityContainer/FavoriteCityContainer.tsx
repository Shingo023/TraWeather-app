import { FavoriteCityContainerPropsType } from "@/types";
import EditPlaceNameModal from "../editPlaceNameModal/EditPlaceNameModal";
import FavoriteCityCard from "../favoriteCityCard/FavoriteCityCard";
import { useState } from "react";
import Modal from "@/app/components/elements/modal/Modal";
import DeleteFavoriteModal from "../deleteFavoriteModal/DeleteFavoriteModal";
import styles from "./FavoriteCityContainer.module.scss";

const FavoriteCityContainer = ({
  userFavoriteCityId,
  userId,
  cityName,
  cityAddress,
  cityPlaceId,
  currentTemp,
  currentWeather,
  currentDateTime,
  homeLocationId,
  setHomeLocationId,
  cityLat,
  cityLng,
  weeklyWeather,
  twentyFourHoursWeather,
  handleDragStart,
  handleDrop,
  handleDragOver,
  deleteActive,
}: FavoriteCityContainerPropsType) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [placeNameToDisplay, setPlaceNameToDisplay] = useState(cityName);

  return (
    <div className={styles.cityCardContainer}>
      <FavoriteCityCard
        userId={userId}
        userFavoriteCityId={userFavoriteCityId}
        cityName={cityName}
        cityAddress={cityAddress}
        cityPlaceId={cityPlaceId}
        currentTemp={currentTemp}
        currentWeather={currentWeather}
        currentDateTime={currentDateTime}
        homeLocationId={homeLocationId}
        setHomeLocationId={setHomeLocationId}
        cityLat={cityLat}
        cityLng={cityLng}
        placeNameToDisplay={placeNameToDisplay}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        weeklyWeather={weeklyWeather}
        twentyFourHoursWeather={twentyFourHoursWeather}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        deleteActive={deleteActive}
      />

      <EditPlaceNameModal
        cityName={cityName}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        setPlaceNameToDisplay={setPlaceNameToDisplay}
        userFavoriteCityId={userFavoriteCityId}
        cityAddress={cityAddress}
      />

      <Modal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        content={
          <DeleteFavoriteModal
            cityName={cityName}
            setIsModalOpen={setIsDeleteModalOpen}
          />
        }
      />
    </div>
  );
};

export default FavoriteCityContainer;
