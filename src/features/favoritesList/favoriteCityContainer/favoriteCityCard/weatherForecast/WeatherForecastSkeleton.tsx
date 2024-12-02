import WeatherCardSkeleton from "@/features/weather/todaysForecast/weatherCard/WeatherCardSkeleton";
import styles from "./WeatherForecast.module.scss";

const WeatherForecastSkeleton = ({
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
  const skeletons = Array(12).fill(null);
  return (
    <div className={styles.weatherForecastWrapper}>
      <div className={styles.weatherForecast}>
        {skeletons.map((_, index) => (
          <WeatherCardSkeleton
            key={index}
            iconHeight={iconHeight}
            iconWidth={iconWidth}
            weatherCardWidth={weatherCardWidth}
            weatherCardColor={weatherCardColor}
            isForFavoriteCityCard={isForFavoriteCityCard}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastSkeleton;
