import DailyForecastSkeleton from "./dailyForecast/DailyForecastSkeleton";
import styles from "./FavoriteCityCard.module.scss";

const FavoriteCityCardSkeleton = () => {
  return (
    <div className={styles.cityCard}>
      <div className={styles.cityCard__cityInfo}>
        <div className={styles.cityCard__homeIconContainer}>
          <div className={styles.cityCard__homeIconSkeleton} />
        </div>
        <div className={styles.cityCard__cityNameSkeleton} />

        <div className={styles.cityCard__cityAddressSkeleton} />
      </div>

      <div className={styles.cityCard__weather}>
        <div className={styles.cityCard__currentInfo}>
          <div className={styles.cityCard__currentDateTimeSkeleton} />
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
        <DailyForecastSkeleton />
      </div>
    </div>
  );
};

export default FavoriteCityCardSkeleton;
