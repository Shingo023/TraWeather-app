import { ArrowUpToLine, Droplet, Eye, Thermometer } from "lucide-react";
import styles from "./Overview.module.scss";
import { TodaysWeatherOverviewType } from "@/types";
import { getVisibilityIndex } from "@/utils/weatherUtils";

const Overview = ({
  humidity,
  snowDepth,
  weatherOverview,
  visibility,
  feelsLikeTempMax,
  feelsLikeTempMin,
}: TodaysWeatherOverviewType) => {
  return (
    <div className={styles.overview}>
      <div className={styles.overview__container}>
        <div className={styles.overview__weatherOverview}>
          <h3 className={styles.overview__title}>Overview</h3>
          <p>{weatherOverview}</p>
        </div>

        <ul className={styles.overview__bottomContents}>
          <li className={styles.overview__feelsLikeTemps}>
            <h3 className={styles.overview__title}>Feels-like temp</h3>
            <div>
              <Thermometer className={styles.overview__icon} />
              <p>
                <span className={styles.overview__numberData}>
                  {feelsLikeTempMax}
                </span>
                ° /{" "}
                <span className={styles.overview__numberData}>
                  {feelsLikeTempMin}
                </span>
                °
              </p>
            </div>
          </li>

          {snowDepth > 0 && (
            <li className={styles.overview__snowDepth}>
              <h3 className={styles.overview__title}>Snow Depth</h3>
              <div>
                <ArrowUpToLine className={styles.overview__icon} />
                <p>
                  <span className={styles.overview__numberData}>
                    {snowDepth}
                  </span>
                  cm
                </p>
              </div>
            </li>
          )}

          <li className={styles.overview__humidity}>
            <h3 className={styles.overview__title}>Humidity</h3>
            <div>
              <Droplet className={styles.overview__icon} />
              <p>
                <span className={styles.overview__numberData}>{humidity}</span>%
              </p>
            </div>
          </li>

          {visibility < 4 && (
            <li className={styles.overview__visibility}>
              <h3 className={styles.overview__title}>Visibility</h3>
              <div>
                <Eye className={styles.overview__icon} />
                <p>
                  <span className={styles.overview__numberData}>
                    {visibility}
                  </span>
                  km
                </p>
              </div>

              <p className={styles.overview__weatherIndex}>
                {getVisibilityIndex(visibility)}
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Overview;
