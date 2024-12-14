import styles from "./UVIndex.module.scss";

const UVIndex = ({ uvIndex }: { uvIndex: number }) => {
  const getUvMessage = (uvPercentage: number): string => {
    let message = "";

    switch (true) {
      case uvPercentage <= 2:
        message = "Low";
        break;
      case uvPercentage <= 5:
        message = "Moderate";
        break;
      case uvPercentage <= 7:
        message = "High";
        break;
      case uvPercentage <= 10:
        message = "Very high";
        break;
      case uvPercentage >= 11:
        message = "Extreme";
        break;
      default:
        message = "Error, please try again later";
        break;
    }

    return message;
  };

  const UVpercentage = {
    transform: `rotate(${(16.36 * (uvIndex * 100)) / 10 / 180}deg`,
  };

  return (
    <div className={styles.uvIndex}>
      <div className={styles.uvIndex__title}>UV index</div>
      <div className={styles.uvIndex__contents}>
        <div className={styles.uvIndex__gaugeContainer}>
          <div className={styles.uvIndex__gauge}>
            <div
              className={styles.uvIndex__gaugeMeterCover}
              style={UVpercentage}
            />
            <div className={styles.uvIndex__gaugeBottomCover} />
            <p className={styles.uvIndex__value}>
              {(uvIndex * 100) / 10 / 180} <span>UV</span>
            </p>
          </div>
        </div>
        <div className={styles.uvIndex__indicator}>
          <p>{getUvMessage((uvIndex * 100) / 10 / 180)}</p>
        </div>
      </div>
    </div>
  );
};

export default UVIndex;

// import styles from "./UVIndex.module.scss";

// const UVIndex = ({ uvIndex }: { uvIndex: number }) => {
//   const getUvMessage = (uvPercentage: number): string => {
//     let message = "";

//     switch (true) {
//       case uvPercentage <= 2:
//         message = "Low";
//         break;
//       case uvPercentage <= 5:
//         message = "Moderate";
//         break;
//       case uvPercentage <= 7:
//         message = "High";
//         break;
//       case uvPercentage <= 10:
//         message = "Very high";
//         break;
//       case uvPercentage >= 11:
//         message = "Extreme";
//         break;
//       default:
//         message = "Error, please try again later";
//         break;
//     }

//     return message;
//   };

//   const UVpercentage = {
//     transform: `rotate(${(16.36 * (uvIndex * 100)) / 10 / 180}deg`,
//   };

//   return (
//     <div className={styles.uvIndex}>
//       <h3>UV index</h3>
//       <div className={styles.circles}>
//         <div className={styles.gauge}>
//           <div className={styles.gaugeBody}>
//             <div className={styles.gaugeFill} style={UVpercentage}></div>
//             <div className={styles.gaugeCover}>
//               <p>
//                 {(uvIndex * 100) / 10 / 180} <span>UV</span>
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className={styles.uvMessage}>
//           {getUvMessage((uvIndex * 100) / 10 / 180)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UVIndex;
