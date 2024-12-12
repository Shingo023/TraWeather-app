import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({ message }: { message: string }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingMessage}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
