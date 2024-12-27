import styles from "./WeeklyForecastWeatherCard.module.scss";

const WeeklyForecastWeatherCardSkeleton = () => {
  return (
    <li className={styles.weeklyForecast__item}>
      <h3 className={styles.weeklyForecast__date}>
        <p className={styles.weeklyForecast__dateSkeleton} />
      </h3>
      <div className={styles.weeklyForecast__weatherInfo}>
        <div className={styles.weeklyForecast__weatherIcon}>
          <div className={styles.weatherIcon}>
            <div className={styles.weeklyForecast__weatherIconSkeleton} />
          </div>
        </div>
        <div className={styles.weeklyForecast__stats}>
          <div className={styles.weeklyForecast__weatherTemperature}>
            <div className={styles.weeklyForecast__tempsSkeleton} />
          </div>
          <div className={styles.weeklyForecast__chanceOfRain}>
            <div className={styles.weeklyForecast__chanceOfRainSkeleton} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default WeeklyForecastWeatherCardSkeleton;
