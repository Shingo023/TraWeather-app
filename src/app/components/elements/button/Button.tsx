import styles from "./Button.module.scss";

const Button = ({
  onClick,
  type,
  text,
}: {
  onClick: () => void;
  type: "button" | "submit" | "reset";
  text: string;
}) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
