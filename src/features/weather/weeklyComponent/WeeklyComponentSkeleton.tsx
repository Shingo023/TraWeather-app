import styles from "./WeeklyComponent.module.scss";

const WeeklyComponentSkeleton = () => {
  const items = Array(7).fill(null); // Create an array with 7 undefined elements

  return (
    <div className={styles.WeeklyComponent}>
      <div className={styles.WeeklyComponent__content}>
        <h2 className={styles.WeeklyComponent__headerSkeleton} />
        <ul className={styles.WeeklyComponentList}>
          {items.map((_, index) => (
            <li className={styles.WeeklyComponentItem} key={index}>
              <p className={styles.WeeklyComponentItem__dateSkeleton} />
              <div className={styles.WeeklyComponentItem__weatherInfo}>
                <div className={styles.WeeklyComponentItem__weatherInfoLeft}>
                  <div
                    className={styles.WeeklyComponentItem__weatherIconSkeleton}
                  />
                </div>
                <div className={styles.WeeklyComponentItem__weatherInfoRight}>
                  <div
                    className={styles.WeeklyComponentItem__tempsSkeletonWrapper}
                  >
                    <div
                      className={styles.WeeklyComponentItem__tempsSkeleton}
                    />
                  </div>
                  <div
                    className={
                      styles.WeeklyComponentItem__chanceOfRainSkeletonSkeletonWrapper
                    }
                  >
                    <div
                      className={
                        styles.WeeklyComponentItem__chanceOfRainSkeleton
                      }
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyComponentSkeleton;
