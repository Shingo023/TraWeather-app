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
      className={`${styles.WeeklyComponentItem} ${
        dailyWeather.datetime === selectedDate && styles.active
      }`}
      onClick={() => handleClick(dailyWeather.datetime, dailyWeather)}
    >
      <p className={styles.WeeklyComponentItem__date}>
        {formatDate(dailyWeather.datetime)}
      </p>
      <div className={styles.WeeklyComponentItem__weatherInfo}>
        <div className={styles.WeeklyComponentItem__weatherInfoLeft}>
          <div>
            <WeatherIcon
              weatherIcon={dailyWeatherIcon}
              height={35}
              width={35}
            />
          </div>
        </div>
        <div className={styles.WeeklyComponentItem__weatherInfoRight}>
          <p>
            {Math.round(dailyWeather.tempmax)}°/
            {Math.round(dailyWeather.tempmin)}°
          </p>

          <div
            className={`${styles.chanceOfRain} ${
              Math.round(dailyWeather.precipprob / 5) * 5 > 0
                ? styles.chanceOfRainActive
                : ""
            }`}
          >
            <Umbrella className={styles.chanceOfRain__icon} />
            <p>{Math.round(dailyWeather.precipprob / 5) * 5}%</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default WeeklyForecastWeatherCard;
