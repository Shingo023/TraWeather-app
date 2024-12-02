import WeatherForecastSkeleton from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/weatherForecast/WeatherForecastSkeleton";
import styles from "./TodaysForecast.module.scss";

const TodaysForecastSkeleton = () => {
  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2 className={styles.todaysForecast__titleSkeleton} />
        <div className={styles.todaysForecast__hourlyWeatherCards}>
          <WeatherForecastSkeleton iconHeight={40} iconWidth={40} />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecastSkeleton;
