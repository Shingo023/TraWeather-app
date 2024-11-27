import { FavoriteCityContainerPropsType } from "@/types";
import EditPlaceNameModal from "../editPlaceNameModal/EditPlaceNameModal";
import FavoriteCityCard from "../favoriteCityCard/FavoriteCityCard";
import { useState } from "react";
import Modal from "@/app/components/elements/modal/Modal";
import DeleteFavoriteModal from "../deleteFavoriteModal/DeleteFavoriteModal";
import styles from "./FavoriteCityContainer.module.scss";

const FavoriteCityContainer = ({
  favoriteCityId,
  userFavoriteCityId,
  userId,
  cityName,
  cityAddress,
  cityPlaceId,
  currentTemp,
  currentWeather,
  // currentDateTime,
  timeZone,
  homeLocationId,
  setHomeLocationId,
  cityLat,
  cityLng,
  weeklyWeather,
  // twentyFourHoursWeather,
  todaysWeather,
  tomorrowsWeather,
  handleDragStart,
  handleDrop,
  handleDragOver,
  deleteActive,
  setFavoriteCitiesToDelete,
}: FavoriteCityContainerPropsType) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [placeNameToDisplay, setPlaceNameToDisplay] = useState(cityName);

  return (
    <div className={styles.cityCardContainer}>
      <FavoriteCityCard
        userId={userId}
        favoriteCityId={favoriteCityId}
        userFavoriteCityId={userFavoriteCityId}
        cityName={cityName}
        cityAddress={cityAddress}
        cityPlaceId={cityPlaceId}
        currentTemp={currentTemp}
        currentWeather={currentWeather}
        // currentDateTime={currentDateTime}
        timeZone={timeZone}
        homeLocationId={homeLocationId}
        setHomeLocationId={setHomeLocationId}
        cityLat={cityLat}
        cityLng={cityLng}
        placeNameToDisplay={placeNameToDisplay}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        weeklyWeather={weeklyWeather}
        // twentyFourHoursWeather={twentyFourHoursWeather}
        todaysWeather={todaysWeather}
        tomorrowsWeather={tomorrowsWeather}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        deleteActive={deleteActive}
        setFavoriteCitiesToDelete={setFavoriteCitiesToDelete}
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
