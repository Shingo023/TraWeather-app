import styles from "./WeeklyForecastWeatherCard.module.scss";

const WeeklyForecastWeatherCardSkeleton = ({ index }: { index: number }) => {
  return (
    <li className={styles.WeeklyComponentItem} key={index}>
      <p className={styles.WeeklyComponentItem__dateSkeleton} />
      <div className={styles.WeeklyComponentItem__weatherInfo}>
        <div className={styles.WeeklyComponentItem__weatherInfoLeft}>
          <div className={styles.WeeklyComponentItem__weatherIconSkeleton} />
        </div>
        <div className={styles.WeeklyComponentItem__weatherInfoRight}>
          <div className={styles.WeeklyComponentItem__tempsSkeletonWrapper}>
            <div className={styles.WeeklyComponentItem__tempsSkeleton} />
          </div>
          <div
            className={
              styles.WeeklyComponentItem__chanceOfRainSkeletonSkeletonWrapper
            }
          >
            <div className={styles.WeeklyComponentItem__chanceOfRainSkeleton} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default WeeklyForecastWeatherCardSkeleton;
