import { WeatherDataForForecast, WeatherIconType } from "@/types";
import styles from "./WeatherForecast.module.scss";
import { formatDate, formatTimeTo12Hour } from "@/utils/dateUtils";
import WeatherCard from "@/features/weather/todaysForecast/weatherCard/WeatherCard";
import { iconMapping } from "@/utils/weatherIconMapping";
import { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const WeatherForecast = ({
  dailyOrWeeklyWeather,
  iconWidth,
  iconHeight,
  className,
}: {
  dailyOrWeeklyWeather: WeatherDataForForecast[] | null;
  iconWidth?: number;
  iconHeight?: number;
  className: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainer = useRef<HTMLDivElement>(null);

  const checkScrollPosition = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setCanScrollLeft(scrollLeft > 0); // Can scroll left if not at the start
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth); // Can scroll right if not at the end
    }
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      const visibleWidth = scrollContainer.current.clientWidth; // Get the visible width of the container
      scrollContainer.current.scrollBy({
        left: -visibleWidth, // Scroll by the visible width
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      const visibleWidth = scrollContainer.current.clientWidth; // Get the visible width of the container
      scrollContainer.current.scrollBy({
        left: visibleWidth, // Scroll by the visible width
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollPosition(); // Initial check
    scrollContainer.current?.addEventListener("scroll", checkScrollPosition);
    return () =>
      scrollContainer.current?.removeEventListener(
        "scroll",
        checkScrollPosition
      );
  }, []);

  return (
    <div
      className={styles.weatherForecastWrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && canScrollLeft && (
        <div className={styles.arrowLeft} onClick={scrollLeft}>
          <ChevronsLeft className={styles.arrowIcon} />
        </div>
      )}

      <div className={styles.weatherForecast} ref={scrollContainer}>
        {dailyOrWeeklyWeather?.map((weather, index) => {
          const dateTime = weather.datetime.includes(":")
            ? formatTimeTo12Hour(weather.datetime)
            : formatDate(weather.datetime);
          const weatherIcon = weather.icon as WeatherIconType;
          const weatherIconSrc = iconMapping[weatherIcon];

          const temp =
            weather.temp || weather.temp === 0
              ? Math.round(weather.temp)
              : undefined;
          const tempMax = weather.tempmax
            ? Math.round(weather.tempmax)
            : undefined;
          const tempMin = weather.tempmin
            ? Math.round(weather.tempmin)
            : undefined;

          const precipProb = Math.round(weather.precipprob / 5) * 5;

          const rawPrecipAmount = weather.precip === null ? 0 : weather.precip;
          const precipAmount =
            typeof rawPrecipAmount === "number"
              ? Number(rawPrecipAmount.toFixed(1))
              : null;
          const windSpeed = weather.windspeed
            ? Math.round(weather.windspeed)
            : undefined;

          return (
            <WeatherCard
              key={index}
              dateTime={dateTime}
              weatherIconSrc={weatherIconSrc}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
              temp={temp}
              tempMax={tempMax}
              tempMin={tempMin}
              precipProb={precipProb}
              precipAmount={precipAmount}
              windSpeed={windSpeed}
              className={className}
            />
          );
        })}
      </div>

      {hovered && canScrollRight && (
        <div className={styles.arrowRight} onClick={scrollRight}>
          <ChevronsRight className={styles.arrowIcon} />
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
