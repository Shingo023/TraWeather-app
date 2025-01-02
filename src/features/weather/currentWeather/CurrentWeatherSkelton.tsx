import styles from "./CurrentWeather.module.scss";

const CurrentWeatherSkelton = () => {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__city}>
        <div className={styles.currentWeather__cityNameContainer}>
          <div className={styles.currentWeather__skeletonCityName} />
        </div>
        <div className={styles.currentWeather__skeletonDateTime} />
      </div>

      <div className={styles.currentWeather__weather}>
        <div className={styles.currentWeather__info}>
          <div className={styles.currentWeather__skeletonTemp} />
          <div className={styles.currentWeather__skeletonFeelslikeTemp} />
        </div>
        <div className={`iconContainer ${styles.weatherIcon}`}>
          <div className={styles.currentWeather__skeletonWeatherIcon} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherSkelton;
