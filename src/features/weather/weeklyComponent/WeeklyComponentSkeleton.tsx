import styles from "./WeeklyComponent.module.scss";
import WeeklyForecastWeatherCardSkeleton from "./weeklyForecastWeatherCard/WeeklyForecastWeatherCardSkeleton";

const WeeklyComponentSkeleton = () => {
  const items = Array(7).fill(null);

  return (
    <div className={styles.WeeklyComponent}>
      <h2 className={styles.WeeklyComponent__headerSkeleton} />
      <div className={styles.WeeklyComponent__content}>
        <ul className={styles.WeeklyComponentList}>
          {items.map((_, index) => (
            <WeeklyForecastWeatherCardSkeleton key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyComponentSkeleton;
