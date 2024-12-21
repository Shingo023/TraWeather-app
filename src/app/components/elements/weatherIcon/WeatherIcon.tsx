import Image from "next/image";
import { WeatherIconProps } from "@/types";
import styles from "./WeatherIcon.module.scss";

const WeatherIcon = ({
  className,
  weatherIcon,
  priority = false,
}: WeatherIconProps) => {
  if (!weatherIcon) {
    return null;
  }

  return (
    <Image
      className={`${styles.weatherIcon} ${className ? styles[className] : ""}`}
      src={weatherIcon}
      alt="Weather icon"
      width={100}
      height={100}
      priority={priority}
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default WeatherIcon;
