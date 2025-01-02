import { WeatherData, WeatherDay, WeatherHour } from "@/types";
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
    const weatherData: WeatherData = {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      days: data.days.slice(0, 7).map(
        (day: any): WeatherDay => ({
          datetime: day.datetime,
          tempmax: day.tempmax,
          tempmin: day.tempmin,
          feelslikemax: day.feelslikemax,
          feelslikemin: day.feelslikemin,
          humidity: day.humidity,
          precipprob: day.precipprob,
          snow: day.snow || null,
          snowdepth: day.snowdepth || null,
          description: day.description,
          uvindex: day.uvindex,
          sunrise: day.sunrise,
          sunset: day.sunset,
          conditions: day.conditions,
          icon: day.icon,
          visibility: day.visibility,

          hours: day.hours.map(
            (hour: any): WeatherHour => ({
              datetime: hour.datetime,
              temp: hour.temp,
              precip: hour.precip || null,
              precipprob: hour.precipprob,
              windspeed: hour.windspeed,
              conditions: hour.conditions,
              icon: hour.icon,
            })
          ),
        })
      ),
      currentConditions: {
        datetime: data.currentConditions.datetime,
        feelslike: data.currentConditions.feelslike,
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
