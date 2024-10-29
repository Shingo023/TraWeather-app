import { CloudHail, Umbrella, Wind } from "lucide-react";
import styles from "./HourlyWeatherCard.module.scss";
import { getPrecipIntensity, getWindStrength } from "@/utils/weatherUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";

const HourlyWeatherCard = ({
  hour,
  weatherIconSrc,
  iconWidth,
  iconHeight,
  temp,
  precipProb,
  precipAmount,
  windSpeed,
}: {
  hour: string;
  weatherIconSrc: string;
  iconWidth: number;
  iconHeight: number;
  temp: number;
  precipProb: number;
  precipAmount: number;
  windSpeed: number;
}) => {
  return (
    <div className={styles.hourlyWeather}>
      <div className={styles.hourlyWeather__top}>
        <p className={styles.hourlyWeather__time}>{hour}</p>
        <div className={styles.hourlyWeather__weatherIcon}>
          <WeatherIcon
            weatherIcon={weatherIconSrc}
            width={iconWidth}
            height={iconHeight}
          />
        </div>
        <div className={styles.hourlyWeather__temp}>{temp}°</div>
      </div>

      <div className={styles.hourlyWeather__bottom}>
        <div
          className={`${styles.hourlyWeather__precipProb} ${
            precipProb > 0 ? styles.precipProbActive : ""
          }`}
        >
          <Umbrella className={styles.hourlyWeather__icon} />
          <p>
            {precipProb}
            <span>%</span>
          </p>
        </div>

        <div className={styles.hourlyWeather__precip}>
          <CloudHail className={styles.hourlyWeather__icon} />
          <p>
            {precipAmount}
            <span>mm</span>
          </p>
          <div className={styles.hourlyWeather__weatherIndex}>
            {getPrecipIntensity(precipAmount)}
          </div>
        </div>

        <div className={styles.hourlyWeather__wind}>
          <Wind className={styles.hourlyWeather__icon} />
          <p>
            {windSpeed}
            <span>kph</span>
          </p>
          <div className={styles.hourlyWeather__weatherIndex}>
            {getWindStrength(windSpeed)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyWeatherCard;
