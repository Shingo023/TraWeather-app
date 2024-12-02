import styles from "./WeatherCard.module.scss";

const WeatherCardSkeleton = ({
  iconHeight,
  iconWidth,
  weatherCardWidth,
  weatherCardColor,
  isForFavoriteCityCard,
}: {
  iconHeight: number;
  iconWidth: number;
  weatherCardWidth: number;
  weatherCardColor: string;
  isForFavoriteCityCard: boolean;
}) => {
  return (
    <div
      className={styles.weatherCard}
      style={{
        width: `${weatherCardWidth}px`,
        minWidth: `${weatherCardWidth}px`,
        backgroundColor: `${weatherCardColor}`,
      }}
    >
      <div className={styles.weatherCard__top}>
        <p className={styles.weatherCard__timeSkeleton} />
        <div className={styles.weatherCard__weatherIcon}>
          <div
            className={styles.weatherCard__weatherIconSkeleton}
            style={{ width: `${iconWidth}px`, height: `${iconHeight}px` }}
          />
        </div>
        <div className={styles.weatherCard__tempSkeleton} />
      </div>

      <div className={styles.weatherCard__bottom}>
        <div className={styles.weatherCard__precipProbSkeleton} />
        {!isForFavoriteCityCard && (
          <div className={styles.weatherCard__precipSkeleton} />
        )}
        {!isForFavoriteCityCard && (
          <div className={styles.weatherCard__windSkeleton} />
        )}
      </div>
    </div>
  );
};

export default WeatherCardSkeleton;
