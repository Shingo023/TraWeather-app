import HourlyWeatherCardSkeleton from "@/features/weather/todaysForecast/hourlyWeatherCard/HourlyWeatherCardSkeleton";
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
        <HourlyWeatherCardSkeleton
          key={index}
          iconHeight={iconHeight}
          iconWidth={iconWidth}
        />
      ))}
    </div>
  );
};

export default WeatherForecastSkeleton;
