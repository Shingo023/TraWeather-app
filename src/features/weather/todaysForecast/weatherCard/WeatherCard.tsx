import { CloudHail, Umbrella, Wind } from "lucide-react";
import styles from "./WeatherCard.module.scss";
import { getPrecipIntensity, getWindStrength } from "@/utils/weatherUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";

const WeatherCard = ({
  dateTime,
  weatherIconSrc,
  iconWidth,
  iconHeight,
  temp,
  tempMax,
  tempMin,
  precipProb,
  precipAmount,
  windSpeed,
  cardWidth,
}: {
  dateTime: string;
  weatherIconSrc: string;
  iconWidth: number;
  iconHeight: number;
  temp: number;
  tempMax: number;
  tempMin: number;
  precipProb: number;
  precipAmount?: number | null;
  windSpeed?: number | null;
  cardWidth: number;
}) => {
  return (
    <div
      className={styles.weatherCard}
      style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
    >
      <div className={styles.weatherCard__top}>
        <p className={styles.weatherCard__time}>{dateTime}</p>
        <div className={styles.weatherCard__weatherIcon}>
          <WeatherIcon
            weatherIcon={weatherIconSrc}
            width={iconWidth}
            height={iconHeight}
          />
        </div>
        {temp ? (
          <div className={styles.weatherCard__temp}>{temp}°</div>
        ) : (
          <div className={styles.weatherCard__temp}>
            {tempMax}° / {tempMin}°
          </div>
        )}
      </div>

      <div className={styles.weatherCard__bottom}>
        <div
          className={`${styles.weatherCard__precipProb} ${
            precipProb > 0 ? styles.precipProbActive : ""
          }`}
        >
          <Umbrella className={styles.weatherCard__icon} />
          <p>
            {precipProb}
            <span>%</span>
          </p>
        </div>

        {typeof precipAmount === "number" ? (
          <div className={styles.weatherCard__precip}>
            <CloudHail className={styles.weatherCard__icon} />
            <p>
              {precipAmount}
              <span>mm</span>
            </p>
            <div className={styles.weatherCard__weatherIndex}>
              {getPrecipIntensity(precipAmount)}
            </div>
          </div>
        ) : null}

        {windSpeed ? (
          <div className={styles.weatherCard__wind}>
            <Wind className={styles.weatherCard__icon} />
            <p>
              {windSpeed}
              <span>kph</span>
            </p>
            <div className={styles.weatherCard__weatherIndex}>
              {getWindStrength(windSpeed)}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherCard;
