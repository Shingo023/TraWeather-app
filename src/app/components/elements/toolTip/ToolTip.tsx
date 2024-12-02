import styles from "./ToolTip.module.scss";

const ToolTip = ({ message, width }: { message: string; width?: number }) => {
  return (
    <span className={styles.tooltip} style={{ width: `${width}px` }}>
      {message}
    </span>
  );
};

export default ToolTip;
