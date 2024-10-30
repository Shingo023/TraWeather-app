import styles from "./HourlyWeatherCard.module.scss";

const HourlyWeatherCardSkeleton = () => {
  return (
    <div className={styles.hourlyWeather}>
      <div className={styles.hourlyWeather__top}>
        <p className={styles.hourlyWeather__timeSkeleton} />
        <div className={styles.hourlyWeather__weatherIcon}>
          <div className={styles.hourlyWeather__weatherIconSkeleton} />
        </div>
        <div className={styles.hourlyWeather__tempSkeleton} />
      </div>

      <div className={styles.hourlyWeather__bottom}>
        <div className={styles.hourlyWeather__precipProbSkeleton} />

        <div className={styles.hourlyWeather__precipSkeleton} />

        <div className={styles.hourlyWeather__windSkeleton} />
      </div>
    </div>
  );
};

export default HourlyWeatherCardSkeleton;
