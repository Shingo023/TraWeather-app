import Image from "next/image";
import { WeatherIconProps } from "@/types";
import styles from "./WeatherIcon.module.scss";

const WeatherIcon = ({
  className,
  weatherIcon,
  width,
  height,
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
      layout="responsive"
      width={1}
      height={1}
      priority={priority}
    />
  );
};

export default WeatherIcon;
