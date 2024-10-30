import { FavoriteCityContainerPropsType } from "@/types";
import EditPlaceNameModal from "../editPlaceNameModal/EditPlaceNameModal";
import FavoriteCityCard from "../favoriteCityCard/FavoriteCityCard";
import { useState } from "react";

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
  twentyFourHoursWeather,
  handleDragStart,
  handleDrop,
  handleDragOver,
}: FavoriteCityContainerPropsType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placeNameToDisplay, setPlaceNameToDisplay] = useState(cityName);

  return (
    <div>
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
        setIsModalOpen={setIsModalOpen}
        twentyFourHoursWeather={twentyFourHoursWeather}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
      />

      <EditPlaceNameModal
        cityName={cityName}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setPlaceNameToDisplay={setPlaceNameToDisplay}
        userFavoriteCityId={userFavoriteCityId}
        cityAddress={cityAddress}
      />
    </div>
  );
};

export default FavoriteCityContainer;
