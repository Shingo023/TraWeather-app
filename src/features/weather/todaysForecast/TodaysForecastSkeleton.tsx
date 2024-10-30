import DailyForecastSkeleton from "@/features/favoritesList/favoriteCityCard/dailyForecast/DailyForecastSkeleton";
import styles from "./TodaysForecast.module.scss";

const TodaysForecastSkeleton = () => {
  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2 className={styles.todaysForecast__titleSkeleton} />
        <div className={styles.todaysForecast__hourlyWeatherCards}>
          <DailyForecastSkeleton iconHeight={40} iconWidth={40} />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecastSkeleton;
