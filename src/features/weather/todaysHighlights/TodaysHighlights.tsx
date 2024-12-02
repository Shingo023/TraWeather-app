import SunsetAndSunrise from "./sunsetAndSunrise/SunsetAndSunrise";
import UVIndex from "./uvIndex/UVIndex";
import styles from "./TodaysHighlights.module.scss";
import { WeatherDay } from "@/types";
import Overview from "./overview/Overview";
import { formatDate } from "@/utils/dateUtils";
import TodaysHighlightsSkeleton from "./TodaysHighlightsSkeleton";

const TodaysHighlights = ({
  todaysWeather,
  timeZone,
  currentDateTime,
}: {
  todaysWeather: WeatherDay | null;
  timeZone: string | undefined;
  currentDateTime: string | null;
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

  const sunrise = todaysWeather.sunrise;
  const sunset = todaysWeather.sunset;
  const selectedDate = todaysWeather.datetime;

  const uvIndexData = (180 * todaysWeather.uvindex * 10) / 100;

  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2>
          Daily Highlights
          <span
            style={{
              fontSize: "12px",
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
            timeZone={timeZone}
            sunrise={sunrise}
            sunset={sunset}
            selectedDate={selectedDate}
            currentDateTime={currentDateTime}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights;
