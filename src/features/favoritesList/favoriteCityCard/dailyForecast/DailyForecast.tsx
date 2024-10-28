import { WeatherHour, WeatherIconType } from "@/types";
import styles from "./DailyForecast.module.scss";
import { formatTimeTo12Hour } from "@/utils/dateUtils";
import HourlyWeatherCard from "@/features/weather/todaysForecast/hourlyWeatherCard/HourlyWeatherCard";
import { iconMapping } from "@/utils/weatherIconMapping";
import { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const DailyForecast = ({
  twentyFourHoursWeather,
}: {
  twentyFourHoursWeather: WeatherHour[];
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
      className={styles.dailyForecastWrapper}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && canScrollLeft && (
        <div className={styles.arrowLeft} onClick={scrollLeft}>
          <ChevronsLeft className={styles.arrowIcon} />
        </div>
      )}

      <div className={styles.dailyForecast} ref={scrollContainer}>
        {twentyFourHoursWeather.map((hourlyWeather: WeatherHour) => {
          const hour = formatTimeTo12Hour(hourlyWeather.datetime);
          const weatherIcon = hourlyWeather.icon as WeatherIconType;
          const weatherIconSrc = iconMapping[weatherIcon];
          const temp = Math.round(hourlyWeather.temp);
          const precipProb = Math.round(hourlyWeather.precipprob / 5) * 5;

          const rawPrecipAmount = hourlyWeather.precip ?? 0;
          const precipAmount = Number(rawPrecipAmount.toFixed(1));
          const windSpeed = Math.round(hourlyWeather.windspeed);

          return (
            <HourlyWeatherCard
              key={hourlyWeather.datetime}
              hour={hour}
              weatherIconSrc={weatherIconSrc}
              iconWidth={50}
              iconHeight={50}
              temp={temp}
              precipProb={precipProb}
              precipAmount={precipAmount}
              windSpeed={windSpeed}
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

export default DailyForecast;
