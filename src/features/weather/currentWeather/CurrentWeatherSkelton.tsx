import styles from "./CurrentWeather.module.scss";

const CurrentWeatherSkelton = () => {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__info}>
        <div className={styles.currentWeather__infoTop}>
          <div className={styles.currentWeather__skeletonCityName} />
          <div className={styles.currentWeather__skeletonAddress} />
          <div className={styles.currentWeather__skeletonDateTime} />
        </div>
        <div className={styles.currentWeather__infoTop}>
          <div className={styles.currentWeather__skeletonTemp} />
          <div className={styles.currentWeather__skeletonFeelslikeTemp} />
        </div>
      </div>

      <div className={styles.currentWeather__skeletonWeatherIcon} />
    </div>
  );
};

export default CurrentWeatherSkelton;
