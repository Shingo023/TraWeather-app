import { WeatherDay } from "@/types";
import styles from "./WeeklyForecastWeatherCard.module.scss";
import { formatDate } from "@/utils/dateUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import { Umbrella } from "lucide-react";

const WeeklyForecastWeatherCard = ({
  dailyWeather,
  selectedDate,
  handleClick,
  dailyWeatherIcon,
}: {
  dailyWeather: WeatherDay;
  selectedDate: string | null;
  handleClick: (date: string, selectedDateWeather: WeatherDay) => void;
  dailyWeatherIcon: string;
}) => {
  return (
    <li
      className={`${styles.weeklyForecast__item} ${
        dailyWeather.datetime === selectedDate && styles.active
      }`}
      onClick={() => handleClick(dailyWeather.datetime, dailyWeather)}
    >
      <h3 className={styles.weeklyForecast__date}>
        {formatDate(dailyWeather.datetime)}
      </h3>
      <div className={styles.weeklyForecast__weatherInfo}>
        <div className={styles.weeklyForecast__weatherIconWrapper}>
          <div className={`iconContainer ${styles.weatherIcon}`}>
            <WeatherIcon weatherIcon={dailyWeatherIcon} />
          </div>
        </div>
        <div className={styles.weeklyForecast__stats}>
          <div className={styles.weeklyForecast__weatherTemperature}>
            <p>
              {Math.round(dailyWeather.tempmax)}°<span>/</span>
              {Math.round(dailyWeather.tempmin)}°
            </p>
          </div>
          <div className={styles.weeklyForecast__chanceOfRainWrapper}>
            <div
              className={`${styles.weeklyForecast__chanceOfRain} ${
                Math.round(dailyWeather.precipprob / 5) * 5 > 0
                  ? styles["weeklyForecast__chanceOfRain--active"]
                  : ""
              }`}
            >
              <div className={`iconContainer ${styles.umbrellaIcon}`}>
                <Umbrella className={`icon ${styles.umbrella}`} />
              </div>
              <p>{Math.round(dailyWeather.precipprob / 5) * 5}%</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default WeeklyForecastWeatherCard;
