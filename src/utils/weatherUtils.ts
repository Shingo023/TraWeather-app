import {
  WeatherData,
  WeatherDataForForecast,
  WeatherDay,
  WeatherHour,
} from "@/types";
import { getCurrentHourInTimeZone } from "./dateUtils";

// wind speed(kph)
export const getWindStrength = (windspeed: number) => {
  if (windspeed >= 0 && windspeed <= 8) {
    return "Calm Wind"; // 0–8 kph
  } else if (windspeed >= 9 && windspeed <= 23) {
    return "Gentle Wind"; // 9–23 kph
  } else if (windspeed >= 24 && windspeed <= 32) {
    return "Breezy Wind"; // 24–32 kph
  } else if (windspeed >= 33 && windspeed <= 48) {
    return "Windy Wind"; // 33–48 kph
  } else if (windspeed >= 49 && windspeed <= 64) {
    return "Gusty Wind"; // 49–64 kph
  } else if (windspeed >= 65 && windspeed <= 102) {
    return "Stormy Wind"; // 65–102 kph
  } else if (windspeed >= 103) {
    return "Fierce Wind"; // 103+ kph
  } else {
    return "Unknown";
  }
};

// precipitation (mm/h)
export const getPrecipIntensity = (precip: number) => {
  if (precip === 0) return "No Precipitation";

  if (precip < 2.5) return "Light Precipitation";
  if (precip < 7.6) return "Moderate Precipitation";
  if (precip < 50) return "Heavy Precipitation";

  return "Torrential Precipitation";
};

// Function to return visibility index based on the visibility in km
export const getVisibilityIndex = (visibility: number) => {
  if (visibility < 1) {
    return "Very Poor";
  } else if (visibility >= 1 && visibility < 2) {
    return "Poor";
  } else if (visibility >= 2 && visibility < 4) {
    return "Moderate";
  } else if (visibility >= 4 && visibility < 10) {
    return "Good";
  } else {
    return "Very Good";
  }
};

export const getWeatherForNext24Hours = (
  todaysWeather: WeatherDataForForecast[],
  tomorrowsWeather: WeatherDataForForecast[],
  timeZone: string
) => {
  const fortyEightHoursWeather = [...todaysWeather, ...tomorrowsWeather];
  const currentHour = getCurrentHourInTimeZone(timeZone);
  return fortyEightHoursWeather.slice(currentHour, currentHour + 24);
};

export const formatWeatherDataForFavoriteList = (weatherData: WeatherData) => {
  return {
    sunrise: weatherData.days[0].sunrise,
    sunset: weatherData.days[0].sunset,
    timezone: weatherData.timezone,
    weeklyWeather: weatherData.days.slice(0, 7).map((day: WeatherDay) => ({
      datetime: day.datetime,
      icon: day.icon,
      precipprob: day.precipprob,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
    })),
    days: weatherData.days.slice(0, 2).map((day: WeatherDay) => ({
      hours: day.hours.map((hour: WeatherDataForForecast) => ({
        datetime: hour.datetime,
        temp: hour.temp,
        precipprob: hour.precipprob,
        icon: hour.icon,
      })),
    })),
    currentConditions: {
      datetime: weatherData.currentConditions.datetime,
      icon: weatherData.currentConditions.icon,
      temp: weatherData.currentConditions.temp,
    },
  };
};

export const extractDailyHighlights = (selectedDateWeather: WeatherDay) => {
  return {
    datetime: selectedDateWeather.datetime,
    humidity: Math.round(selectedDateWeather.humidity),
    snowDepth: selectedDateWeather.snowdepth ?? 0,
    weatherOverview: selectedDateWeather.description,
    visibility: selectedDateWeather.visibility,
    feelsLikeTempMax: Math.round(selectedDateWeather.feelslikemax),
    feelsLikeTempMin: Math.round(selectedDateWeather.feelslikemin),
    sunrise: selectedDateWeather.sunrise,
    sunset: selectedDateWeather.sunset,
    uvIndexData: (180 * selectedDateWeather.uvindex * 10) / 100,
  };
};
