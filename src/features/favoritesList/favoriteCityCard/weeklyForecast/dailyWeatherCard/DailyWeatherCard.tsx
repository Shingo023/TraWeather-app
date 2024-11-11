import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import styles from "./DailyWeatherCard.module.scss";
import { Umbrella } from "lucide-react";
import Button from "@/app/components/elements/button/Button";

const DailyWeatherCard = ({
  date,
  weatherIconSrc,
  maxTemp,
  minTemp,
  precipProb,
}: {
  date: string;
  weatherIconSrc: string;
  maxTemp: number;
  minTemp: number;
  precipProb: number;
}) => {
  const handleClick = () => {};

  return (
    <div className={styles.dailyWeather}>
      <div className={styles.dailyWeather__top}>
        <p className={styles.dailyWeather__date}>{date}</p>
        <div className={styles.dailyWeather__weatherIcon}>
          <WeatherIcon weatherIcon={weatherIconSrc} width={50} height={50} />
        </div>
        <div className={styles.dailyWeather__temps}>
          {maxTemp}° / {minTemp}°
        </div>
        <div
          className={`${styles.dailyWeather__precipProb} ${
            precipProb > 0 ? styles.precipProbActive : ""
          }`}
        >
          <Umbrella className={styles.dailyWeather__icon} />
          <p>
            {precipProb}
            <span>%</span>
          </p>
        </div>
      </div>

      <div className={styles.dailyWeather__hourlyWeatherBtn}>
        <Button text="Hourly Weather" type="button" onClick={handleClick} />
      </div>
    </div>
  );
};

export default DailyWeatherCard;
