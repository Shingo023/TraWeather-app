import { BackgroundWeatherType, WeatherIconType } from "@/types";

export const iconMapping = {
  "clear-day": "/weather-icons/clear-day.svg",
  "clear-night": "/weather-icons/clear-night.svg",
  rain: "/weather-icons/rain.svg",
  snow: "/weather-icons/snow.svg",
  wind: "/weather-icons/wind.svg",
  fog: "/weather-icons/fog.svg",
  cloudy: "/weather-icons/cloudy.svg",
  "partly-cloudy-day": "/weather-icons/partly-cloudy-day.svg",
  "partly-cloudy-night": "/weather-icons/partly-cloudy-night.svg",
};

export const backgroundMapping = {
  "clear-day": "/backgrounds/clear-day-bg.svg",
  "partly-cloudy-day": "/backgrounds/partly-cloudy-day-bg.svg",
  cloudy: "/backgrounds/cloudy-bg.svg",

  rain: "/backgrounds/rain-bg.svg",
  snow: "/backgrounds/snow-bg.svg",
  wind: "/backgrounds/wind-bg.svg",
  fog: "/backgrounds/fog-bg.svg",

  "clear-night": "/backgrounds/clear-night-bg.svg",
  "partly-cloudy-night": "/backgrounds/partly-cloudy-night-bg.svg",
  "cloudy-night": "/backgrounds/partly-cloudy-night-bg.svg",
  "rain-night": "/backgrounds/rain-night-bg.svg",
  "snow-night": "/backgrounds/snow-night-bg.svg",
  "wind-night": "/backgrounds/wind-night-bg.svg",
  "fog-night": "/backgrounds/fog-night-bg.svg",
};

export const getBackgroundWeather = (
  isNight: boolean,
  currentWeather: WeatherIconType
) => {
  if (!isNight) {
    if (currentWeather === "clear-night") {
      return "/backgrounds/clear-day-bg.svg";
    } else if (currentWeather === "partly-cloudy-night") {
      return "/backgrounds//backgrounds/partly-cloudy-day-bg.svg";
    } else {
      return backgroundMapping[currentWeather];
    }
  }

  // Mapping of daytime weather to nighttime weather
  const nightWeatherMap: { [key: string]: BackgroundWeatherType } = {
    cloudy: "cloudy-night",
    rain: "rain-night",
    snow: "snow-night",
    wind: "wind-night",
    fog: "fog-night",
  };

  // Return the mapped nighttime weather or the current weather if no match
  const nightWeather = nightWeatherMap[currentWeather];
  return backgroundMapping[nightWeather] || backgroundMapping[currentWeather];
};
