import HourlyWeatherCard from "./hourlyWeatherCard/HourlyWeatherCard";
import styles from "./TodaysForecast.module.scss";

const TodaysForecast = () => {
  return (
    <div className={styles.todaysForecast}>
      <div className={styles.todaysForecast__container}>
        <h2>Daily Forecast</h2>
        <div className={styles.todaysForecast__hourlyWeatherCards}>
          <HourlyWeatherCard />
        </div>
      </div>
    </div>
  );
};

export default TodaysForecast;
