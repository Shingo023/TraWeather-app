import SunsetAndSunrise from "./sunsetAndSunrise/SunsetAndSunrise";
import UVIndex from "./uvIndex/UVIndex";
import styles from "./TodaysHighlights.module.scss";
import Overview from "./overview/Overview";
import { formatDate } from "@/utils/dateUtils";
import TodaysHighlightsSkeleton from "./TodaysHighlightsSkeleton";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";

const TodaysHighlights = () => {
  const {
    dailyWeatherHighlights,
    timezone,
    lastWeatherFetchDateTime,
    loading,
  } = useDisplayedCityWeather();

  if (loading) {
    return <TodaysHighlightsSkeleton />;
  }

  if (!dailyWeatherHighlights) return;

  const date = formatDate(dailyWeatherHighlights.datetime);

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
            humidity={dailyWeatherHighlights.humidity}
            snowDepth={dailyWeatherHighlights.snowDepth}
            weatherOverview={dailyWeatherHighlights.weatherOverview}
            visibility={dailyWeatherHighlights.visibility}
            feelsLikeTempMax={dailyWeatherHighlights.feelsLikeTempMax}
            feelsLikeTempMin={dailyWeatherHighlights.feelsLikeTempMin}
          />
          <UVIndex uvIndex={dailyWeatherHighlights.uvIndexData} />
          <SunsetAndSunrise
            timeZone={timezone}
            sunrise={dailyWeatherHighlights.sunrise}
            sunset={dailyWeatherHighlights.sunset}
            selectedDate={dailyWeatherHighlights.datetime}
            lastWeatherFetchDateTime={lastWeatherFetchDateTime}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlights;
