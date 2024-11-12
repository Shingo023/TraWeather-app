import { WeatherDataForFavoritesList, WeatherDay, WeatherHour } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  const timestamp = new Date().getTime();
  const apiKey = process.env.WEATHER_API_KEY;
  // const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}?unitGroup=metric&key=${apiKey}&contentType=json`;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lng}?unitGroup=metric&key=${apiKey}&contentType=json&include=current,hours&_=${timestamp}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching weather data: ${response.statusText}`);
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // format the weather to extract only the necessary fields of the data
    const weatherData: WeatherDataForFavoritesList = {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      weeklyWeather: data.days.slice(0, 7).map((day: WeatherDay) => ({
        datetime: day.datetime,
        icon: day.icon,
        precipprob: day.precipprob,
        tempmax: day.tempmax,
        tempmin: day.tempmin,
      })),
      days: data.days.slice(0, 2).map((day: WeatherDay) => ({
        hours: day.hours.map((hour: WeatherHour) => ({
          datetime: hour.datetime,
          temp: hour.temp,
          // precip: hour.precip || null,
          precipprob: hour.precipprob,
          icon: hour.icon,
          // windspeed: hour.windspeed,
        })),
      })),
      currentConditions: {
        datetime: data.currentConditions.datetime,
        icon: data.currentConditions.icon,
        temp: data.currentConditions.temp,
      },
    };

    return NextResponse.json(weatherData, { status: 200 });
  } catch (error) {
    console.error("Error fetching weather info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
