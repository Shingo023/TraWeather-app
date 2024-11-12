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
  tempMax,
  tempMin,
  precipProb,
  precipAmount,
  windSpeed,
}: {
  hour: string;
  weatherIconSrc: string;
  iconWidth: number;
  iconHeight: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  precipProb: number;
  precipAmount?: number | null;
  windSpeed?: number | null;
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
        {temp ? (
          <div className={styles.hourlyWeather__temp}>{temp}°</div>
        ) : (
          <div className={styles.hourlyWeather__temp}>
            {tempMax}° / {tempMin}°
          </div>
        )}
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

        {typeof precipAmount === "number" ? (
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
        ) : null}

        {windSpeed ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default HourlyWeatherCard;
