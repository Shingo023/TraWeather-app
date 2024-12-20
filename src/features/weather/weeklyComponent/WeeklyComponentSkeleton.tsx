import styles from "./WeeklyComponent.module.scss";
import WeeklyForecastWeatherCardSkeleton from "./weeklyForecastWeatherCard/WeeklyForecastWeatherCardSkeleton";

const WeeklyComponentSkeleton = () => {
  const items = Array(7).fill(null);

  return (
    <div className={styles.weeklyForecast}>
      <h2 className={styles.weeklyForecast__headerSkeleton} />
      <div className={styles.weeklyForecast__content}>
        <ul className={styles.weeklyForecast__list}>
          {items.map((_, index) => (
            <WeeklyForecastWeatherCardSkeleton key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyComponentSkeleton;
