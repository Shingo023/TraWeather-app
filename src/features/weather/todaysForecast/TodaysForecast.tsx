import styles from "./TodaysForecast.module.scss";
import WeatherForecast from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/weatherForecast/WeatherForecast";
import { formatDate } from "@/utils/dateUtils";
import TodaysForecastSkeleton from "./TodaysForecastSkeleton";
import { useDisplayedCityWeather } from "@/context/DisplayedCityWeatherContext";

const TodaysForecast = () => {
  const { dailyWeatherHighlights, twentyFourHoursWeather } =
    useDisplayedCityWeather();

  const date = dailyWeatherHighlights
    ? formatDate(dailyWeatherHighlights.datetime)
    : "";

  if (!twentyFourHoursWeather || !dailyWeatherHighlights) {
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
            iconHeight={60}
            iconWidth={60}
            cardWidth={130}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecast;
