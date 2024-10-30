import HourlyWeatherCardSkeleton from "@/features/weather/todaysForecast/hourlyWeatherCard/HourlyWeatherCardSkeleton";
import styles from "./DailyForecast.module.scss";

const DailyForecastSkeleton = ({
  iconHeight,
  iconWidth,
}: {
  iconHeight: number;
  iconWidth: number;
}) => {
  const skeletons = Array(12).fill(null);
  return (
    <div className={styles.dailyForecast}>
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

export default DailyForecastSkeleton;
