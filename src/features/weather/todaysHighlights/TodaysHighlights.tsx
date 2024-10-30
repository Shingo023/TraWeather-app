import SunsetAndSunrise from "./sunsetAndSunrise/SunsetAndSunrise";
import UVIndex from "./uvIndex/UVIndex";
import styles from "./TodaysHighlights.module.scss";
import { WeatherDay } from "@/types";
import Overview from "./overview/Overview";
import { formatDate } from "@/utils/dateUtils";
import TodaysHighlightsSkeleton from "./TodaysHighlightsSkeleton";
import { getCurrentTimeAndDate } from "@/utils/dateUtils";

const TodaysHighlights = ({
  todaysWeather,
  timeZone,
}: {
  todaysWeather: WeatherDay | null;
  timeZone: string | undefined;
}) => {
  if (!todaysWeather) {
    return <TodaysHighlightsSkeleton />;
  }

  const date = formatDate(todaysWeather.datetime);

  const humidity = Math.round(todaysWeather.humidity);
  const snowDepth = todaysWeather.snowdepth ?? 0;
  const weatherOverview = todaysWeather.description;
  const visibility = todaysWeather.visibility;
  const feelsLikeTempMax = Math.round(todaysWeather.feelslikemax);
  const feelsLikeTempMin = Math.round(todaysWeather.feelslikemin);

  function getHourFromTimeString(timeString: string): number {
    const [hours] = timeString.split(":");
    return parseInt(hours);
  }

  const currentTime = timeZone ? getCurrentTimeAndDate(timeZone) : "";

  const sunriseData: number = getHourFromTimeString(todaysWeather.sunrise);

  const sunsetData: number = getHourFromTimeString(todaysWeather.sunset);

  const now: Date = new Date(currentTime);
  const totalHours: number = sunsetData - sunriseData;
  const currentHour: number = now.getHours();
  const sunCurrentLocation: number = (currentHour * 100) / totalHours;

  const uvIndexData = (180 * todaysWeather.uvindex * 10) / 100;

  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2>
          Daily Highlights
          <span
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              marginLeft: "8px",
            }}
          >
            {date}
          </span>
        </h2>
        <div className={styles.todaysHighlights__contents}>
          <Overview
            humidity={humidity}
            snowDepth={snowDepth}
            weatherOverview={weatherOverview}
            visibility={visibility}
            feelsLikeTempMax={feelsLikeTempMax}
            feelsLikeTempMin={feelsLikeTempMin}
          />
          <UVIndex uvIndex={uvIndexData} />
          <SunsetAndSunrise
            sunrise={todaysWeather.sunrise.slice(0, 5)}
            sunset={todaysWeather.sunset.slice(0, 5)}
            sunCurrentLocation={sunCurrentLocation}
            isNight={currentHour > sunsetData ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights;
