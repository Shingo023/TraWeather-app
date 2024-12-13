import styles from "./WeeklyComponent.module.scss";
import WeeklyForecastWeatherCardSkeleton from "./weeklyForecastWeatherCard/WeeklyForecastWeatherCardSkeleton";

const WeeklyComponentSkeleton = () => {
  const items = Array(7).fill(null); // Create an array with 7 undefined elements

  return (
    <div className={styles.WeeklyComponent}>
      <div className={styles.WeeklyComponent__content}>
        <h2 className={styles.WeeklyComponent__headerSkeleton} />
        <ul className={styles.WeeklyComponentList}>
          {items.map((_, index) => (
            <WeeklyForecastWeatherCardSkeleton index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyComponentSkeleton;
