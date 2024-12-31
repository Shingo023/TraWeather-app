import styles from "./TodaysHighlights.module.scss";

const TodaysHighlightsSkeleton = () => {
  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2 className={styles.todaysHighlights__titleSkeleton} />
        <div className={styles.todaysHighlights__contents}>
          <div
            className={`${styles.todaysHighlights__contentWrapper} ${styles["todaysHighlights__contentWrapper--overview"]}`}
          >
            {" "}
            <div className={styles.todaysHighlights__contentSkeleton} />
          </div>

          <div className={styles.todaysHighlights__visualContents}>
            <div className={styles.todaysHighlights__UVContent}>
              <div
                className={`${styles.todaysHighlights__contentWrapper} ${styles["todaysHighlights__contentWrapper--UV"]}`}
              >
                <div className={styles.todaysHighlights__contentSkeleton} />
              </div>
            </div>

            <div
              className={`${styles.todaysHighlights__contentWrapper} ${styles["todaysHighlights__contentWrapper--sunriseSunset"]}`}
            >
              <div className={styles.todaysHighlights__contentSkeleton} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlightsSkeleton;
