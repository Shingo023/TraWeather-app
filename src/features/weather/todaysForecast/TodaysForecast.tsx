import { WeatherDay, WeatherHour } from "@/types";
import styles from "./TodaysForecast.module.scss";
import DailyForecast from "@/features/favoritesList/favoriteCityCard/dailyForecast/DailyForecast";
import { formatDate } from "@/utils/dateUtils";
import TodaysForecastSkeleton from "./TodaysForecastSkeleton";

const TodaysForecast = ({
  twentyFourHoursWeather,
  todaysWeather,
}: {
  twentyFourHoursWeather: WeatherHour[] | null;
  todaysWeather: WeatherDay | null;
}) => {
  const date = todaysWeather ? formatDate(todaysWeather.datetime) : "";

  if (!twentyFourHoursWeather || !todaysWeather) {
    return <TodaysForecastSkeleton />;
  }

  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2>
          Daily Forecast
          <span
            style={{
              fontSize: "12px",
              fontWeight: "normal",
              marginLeft: "12px",
            }}
          >
            {date}
          </span>
        </h2>
        <div className={styles.todaysForecast__hourlyWeatherCards}>
          <DailyForecast
            twentyFourHoursWeather={twentyFourHoursWeather}
            iconHeight={60}
            iconWidth={60}
          />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecast;
