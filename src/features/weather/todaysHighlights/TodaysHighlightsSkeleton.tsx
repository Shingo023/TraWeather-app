import styles from "./TodaysHighlights.module.scss";

const TodaysHighlightsSkeleton = () => {
  return (
    <div className={styles.todaysHighlights}>
      <div className={styles.todaysHighlights__container}>
        <h2 className={styles.todaysHighlights__titleSkeleton} />
        <div className={styles.todaysHighlights__contents}>
          <div className={styles.todaysHighlights__contentSkeleton} />
          <div className={styles.todaysHighlights__contentSkeleton} />
          <div className={styles.todaysHighlights__contentSkeleton} />
        </div>
      </div>
    </div>
  );
};

export default TodaysHighlightsSkeleton;
