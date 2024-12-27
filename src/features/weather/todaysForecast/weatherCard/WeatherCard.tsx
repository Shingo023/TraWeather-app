import { CloudHail, Umbrella, Wind } from "lucide-react";
import styles from "./WeatherCard.module.scss";
import { getPrecipIntensity, getWindStrength } from "@/utils/weatherUtils";
import WeatherIcon from "@/app/components/elements/weatherIcon/WeatherIcon";
import React from "react";
import { WeatherCardType } from "@/types";
import { precipIconMapping, windIconMapping } from "@/utils/weatherIconMapping";

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
  const precipIntensity = getPrecipIntensity(precipAmount!);
  const precipIconSrc = precipIconMapping[precipIntensity];
  const windStrength = getWindStrength(windSpeed!);
  const windIconSrc = windIconMapping[windStrength];

  return (
    <div
      className={`${styles.weatherCard} ${className ? styles[className] : ""}`}
    >
      <section className={styles.weatherCard__top}>
        <h3 className={styles.weatherCard__time}>{dateTime}</h3>
        <div className={`iconContainer ${styles.weatherIcon}`}>
          <WeatherIcon weatherIcon={weatherIconSrc} />
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
              precipProb > 0 ? styles["weatherCard__precipProb--active"] : ""
            }`}
          >
            <div className={`iconContainer ${styles.weatherCardIcon}`}>
              <Umbrella className={`icon ${styles.umbrellaIcon}`} />
            </div>
            <p className={styles.weatherCard__stat}>
              {precipProb}
              <span>%</span>
            </p>
          </li>

          {typeof precipAmount === "number" ? (
            <li className={styles.weatherCard__precip}>
              <div className={`iconContainer ${styles.weatherCardIcon}`}>
                <WeatherIcon weatherIcon={precipIconSrc} />
                {/* <CloudHail className="icon" /> */}
              </div>
              <p className={styles.weatherCard__stat}>
                {precipAmount}
                <span>mm</span>
              </p>

              {/* <p className={styles.weatherCard__weatherIndex}>
                {getPrecipIntensity(precipAmount)}
              </p> */}
            </li>
          ) : null}

          {windSpeed ? (
            <li className={styles.weatherCard__wind}>
              <div className={`iconContainer ${styles.weatherCardIcon}`}>
                <WeatherIcon weatherIcon={windIconSrc} />
                {/* <Wind className="icon" /> */}
              </div>
              <p className={styles.weatherCard__stat}>
                {windSpeed}
                <span>kph</span>
              </p>
              {/* <p className={styles.weatherCard__weatherIndex}>
                {getWindStrength(windSpeed)}
              </p> */}
            </li>
          ) : null}
        </ul>
      </section>
    </div>
  );
};

export default React.memo(WeatherCard);
