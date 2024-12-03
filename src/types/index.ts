import { Dispatch, SetStateAction } from "react";
import { DefaultSession } from "next-auth";

// Formatted types of the weather data so that unnecessary fields will not be fetched
export type CurrentWeatherType = {
  currentTemp: number | null;
  currentFeelslikeTemp: number | null;
  currentWeatherIcon: string | null;
};

export type WeatherData = {
  latitude: number;
  longitude: number;
  timezone: string;
  days: WeatherDay[];
  currentConditions: {
    datetime: string;
    feelslike: number;
    icon: string;
    temp: number;
  };
};

export type WeatherDay = {
  datetime: string;
  tempmax: number;
  tempmin: number;
  feelslikemax: number;
  feelslikemin: number;
  humidity: number;
  precipprob: number;
  snow: number | null;
  snowdepth: number | null;
  description: string;
  uvindex: number;
  sunrise: string;
  sunset: string;
  conditions: string;
  icon: string;
  hours: WeatherDataForForecast[];
  visibility: number;
};

export type WeatherHour = {
  conditions: string;
  datetime: string;
  temp: number;
  precip?: number | null;
  precipprob: number;
  windspeed?: number;
  icon: string;
};

export type DailyWeatherHighlightsType = {
  datetime: string;
  humidity: number;
  snowDepth: number;
  weatherOverview: string;
  visibility: number;
  feelsLikeTempMax: number;
  feelsLikeTempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexData: number;
};

// Weather types for the favorites list
export type WeatherDataForFavoritesList = {
  timezone: string;
  weeklyWeather: WeatherDataForForecast[];
  days: WeatherDay[];
  currentConditions: {
    datetime: string;
    icon: string;
    temp: number;
  };
};

export type WeatherDataForForecast = {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  precip: number | null;
  precipprob: number;
  windspeed: number;
  icon: string;
};

export type WeatherIconType =
  | "clear-day"
  | "clear-night"
  | "rain"
  | "snow"
  | "wind"
  | "fog"
  | "cloudy"
  | "partly-cloudy-day"
  | "partly-cloudy-night";

// Extend the User object returned by NextAuth to include an ID
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id field to the session's user object
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // Add the id field to the User object
  }
}

export type FavoriteCity = {
  id: number;
  cityName: string;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  createdAt: Date;
  customName: string;
};

export type FavoriteCityWithWeather = {
  id: number;
  customName: string;
  isDefaultCity: boolean;
  displayOrder: number;
  favoriteCityId: number;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
  weather: WeatherDataForFavoritesList;
};

export type LocationDetails = {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  place_id: string;
};

export type autocompleteSuggestion = {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
  };
};

export type FavoriteCityContainerPropsType = {
  userId: string | undefined;
  favoriteCityWithWeather: FavoriteCityWithWeather;
  homeLocationId: number | null;
  setHomeLocationId: (homeLocationId: number | null) => void;
  handleDragStart: (cityId: number) => void;
  handleDrop: (targetCityId: number) => Promise<void>;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  deleteActive: boolean;
  setFavoriteCitiesToDelete: Dispatch<SetStateAction<number[]>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setPlaceInfoToEdit: Dispatch<
    SetStateAction<{
      cityName: string;
      userFavoriteCityId: number;
      cityAddress: string;
    } | null>
  >;
};

export type FavoriteCityCardPropsType = {
  userId: string | undefined;
  favoriteCityWithWeather: FavoriteCityWithWeather;
  homeLocationId: number | null;
  setHomeLocationId: (homeLocationId: number | null) => void;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPlaceInfoToEdit: React.Dispatch<
    React.SetStateAction<{
      cityName: string;
      userFavoriteCityId: number;
      cityAddress: string;
    } | null>
  >;
};

export type EditPlaceNameModalPropsType = {
  cityName: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  userFavoriteCityId: number;
  cityAddress: string;
  setFavoriteCitiesWithWeather: Dispatch<
    SetStateAction<FavoriteCityWithWeather[]>
  >;
  setPlaceInfoToEdit: Dispatch<
    SetStateAction<{
      cityName: string;
      userFavoriteCityId: number;
      cityAddress: string;
    } | null>
  >;
};

export type CurrentWeatherPropsType = {
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
  currentWeather: CurrentWeatherType | null;
  // displayedCityWeather: WeatherData | null;
  // setDisplayedCityWeather: (weatherData: WeatherData | null) => void;
  // cityToDisplay: string | null;
  // address: string | null;
  // placeId: string | null;
  // favoriteCitiesPlaceIds: string[];
  // setFavoriteCitiesPlaceIds: React.Dispatch<React.SetStateAction<string[]>>;
  latitude: string;
  longitude: string;
  // setCurrentDateTime: Dispatch<SetStateAction<string | null>>;
  currentDateTime: string | null;
  timezone: string | null;
};

export type CurrentDateAndTimePropsType = {
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
  placeTimeZone: string | undefined;
  latitude: string;
  longitude: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  currentDateTime: string | null;
};

export type StarIconPropsType = {
  latitude: string | null;
  longitude: string | null;
  timezone: string | null;
  cityToDisplay: string | null;
  address: string | null;
  placeId: string | null;
  favoriteCitiesPlaceIds: string[];
  setFavoriteCitiesPlaceIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export type HomeLocationContextType = {
  homeLocationId: string | null;
  setHomeLocationId: React.Dispatch<React.SetStateAction<string | null>>;
};

export type UserFavoriteCity = {
  id: number;
  customName: string;
  isDefaultCity: boolean;
  displayOrder: number;
  favoriteCityId: number;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type TodaysWeatherOverviewType = {
  humidity: number;
  snowDepth: number;
  weatherOverview: string;
  visibility: number;
  feelsLikeTempMax: number;
  feelsLikeTempMin: number;
};

export type PlaceInfoToEditType = {
  cityName: string;
  userFavoriteCityId: number;
  cityAddress: string;
};

export type DeleteActionPanelType = {
  deleteActive: boolean;
  setDeleteActive: Dispatch<SetStateAction<boolean>>;
  setFavoriteCitiesToDelete: Dispatch<SetStateAction<number[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  favoriteCitiesToDelete: number[];
  setFavoriteCities: Dispatch<SetStateAction<UserFavoriteCity[]>>;
  setFavoriteCitiesWithWeather: Dispatch<
    SetStateAction<FavoriteCityWithWeather[]>
  >;
};
