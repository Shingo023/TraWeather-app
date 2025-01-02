import styles from "./SunsetAndSunrise.module.scss";
import Image from "next/image";
import { formatTimeTo12Hour } from "@/utils/dateUtils";
import { Info, Sunrise, Sunset } from "lucide-react";
import {
  daylightPercentage,
  getBackgroundPercentage,
  getDaytimePeriod,
} from "@/utils/mathUtils";
import React from "react";
import { SunsetAndSunriseProps } from "@/types";

const SunsetAndSunrise = ({
  sunrise,
  sunset,
  selectedDate,
  lastWeatherFetchDateTime,
  todaysDate,
}: SunsetAndSunriseProps) => {
  const isSunDataAvailable = sunrise && sunset;

  const sunriseTime = isSunDataAvailable
    ? formatTimeTo12Hour(sunrise.slice(0, 5))
    : null;
  const sunsetTime = isSunDataAvailable
    ? formatTimeTo12Hour(sunset.slice(0, 5))
    : null;

  const daytimePeriod = isSunDataAvailable
    ? getDaytimePeriod(sunrise, sunset, lastWeatherFetchDateTime!)
    : null;

  const [sunriseTimePart, sunriseSuffix] = sunriseTime?.split(" ") || [];
  const [sunsetTimePart, sunsetSuffix] = sunsetTime?.split(" ") || [];

  const sunCurrentLocation =
    isSunDataAvailable &&
    selectedDate === todaysDate &&
    lastWeatherFetchDateTime
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
        <h3 className={styles.sunsetAndSunrise__title}>Sunrise & Sunset</h3>
        <div className={styles.sunsetAndSunrise__container}>
          {isSunDataAvailable ? (
            selectedDate === todaysDate ? (
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

                {/* sunrise and sunset times */}
                <div
                  className={`${styles.sunsetAndSunrise__times} ${
                    daytimePeriod !== "middle"
                      ? styles["sunsetAndSunrise__times--night"]
                      : ""
                  }`}
                >
                  <div
                    className={`${styles.sunsetAndSunrise__timeWrapper} ${styles["sunsetAndSunrise__timeWrapper--sunrise"]}`}
                  >
                    <div
                      className={`iconContainer ${styles.sunriseContainer} `}
                    >
                      <Sunrise
                        className={`icon ${styles.sunrise} ${
                          daytimePeriod === "before"
                            ? styles["sunrise--active"]
                            : ""
                        }`}
                      />
                    </div>
                    <p>{sunriseTime}</p>
                  </div>

                  <div
                    className={`${styles.sunsetAndSunrise__timeWrapper} ${styles["sunsetAndSunrise__timeWrapper--sunset"]}`}
                  >
                    <div className={`iconContainer ${styles.sunsetContainer} `}>
                      <Sunset
                        className={`icon ${styles.sunset} ${
                          daytimePeriod === "after"
                            ? styles["sunset--active"]
                            : ""
                        }`}
                      />
                    </div>
                    <p>{sunsetTime}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.sunsetAndSunrise__timesWrapper}>
                <div className={styles.sunsetAndSunrise__iconAndTime}>
                  <div
                    className={`iconContainer ${styles["sunriseContainer--large"]}`}
                  >
                    <Sunrise className="icon" />
                  </div>

                  <div className={styles.sunsetAndSunrise__time}>
                    <p className={styles.sunsetAndSunrise__timePart}>
                      {sunriseTimePart}
                    </p>
                    <p className={styles.sunsetAndSunrise__suffix}>
                      {sunriseSuffix}
                    </p>
                  </div>
                </div>

                <div className={styles.sunsetAndSunrise__iconAndTime}>
                  <div
                    className={`iconContainer ${styles["sunsetContainer--large"]}`}
                  >
                    <Sunset className="icon" />
                  </div>
                  <div className={styles.sunsetAndSunrise__time}>
                    <p className={styles.sunsetAndSunrise__timePart}>
                      {sunsetTimePart}
                    </p>
                    <p className={styles.sunsetAndSunrise__suffix}>
                      {sunsetSuffix}
                    </p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className={styles.sunsetAndSunrise__message}>
              <Info className={styles.sunsetAndSunrise__messageIcon} />
              <p>The sun does not rise or set at this location on this date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SunsetAndSunrise);
