import { CloudHail, Umbrella, Wind } from "lucide-react";
import styles from "./WeatherCard.module.scss";
import { getPrecipIntensity, getWindStrength } from "@/utils/weatherUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import React from "react";
import { WeatherCardType } from "@/types";

const WeatherCard = ({
  dateTime,
  weatherIconSrc,
  temp,
  tempMax,
  tempMin,
  precipProb,
  precipAmount,
  windSpeed,
  className,
}: WeatherCardType) => {
  return (
    <div
      className={`${styles.weatherCard} ${className ? styles[className] : ""}`}
    >
      <section className={styles.weatherCard__top}>
        <h3 className={styles.weatherCard__time}>{dateTime}</h3>
        <div className={styles.weatherCard__weatherIcon}>
          <WeatherIcon className={className} weatherIcon={weatherIconSrc} />
        </div>
        {!isNaN(temp ?? NaN) ? (
          <p className={styles.weatherCard__temp}>{temp}°</p>
        ) : (
          <p className={styles.weatherCard__temp}>
            {tempMax}°<span>/</span> {tempMin}°
          </p>
        )}
      </section>

      <section className={styles.weatherCard__bottom}>
        <ul className={styles.weatherCard__details}>
          <li
            className={`${styles.weatherCard__precipProb} ${
              precipProb > 0 ? styles.active : ""
            }`}
          >
            <Umbrella className={styles.weatherCard__icon} />
            <p>
              {precipProb}
              <span>%</span>
            </p>
          </li>
          {typeof precipAmount === "number" ? (
            <li className={styles.weatherCard__precip}>
              <CloudHail className={styles.weatherCard__icon} />
              <p>
                {precipAmount}
                <span>mm</span>
              </p>
              <p className={styles.weatherCard__weatherIndex}>
                {getPrecipIntensity(precipAmount)}
              </p>
            </li>
          ) : null}

          {windSpeed ? (
            <li className={styles.weatherCard__wind}>
              <Wind className={styles.weatherCard__icon} />
              <p>
                {windSpeed}
                <span>kph</span>
              </p>
              <p className={styles.weatherCard__weatherIndex}>
                {getWindStrength(windSpeed)}
              </p>
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
};

export default React.memo(WeatherCard);
