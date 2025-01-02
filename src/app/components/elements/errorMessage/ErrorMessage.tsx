import styles from "./ErrorMessage.module.scss";
import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.error}>
      <AlertTriangle className={styles.error__icon} />
      <span className={styles.error__text}>{message}</span>
    </div>
  );
};

export default ErrorMessage;
