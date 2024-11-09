import styles from "./SunsetAndSunrise.module.scss";
import Image from "next/image";
import { formatTimeTo12Hour } from "@/utils/dateUtils";
import { Sunrise, Sunset } from "lucide-react";
import { getBackgroundPercentage } from "@/utils/mathUtils";

const SunsetAndSunrise = ({
  sunrise,
  sunset,
  sunCurrentLocation,
}: {
  sunrise: string;
  sunset: string;
  sunCurrentLocation: number | boolean | null;
}) => {
  const sunDegrees =
    typeof sunCurrentLocation === "number"
      ? 180 * sunCurrentLocation * 0.01
      : 270;
  const backgroundPercentage =
    sunDegrees === 270 ? 0 : getBackgroundPercentage(sunDegrees);

  return (
    <div className={styles.sunsetAndSunrise}>
      <p className={styles.sunsetAndSunrise__title}>Sunrise & Sunset</p>
      <div className={styles.sunsetAndSunrise__container}>
        {/* sun orbit */}
        <div className={styles.sunsetAndSunrise__sunOrbitContainer}>
          <div
            className={styles.sunsetAndSunrise__sunOrbitLeft}
            style={{
              clipPath: `polygon(0 0, ${backgroundPercentage}% 0, ${backgroundPercentage}% 100%, 0 100%)`,
            }}
          />{" "}
          <div
            className={styles.sunsetAndSunrise__sunOrbitRight}
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
              width={22}
              height={22}
            />
          </div>
        </div>

        {/* hours container */}
        <div className={styles.sunsetAndSunrise__hoursContainer}>
          <div className={`${styles.dayTime} ${styles.sunrise}`}>
            <Sunrise className={styles.dayTime__icon} />
            {/* <span>sunrise</span> */}
            <p>{formatTimeTo12Hour(sunrise)}</p>
          </div>
          <div className={`${styles.dayTime} ${styles.sunset}`}>
            <Sunset className={styles.dayTime__icon} />
            {/* <span>sunset</span> */}
            <p>{formatTimeTo12Hour(sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunsetAndSunrise;
