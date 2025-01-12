import styles from "./ExternalLink.module.scss";
import { ExternalLink } from "lucide-react";

const ExternalLinkComponent = ({
  className,
  linkName,
  url,
}: {
  className?: string;
  linkName: string;
  url: string;
}) => {
  const clickHandler = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className={`${styles.externalLink} ${className ? styles[className] : ""}`}
      onClick={clickHandler}
    >
      {linkName}
      <ExternalLink className={styles.icon} />
    </div>
  );
};

export default ExternalLinkComponent;
