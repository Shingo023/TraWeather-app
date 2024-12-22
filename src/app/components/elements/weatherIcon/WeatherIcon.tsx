import Image from "next/image";
import { WeatherIconProps } from "@/types";

const WeatherIcon = ({ weatherIcon, priority = false }: WeatherIconProps) => {
  if (!weatherIcon) {
    return null;
  }

  return (
    <Image
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
