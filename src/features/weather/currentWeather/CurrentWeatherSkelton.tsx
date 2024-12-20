import styles from "./CurrentWeather.module.scss";

const CurrentWeatherSkelton = () => {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__citySection}>
        <div className={styles.currentWeather__cityNameContainer}>
          {/* <div className={styles.currentWeather__cityName}> */}
          <div className={styles.currentWeather__skeletonCityName} />
          {/* </div> */}
        </div>
      </div>

      <div className={styles.currentWeather__infoSection}>
        <div className={styles.currentWeather__info}>
          <div className={styles.currentWeather__skeletonDateTime} />
          <div className={styles.currentWeather__skeletonTemp} />
          <div className={styles.currentWeather__skeletonFeelslikeTemp} />
        </div>
        <div className={styles.currentWeather__weatherIconContainer}>
          <div className={styles.currentWeather__skeletonWeatherIcon} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherSkelton;
