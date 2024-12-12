import Image from "next/image";
import { WeatherIconProps } from "@/types";

const WeatherIcon = ({
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
      src={weatherIcon}
      alt="Weather icon"
      width={width ?? 60}
      height={height ?? 60}
      priority={priority}
    />
  );
};

export default WeatherIcon;
