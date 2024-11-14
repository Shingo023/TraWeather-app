import styles from "./WeatherCard.module.scss";

const WeatherCardSkeleton = ({
  iconHeight,
  iconWidth,
}: {
  iconHeight: number;
  iconWidth: number;
}) => {
  return (
    <div className={styles.weatherCard}>
      <div className={styles.weatherCard__top}>
        <p className={styles.weatherCard__timeSkeleton} />
        <div className={styles.weatherCard__weatherIcon}>
          <div
            className={styles.weatherCard__weatherIconSkeleton}
            style={{ width: iconWidth, height: iconHeight }}
          />
        </div>
        <div className={styles.weatherCard__tempSkeleton} />
      </div>

      <div className={styles.weatherCard__bottom}>
        <div className={styles.weatherCard__precipProbSkeleton} />

        <div className={styles.weatherCard__precipSkeleton} />

        <div className={styles.weatherCard__windSkeleton} />
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
