import styles from "./TodaysForecast.module.scss";
import WeatherForecast from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/weatherForecast/WeatherForecast";
import { formatDate } from "@/utils/dateUtils";
import TodaysForecastSkeleton from "./TodaysForecastSkeleton";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";

const TodaysForecast = () => {
  const { dailyWeatherHighlights, twentyFourHoursWeather, loading } =
    useDisplayedCityWeather();

  const date = dailyWeatherHighlights
    ? formatDate(dailyWeatherHighlights.datetime)
    : "";

  if (loading) {
    return <TodaysForecastSkeleton />;
  }

  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2>
          Daily Forecast
          <span
            style={{
              fontSize: "12px",
              fontWeight: "normal",
              marginLeft: "12px",
            }}
          >
            {date}
          </span>
        </h2>
        <div className={styles.todaysForecast__hourlyWeatherCards}>
          <WeatherForecast
            dailyOrWeeklyWeather={twentyFourHoursWeather}
            className="dailyForecast"
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecast;
