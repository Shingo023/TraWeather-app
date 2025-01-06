import { RefObject } from "react";
import styles from "./LinkTooltip.module.scss";
import ReactDOM from "react-dom";

const LinkTooltip = ({
  text,
  targetRef,
  visible,
  topToAdjust = 40,
  className,
}: {
  text: string;
  targetRef: RefObject<HTMLElement>;
  visible: boolean;
  topToAdjust?: number;
  className?: string;
}) => {
  if (!targetRef?.current) return null;

  const { top, left, width } = targetRef.current.getBoundingClientRect();

  return ReactDOM.createPortal(
    <div
      className={`${styles.tooltip} ${visible ? styles.visible : ""} ${
        className ? styles[className] : ""
      }`}
      style={{
        top: top - topToAdjust,
        left: left + width / 2,
      }}
    >
      <p className={styles.tooltip__text}>{text}</p>
    </div>,
    document.body
  );
};

export default LinkTooltip;
