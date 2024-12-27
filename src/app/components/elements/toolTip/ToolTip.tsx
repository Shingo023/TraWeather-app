import styles from "./ToolTip.module.scss";

const ToolTip = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <span className={`${styles.tooltip} ${className ? styles[className] : ""}`}>
      {message}
    </span>
  );
};

export default ToolTip;
