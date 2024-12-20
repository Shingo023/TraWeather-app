import WeatherForecastSkeleton from "@/features/favoritesList/favoriteCityContainer/favoriteCityCard/weatherForecast/WeatherForecastSkeleton";
import styles from "./TodaysForecast.module.scss";

const TodaysForecastSkeleton = () => {
  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2 className={styles.todaysForecast__titleSkeleton} />
        <div className={styles.todaysForecast__hourlyWeatherCards}>
          <WeatherForecastSkeleton
            className="dailyForecast"
            isForFavoriteCityCard={false}
            weatherCardColor="rgba(255, 255, 255, 0.3)"
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecastSkeleton;
