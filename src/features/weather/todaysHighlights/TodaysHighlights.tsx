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
    lastWeatherFetchDateTime,
    todaysDate,
    loading,
  } = useDisplayedCityWeather();

  if (loading) {
    return <TodaysHighlightsSkeleton />;
  }

  if (!dailyWeatherHighlights) return;

  const date = formatDate(dailyWeatherHighlights.datetime);

  return (
    <section className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2>
          Highlights{" "}
          {dailyWeatherHighlights.datetime === todaysDate ? (
            ""
          ) : (
            <span>{date}</span>
          )}
        </h2>

        <div className={styles.todaysHighlights__contents}>
          <div className={styles.todaysHighlights__contentWrapper}>
            <Overview
              humidity={dailyWeatherHighlights.humidity}
              snowDepth={dailyWeatherHighlights.snowDepth}
              weatherOverview={dailyWeatherHighlights.weatherOverview}
              visibility={dailyWeatherHighlights.visibility}
              feelsLikeTempMax={dailyWeatherHighlights.feelsLikeTempMax}
              feelsLikeTempMin={dailyWeatherHighlights.feelsLikeTempMin}
            />
          </div>
          <div className={styles.todaysHighlights__contentWrapper}>
            <UVIndex uvIndex={dailyWeatherHighlights.uvIndexData} />
          </div>
          <div className={styles.todaysHighlights__contentWrapper}>
            <SunsetAndSunrise
              sunrise={dailyWeatherHighlights.sunrise}
              sunset={dailyWeatherHighlights.sunset}
              selectedDate={dailyWeatherHighlights.datetime}
              lastWeatherFetchDateTime={lastWeatherFetchDateTime}
              todaysDate={todaysDate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodaysHighlights;
