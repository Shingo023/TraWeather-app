import styles from "./TodaysForecast.module.scss";
import WeatherForecast from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/weatherForecast/WeatherForecast";
import { formatDate } from "@/utils/dateUtils";
import TodaysForecastSkeleton from "./TodaysForecastSkeleton";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";

const TodaysForecast = () => {
  const {
    dailyWeatherHighlights,
    twentyFourHoursWeather,
    todaysDate,
    loading,
  } = useDisplayedCityWeather();

  if (loading) {
    return <TodaysForecastSkeleton />;
  }

  if (!dailyWeatherHighlights) return;

  const date = dailyWeatherHighlights
    ? formatDate(dailyWeatherHighlights.datetime)
    : "";

  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        {dailyWeatherHighlights.datetime === todaysDate ? (
          <h2>Today's Forecast</h2>
        ) : (
          <h2>
            Daily Forecast
            <span>{date}</span>
          </h2>
        )}
        <div className={styles.todaysForecast__hourlyWeatherCards}>
          <WeatherForecast
            dailyOrWeeklyWeather={twentyFourHoursWeather}
            className="dailyForecast"
            iconHeight={40}
            iconWidth={40}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecast;
