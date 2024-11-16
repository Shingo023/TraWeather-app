import styles from "./Button.module.scss";

const Button = ({
  className,
  onClick,
  type,
  text,
}: {
  className: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  text: string;
}) => {
  return (
    <button
      className={`${styles.button} ${className ? styles[className] : ""}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
