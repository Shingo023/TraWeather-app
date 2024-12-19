import styles from "./SunsetAndSunrise.module.scss";
import Image from "next/image";
import { formatTimeTo12Hour, getTodayDateInTimeZone } from "@/utils/dateUtils";
import { Sunrise, Sunset } from "lucide-react";
import {
  daylightPercentage,
  getBackgroundPercentage,
  getDaytimePeriod,
} from "@/utils/mathUtils";
import React from "react";

const SunsetAndSunrise = ({
  sunrise,
  sunset,
  selectedDate,
  lastWeatherFetchDateTime,
  todaysDate,
}: {
  sunrise: string;
  sunset: string;
  selectedDate: string;
  lastWeatherFetchDateTime: string | null;
  todaysDate: string | null;
}) => {
  const sunriseTime = formatTimeTo12Hour(sunrise.slice(0, 5));
  const sunsetTime = formatTimeTo12Hour(sunset.slice(0, 5));
  const daytimePeriod = getDaytimePeriod(
    sunrise,
    sunset,
    lastWeatherFetchDateTime!
  );

  const sunCurrentLocation =
    selectedDate === todaysDate && lastWeatherFetchDateTime
      ? daylightPercentage(lastWeatherFetchDateTime, sunrise, sunset)
      : null;

  const sunDegrees =
    typeof sunCurrentLocation === "number"
      ? 180 * sunCurrentLocation * 0.01
      : 270;
  const backgroundPercentage =
    sunDegrees === 270 ? 0 : getBackgroundPercentage(sunDegrees);

  return (
    <div className={styles.sunsetAndSunrise}>
      <div className={styles.sunsetAndSunrise__wrapper}>
        <p className={styles.sunsetAndSunrise__title}>Sunrise & Sunset</p>
        <div className={styles.sunsetAndSunrise__container}>
          {selectedDate === todaysDate ? (
            <>
              {/* sun orbit */}
              <div className={styles.sunsetAndSunrise__sunOrbitContainer}>
                <div
                  className={styles.sunsetAndSunrise__sunOrbitLeft}
                  style={{
                    clipPath: `polygon(0 0, ${backgroundPercentage}% 0, ${backgroundPercentage}% 100%, 0 100%)`,
                  }}
                />{" "}
                <div
                  className={`${styles.sunsetAndSunrise__sunOrbitRight} ${
                    daytimePeriod !== "middle" ? styles.night : ""
                  }`}
                  style={{
                    clipPath: `polygon(${backgroundPercentage}% 0, 100% 0, 100% 100%, ${backgroundPercentage}% 100%)`,
                  }}
                />
                <div
                  className={styles.sunsetAndSunrise__clockHandWrapper}
                  style={{ transform: `rotate(${sunDegrees}deg)` }}
                >
                  <Image
                    className={styles.sunsetAndSunrise__sunIcon}
                    src="/heroicons_sun-solid.svg"
                    alt="sun-icon"
                    width={30}
                    height={30}
                  />
                </div>
              </div>

              {/* hours container */}
              <div
                className={`${styles.sunsetAndSunrise__hoursContainer} ${
                  daytimePeriod !== "middle" ? styles.nightHorizon : ""
                }`}
              >
                <div className={`${styles.dayTime} ${styles.sunrise}`}>
                  <Sunrise
                    className={`${styles.dayTime__icon} ${
                      daytimePeriod === "before" ? styles.active : ""
                    }`}
                  />
                  {/* <span>sunrise</span> */}
                  <p>{sunriseTime}</p>
                </div>
                <div className={`${styles.dayTime} ${styles.sunset}`}>
                  <Sunset
                    className={`${styles.dayTime__icon} ${
                      daytimePeriod === "after" ? styles.active : ""
                    }`}
                  />
                  {/* <span>sunset</span> */}
                  <p>{sunsetTime}</p>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.sunsetAndSunrise__timesWrapper}>
              <div className={styles.sunsetAndSunrise__iconAndTime}>
                <div className={styles.sunsetAndSunrise__iconContainer}>
                  <Sunrise width={30} height={30} />
                </div>
                <div className={styles.sunsetAndSunrise__time}>
                  {sunriseTime}
                </div>
              </div>
              <div className={styles.sunsetAndSunrise__iconAndTime}>
                <div className={styles.sunsetAndSunrise__iconContainer}>
                  <Sunset width={30} height={30} />
                </div>
                <div className={styles.sunsetAndSunrise__time}>
                  {sunsetTime}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SunsetAndSunrise);
