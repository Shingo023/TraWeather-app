"use client";

import {
  FavoriteCityWithWeather,
  PlaceInfoToEditType,
  UserFavoriteCity,
  WeatherDataForFavoritesList,
} from "@/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the types for the weather data
interface UserFavoriteCitiesContextType {
  favoriteCitiesData: UserFavoriteCity[] | null;
  setFavoriteCitiesData: Dispatch<SetStateAction<UserFavoriteCity[]>>;
  favoriteCitiesPlaceIds: string[] | null;
  setFavoriteCitiesPlaceIds: Dispatch<SetStateAction<string[]>>;

  favoriteCitiesWithWeather: FavoriteCityWithWeather[];
  setFavoriteCitiesWithWeather: Dispatch<
    SetStateAction<FavoriteCityWithWeather[]>
  >;

  homeLocationId: number | null;
  setHomeLocationId: Dispatch<SetStateAction<number | null>>;

  deleteActive: boolean;
  setDeleteActive: Dispatch<SetStateAction<boolean>>;
  favoriteCitiesToDelete: number[];
  setFavoriteCitiesToDelete: Dispatch<SetStateAction<number[]>>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  placeInfoToEdit: PlaceInfoToEditType | null;
  setPlaceInfoToEdit: Dispatch<SetStateAction<PlaceInfoToEditType | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;

  fetchWeatherData: () => Promise<void>;
}

// Create the context with default values
const UserFavoriteCitiesContext = createContext<
  UserFavoriteCitiesContextType | undefined
>(undefined);

// WeatherProvider component to wrap your app
export const UserFavoriteCitiesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [favoriteCitiesData, setFavoriteCitiesData] = useState<
    UserFavoriteCity[]
  >([]);
  const [favoriteCitiesPlaceIds, setFavoriteCitiesPlaceIds] = useState<
    string[]
  >([]);
  const [favoriteCitiesWithWeather, setFavoriteCitiesWithWeather] = useState<
    FavoriteCityWithWeather[]
  >([]);
  const [homeLocationId, setHomeLocationId] = useState<number | null>(null);
  const [deleteActive, setDeleteActive] = useState(false);
  const [favoriteCitiesToDelete, setFavoriteCitiesToDelete] = useState<
    number[]
  >([]); // favoriteCityIds
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [placeInfoToEdit, setPlaceInfoToEdit] =
    useState<PlaceInfoToEditType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async () => {
    try {
      const favoriteCitiesWithWeatherData = await Promise.all(
        favoriteCitiesData.map(async (userFavoriteCity: UserFavoriteCity) => {
          if (userFavoriteCity.isDefaultCity) {
            setHomeLocationId(userFavoriteCity.id);
          }

          const weatherResponse = await fetch(
            `/api/weather/favorite-cities?lat=${userFavoriteCity.latitude}&lng=${userFavoriteCity.longitude}`
          );
          const weatherData: WeatherDataForFavoritesList =
            await weatherResponse.json();

          return {
            ...userFavoriteCity,
            weather: weatherData,
          };
        })
      );

      const sortedFavoriteCitiesWithWeather =
        favoriteCitiesWithWeatherData.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );

      setFavoriteCitiesWithWeather(sortedFavoriteCitiesWithWeather);
    } catch (error) {
      console.error("Error fetching weather data of favorite cities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const placeIds = favoriteCitiesData.map((city) => city.placeId);
    setFavoriteCitiesPlaceIds(placeIds);
  }, [favoriteCitiesData]);

  return (
    <UserFavoriteCitiesContext.Provider
      value={{
        favoriteCitiesData,
        setFavoriteCitiesData,
        favoriteCitiesPlaceIds,
        setFavoriteCitiesPlaceIds,
        favoriteCitiesWithWeather,
        setFavoriteCitiesWithWeather,
        homeLocationId,
        setHomeLocationId,
        deleteActive,
        setDeleteActive,
        favoriteCitiesToDelete,
        setFavoriteCitiesToDelete,
        isEditModalOpen,
        setIsEditModalOpen,
        placeInfoToEdit,
        setPlaceInfoToEdit,
        loading,
        setLoading,
        fetchWeatherData,
      }}
    >
      {children}
    </UserFavoriteCitiesContext.Provider>
  );
};

// Custom hook to use the WeatherContext
export const useUserFavoriteCities = () => {
  const context = useContext(UserFavoriteCitiesContext);
  if (!context) {
    throw new Error(
      "useUserFavoriteCities must be used within a DisplayedCityWeatherProvider"
    );
  }
  return context;
};
