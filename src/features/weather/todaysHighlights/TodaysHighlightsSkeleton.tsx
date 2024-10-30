import styles from "./TodaysHighlights.module.scss";

const TodaysHighlightsSkeleton = () => {
  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2 className={styles.todaysHighlights__titleSkeleton} />
        <div className={styles.todaysHighlights__contents}>
          <div className={styles.todaysHighlights__overviewSkeleton} />
          <div className={styles.todaysHighlights__uvIndexSkeleton} />
          <div className={styles.todaysHighlights__sunsetAndSunriseSkeleton} />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlightsSkeleton;
