import styles from "./CurrentWeather.module.scss";

const CurrentWeatherSkelton = () => {
  return (
    <div className={styles.currentWeather}>
      <div className={styles.currentWeather__citySection}>
        <div className={styles.currentWeather__skeletonCityName} />
      </div>

      <div className={styles.currentWeather__infoSection}>
        <div className={styles.currentWeather__info}>
          <div className={styles.currentWeather__skeletonDateTime} />
          <div className={styles.currentWeather__temp}>
            <div className={styles.currentWeather__skeletonTemp} />
          </div>
          <div className={styles.currentWeather__feelslikeTemp}>
            <div className={styles.currentWeather__skeletonFeelslikeTemp} />
          </div>
        </div>
        <div className={styles.currentWeather__weatherIconContainer}>
          <div className={styles.currentWeather__skeletonWeatherIcon} />
        </div>
      </div>
    </div>

    // <div className={styles.currentWeather}>
    //   <div className={styles.currentWeather__citySection}>
    //     <div className={styles.currentWeather__infoTop}>
    //       <div className={styles.currentWeather__skeletonCityName} />
    //       <div className={styles.currentWeather__skeletonAddress} />
    //       <div className={styles.currentWeather__skeletonDateTime} />
    //     </div>
    //     <div className={styles.currentWeather__infoTop}>
    //       <div className={styles.currentWeather__skeletonTemp} />
    //       <div className={styles.currentWeather__skeletonFeelslikeTemp} />
    //     </div>
    //   </div>

    //   <div className={styles.currentWeather__skeletonWeatherIcon} />
    // </div>
  );
};

export default CurrentWeatherSkelton;
