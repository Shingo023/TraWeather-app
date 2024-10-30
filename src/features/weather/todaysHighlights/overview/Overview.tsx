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
          <h5>Overview</h5>
          <div>
            <p>{weatherOverview}</p>
          </div>
        </div>

        <div className={styles.overview__feelsLikeTemps}>
          <h5>Feels-like temp</h5>
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
        </div>

        {snowDepth > 0 && (
          <div className={styles.overview__snowDepth}>
            <h5>Snow Depth</h5>
            <div>
              <ArrowUpToLine className={styles.overview__icon} />
              <p>
                <span className={styles.overview__numberData}>{snowDepth}</span>
                cm
              </p>
            </div>
          </div>
        )}

        <div className={styles.overview__humidity}>
          <h5>Humidity</h5>
          <div>
            <Droplet className={styles.overview__icon} />
            <p>
              <span className={styles.overview__numberData}>{humidity}</span>%
            </p>
          </div>
        </div>

        {visibility < 4 && (
          <div className={styles.overview__visibility}>
            <h5>Visibility</h5>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
