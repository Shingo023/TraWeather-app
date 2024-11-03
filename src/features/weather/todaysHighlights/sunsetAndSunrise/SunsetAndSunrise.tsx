import styles from "./SunsetAndSunrise.module.scss";
import Image from "next/image";
import sun from "../../../../public/heroicons_sun-solid.svg";
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
  console.log(sunCurrentLocation);

  if (
    typeof sunCurrentLocation !== "number" ||
    sunCurrentLocation < 0 ||
    sunCurrentLocation > 100
  ) {
    return null;
  }

  const sunDegrees = 180 * sunCurrentLocation * 0.01;
  const backgroundPercentage = getBackgroundPercentage(sunDegrees);

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
              src={sun}
              alt=""
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

// import styles from "./SunsetAndSunrise.module.scss";
// import Image from "next/image";
// import sun from "../../../../public/heroicons_sun-solid.svg";
// import { formatTimeTo12Hour } from "@/utils/dateUtils";
// import { Sunrise, Sunset } from "lucide-react";

// const SunsetAndSunrise = ({
//   sunrise,
//   sunset,
//   sunCurrentLocation,
//   isNight,
// }: {
//   sunrise: string;
//   sunset: string;
//   sunCurrentLocation: number;
//   isNight: boolean;
// }) => {
//   const sunPathPercentage = {
//     transform: `rotate(${sunCurrentLocation}deg`,
//   };

//   const sunIconPathPercentage = {
//     transform: `rotate(${sunCurrentLocation + 5}deg`,
//   };

//   return (
//     <div className={styles.sunsetAndSunrise}>
//       <p className={styles.SunsetAndSunriseTitle}>Sunrise & Sunset</p>
//       <div className={styles.sunsetAndSunriseContainer}>
//         <div className={styles.circles}>
//           <div className={styles.gaugeSun}>
//             <div className={styles.gaugeBodySun}>
//               {isNight ? (
//                 <>
//                   <div
//                     className={styles.gaugeFillMoon}
//                     style={{ transform: `rotate(${180}deg` }}
//                   ></div>
//                   <div
//                     className={styles.gaugeCoverSun}
//                     style={sunIconPathPercentage}
//                   ></div>
//                 </>
//               ) : (
//                 <>
//                   <div
//                     className={styles.gaugeFillSun}
//                     style={sunPathPercentage}
//                   ></div>
//                   <div
//                     className={styles.gaugeCoverSun}
//                     style={sunIconPathPercentage}
//                   >
//                     <Image className={styles.sunIcon} src={sun} alt="" />
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className={styles.hoursContainer}>
//             <div className={`${styles.dayTime} ${styles.sunrise}`}>
//               <Sunrise className={styles.dayTime__icon} />
//               {/* <span>sunrise</span> */}
//               <p>{formatTimeTo12Hour(sunrise)}</p>
//             </div>
//             <div className={`${styles.dayTime} ${styles.sunset}`}>
//               <Sunset className={styles.dayTime__icon} />
//               {/* <span>sunset</span> */}
//               <p>{formatTimeTo12Hour(sunset)}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SunsetAndSunrise;
