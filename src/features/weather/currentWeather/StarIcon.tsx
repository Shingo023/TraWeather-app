"use client";

import styles from "./CurrentWeather.module.scss";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addUserFavoriteCity,
  createCity,
  deleteUserFavoriteCity,
  fetchCityData,
} from "@/utils/apiHelper";
import { useParams, useSearchParams } from "next/navigation";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";
import { formatWeatherDataForFavoriteList } from "@/utils/weatherUtils";

const StarIcon = () => {
  const { data: session } = useSession();
  const { lat, lng } = useParams();
  const latitude = Number(lat);
  const longitude = Number(lng);
  const searchParams = useSearchParams();
  const cityToDisplay = searchParams.get("place");
  const address = searchParams.get("address");
  const placeId = searchParams.get("id");

  const {
    favoriteCitiesPlaceIds,
    setFavoriteCitiesPlaceIds,
    setFavoriteCitiesData,
    setFavoriteCitiesWithWeather,
  } = useUserFavoriteCities();
  const { timezone, displayedCityWeather, lastWeatherFetchDateTime } =
    useDisplayedCityWeather();

  const bookmarkCity = async () => {
    if (!session) {
      toast.error("You need to log in to use the favorites feature.");
      return;
    }

    if (!placeId || !cityToDisplay || !address || !timezone) return;

    if (favoriteCitiesPlaceIds && favoriteCitiesPlaceIds.length >= 5) {
      return toast.error(
        "You can only bookmark up to five favorite cities. Please remove one from your list to add this city."
      );
    }

    setFavoriteCitiesPlaceIds((prev) => [...prev, placeId]);

    try {
      // First, check if the city already exists in the FavoriteCity table
      const city = await fetchCityData(placeId);
      let cityId = city?.id;

      if (!city) {
        // If the city does not exist, create a new city in the FavoriteCity table
        const newCity = {
          cityName: cityToDisplay,
          latitude: Number(lat),
          longitude: Number(lng),
          placeId,
          address,
          timeZone: timezone,
        };
        const createdCity = await createCity(newCity);
        cityId = createdCity.id;
      }

      // Now, add the city to the UserFavoriteCity table for the current user
      const newlyAddedUserFavoriteCity = await addUserFavoriteCity(
        session.user.id,
        cityToDisplay,
        cityId
      );

      toast.success(`${cityToDisplay} has been added to your favorite cities!`);
      const newUserFavoriteCity = {
        ...newlyAddedUserFavoriteCity,
        address,
        latitude,
        longitude,
        placeId,
      };
      setFavoriteCitiesData((prev) => [...prev, newUserFavoriteCity]);

      // use ErrorMessage component here
      if (displayedCityWeather && lastWeatherFetchDateTime) {
        const weather = formatWeatherDataForFavoriteList(displayedCityWeather);
        const newUserFavoriteCityWithWeather = {
          ...newUserFavoriteCity,
          weather,
          lastWeatherFetchDateTime,
        };
        setFavoriteCitiesWithWeather((prev) => [
          ...prev,
          newUserFavoriteCityWithWeather,
        ]);
      }
    } catch (error) {
      console.error("Error bookmarking the city:", error);
      setFavoriteCitiesPlaceIds((prev) => prev.filter((id) => id !== placeId));
      toast.error(`Failed to add ${cityToDisplay} to favorites.`);
    }
  };

  const unbookmarkCity = async () => {
    if (!session) {
      toast.error("You need to log in to use the favorites feature.");
      return;
    }

    if (!placeId) return;

    setFavoriteCitiesPlaceIds((prev) => prev.filter((id) => id !== placeId));

    try {
      // First, get the favoriteCityId for the current city (using placeId)
      const city = await fetchCityData(placeId);
      const favoriteCityId = city.id;

      // Delete the city from the UserFavoriteCity table using favoriteCityId
      await deleteUserFavoriteCity(session.user.id, favoriteCityId);

      toast.success(`${cityToDisplay} has been removed from your favorites.`);
      setFavoriteCitiesData((prev) =>
        prev.filter((city) => city.favoriteCityId !== Number(favoriteCityId))
      );
      setFavoriteCitiesWithWeather((prev) =>
        prev.filter((city) => city.favoriteCityId !== Number(favoriteCityId))
      );
    } catch (error) {
      console.error("Error unbookmarking the city:", error);
      setFavoriteCitiesPlaceIds((prev) => [...prev, placeId]);
      toast.error(`Failed to remove ${cityToDisplay} from favorites.`);
    }
  };

  const handleStarClick = () => {
    if (placeId && favoriteCitiesPlaceIds?.includes(placeId)) {
      unbookmarkCity();
    } else {
      bookmarkCity();
    }
  };

  return (
    <div className={`iconContainer ${styles.starIcon}`}>
      <Star
        className={`icon ${
          placeId && favoriteCitiesPlaceIds?.includes(placeId)
            ? styles.isFavorite
            : ""
        }`}
        onClick={handleStarClick}
        style={{
          cursor: placeId ? "pointer" : "not-allowed",
        }}
      />
    </div>
  );
};

export default StarIcon;
