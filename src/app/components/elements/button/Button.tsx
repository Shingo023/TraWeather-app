import styles from "./Button.module.scss";

const Button = ({
  className,
  onClick,
  type,
  text,
  isDisabled = false,
}: {
  className: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  text: string;
  isDisabled?: boolean;
}) => {
  return (
    <button
      className={`${styles.button} ${className ? styles[className] : ""}`}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
