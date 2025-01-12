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

// Weather types for the favorites list
export type WeatherDataForFavoritesList = {
  sunrise: string;
  sunset: string;
  timezone: string;
  weeklyWeather: WeatherDataForForecast[];
  days: { hours: WeatherDataForForecast[] }[];
  currentConditions: {
    datetime: string;
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
  conditions?: string;
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

export type WeatherDataForForecast = {
  datetime: string;
  tempmax?: number;
  tempmin?: number;
  temp?: number;
  precip?: number | null;
  precipprob: number;
  windspeed?: number;
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

export type BackgroundWeatherType =
  | "clear-day"
  | "partly-cloudy-day"
  | "cloudy"
  | "rain"
  | "snow"
  | "wind"
  | "fog"
  | "clear-night"
  | "partly-cloudy-night"
  | "cloudy-night"
  | "rain-night"
  | "snow-night"
  | "wind-night"
  | "fog-night";

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

export type CityToCreateType = {
  cityName: string;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
  timeZone: string;
};

export type CityType = {
  id: number;
  cityName: string;
  placeId: string;
  address: string;
  latitude: number;
  longitude: number;
  timeZone: string;
};

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
  lastWeatherFetchDateTime: string;
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

export type LocationDetailsType = {
  cityName: string;
  address: string;
  placeId: string;
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
};

export type FavoriteCityCardPropsType = {
  userId: string | undefined;
  favoriteCityWithWeather: FavoriteCityWithWeather;
};

export type EditPlaceNameModalPropsType = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type CurrentWeatherPropsType = {
  fetchWeatherData: (latitude: number, longitude: number) => Promise<void>;
  currentWeather: CurrentWeatherType | null;
  latitude: string;
  longitude: string;
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

export type UserFavoriteCityType = {
  id: number;
  favoriteCityId: number;
  customName: string;
  isDefaultCity: boolean;
  displayOrder: number;
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

export type DefaultCityType = {
  customName: string;
  latitude: number;
  longitude: number;
  address: string;
  placeId: string;
};

export type WeatherCardType = {
  dateTime: string;
  weatherIconSrc: string;
  temp?: number;
  tempMax?: number;
  tempMin?: number;
  precipProb: number;
  precipAmount?: number | null;
  windSpeed?: number | null;
  className: string;
};

export type WeatherIconProps = {
  weatherIcon: string | null;
  priority?: boolean;
};

export type SunsetAndSunriseProps = {
  sunrise: string | null;
  sunset: string | null;
  selectedDate: string;
  lastWeatherFetchDateTime: string | null;
  todaysDate: string | null;
};
