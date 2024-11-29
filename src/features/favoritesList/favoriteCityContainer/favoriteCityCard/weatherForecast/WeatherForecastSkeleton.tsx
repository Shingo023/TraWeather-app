import WeatherCardSkeleton from "@/features/weather/todaysForecast/weatherCard/WeatherCardSkeleton";
import styles from "./WeatherForecast.module.scss";

const WeatherForecastSkeleton = ({
  iconHeight,
  iconWidth,
}: {
  iconHeight: number;
  iconWidth: number;
}) => {
  const skeletons = Array(12).fill(null);
  return (
    <div className={styles.weatherForecast}>
      {skeletons.map((_, index) => (
        <WeatherCardSkeleton
          key={index}
          iconHeight={iconHeight}
          iconWidth={iconWidth}
        />
      ))}
    </div>
  );
};

export default WeatherForecastSkeleton;
