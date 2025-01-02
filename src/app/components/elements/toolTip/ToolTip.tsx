import styles from "./ToolTip.module.scss";

const ToolTip = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div className={`${styles.tooltip} ${className ? styles[className] : ""}`}>
      <p className={styles.tooltip__message}>{message}</p>
    </div>
  );
};

export default ToolTip;
