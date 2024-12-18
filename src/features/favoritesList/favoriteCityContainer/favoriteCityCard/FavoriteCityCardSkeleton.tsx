import WeatherForecastSkeleton from "./weatherForecast/WeatherForecastSkeleton";
import styles from "./FavoriteCityCard.module.scss";

const FavoriteCityCardSkeleton = () => {
  return (
    <div className={styles.cityCard__card} style={{ marginBottom: "15px" }}>
      <div className={styles.cityCard__header}>
        <div className={styles.cityCard__cityInfo}>
          <div className={styles.cityCard__homeIconContainer}>
            <div className={styles.cityCard__homeIconSkeleton} />
          </div>
          <div className={styles.cityCard__cityNameSkeleton} />
        </div>
        <div className={styles.cityCard__forecastToggle}>
          <div className={styles.cityCard__selectedForecastSkeleton} />
          <div className={styles.cityCard__selectedForecastSkeleton} />
        </div>
      </div>

      <div className={styles.cityCard__weather}>
        <div className={styles.cityCard__currentInfo}>
          <h5 className={styles.cityCard__currentDateTime}>
            <div className={styles.cityCard__currentDateTimeSkeleton} />
          </h5>

          <div className={styles.cityCard__currentWeather}>
            <div className={styles.cityCard__currentWeatherIconContainer}>
              <div className={styles.cityCard__currentWeatherIconSkeleton} />
            </div>
            <div className={styles.cityCard__currentTempSkeleton} />
          </div>
          <div className={styles.cityCard__buttons}>
            <div className={styles.cityCard__buttonSkeleton} />
          </div>
        </div>

        <div className={styles.cityCard__contentRight}>
          <div className={styles.cityCard__weatherForecast}>
            <WeatherForecastSkeleton
              className="favoriteCityCard"
              // iconHeight={40}
              // iconWidth={40}
              // weatherCardWidth={100}
              weatherCardColor="rgba(255, 255, 255, 0.3)"
              isForFavoriteCityCard={true}
            />
          </div>
          <div className={styles.cityCard__placeInfoLinks}>
            <div className={styles.cityCard__placeInfoSkeleton1} />
            <div className={styles.cityCard__placeInfoSkeleton2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCityCardSkeleton;
