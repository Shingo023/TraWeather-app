import styles from "./WeatherCard.module.scss";

const WeatherCardSkeleton = ({
  className,
  weatherCardColor,
  isForFavoriteCityCard,
}: {
  className?: string;
  weatherCardColor: string;
  isForFavoriteCityCard: boolean;
}) => {
  return (
    <div
      className={`${styles.weatherCard} ${className ? styles[className] : ""}`}
      style={{
        backgroundColor: `${weatherCardColor}`,
      }}
    >
      <div className={styles.weatherCard__top}>
        <div className={styles.weatherCard__time}>
          <p className={styles.weatherCard__timeSkeleton} />
        </div>
        <div className={styles.weatherCard__weatherIcon}>
          <div className={styles.weatherCard__weatherIconSkeleton} />
        </div>
        <div className={styles.weatherCard__temp}>
          <div className={styles.weatherCard__tempSkeleton} />
        </div>
      </div>

      <div className={styles.weatherCard__bottom}>
        <div className={styles.weatherCard__precipProb}>
          <div className={styles.weatherCard__precipProbSkeleton} />
        </div>

        {!isForFavoriteCityCard && (
          <>
            <div className={styles.weatherCard__precip}>
              <div className={styles.weatherCard__precipSkeleton} />
            </div>
            <div className={styles.weatherCard__wind}>
              <div className={styles.weatherCard__windSkeleton} />
            </div>
          </>
        )}
        {/* {!isForFavoriteCityCard && (
          <div className={styles.weatherCard__windSkeleton} />
        )} */}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
