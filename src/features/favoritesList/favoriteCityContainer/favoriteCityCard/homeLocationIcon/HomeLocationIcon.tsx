import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";
import styles from "./HomeLocationIcon.module.scss";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToolTip from "@/app/components/elements/toolTip/ToolTip";
import { updateHomeLocationApi } from "@/utils/apiHelper";

const HomeLocationIcon = ({
  userId,
  userFavoriteCityId,
  cityName,
}: {
  userId: string | undefined;
  userFavoriteCityId: number;
  cityName: string;
}) => {
  const {
    homeLocationId,
    setHomeLocationId,
    favoriteCitiesData,
    setFavoriteCitiesData,
  } = useUserFavoriteCities();

  const updateHomeLocation = async (newHomeLocationId: number | null) => {
    if (!userId) return;
    try {
      await updateHomeLocationApi(
        {
          currentHomeLocationId: homeLocationId,
          newHomeLocationId,
        },
        userId
      );
      setHomeLocationId(newHomeLocationId);
      toast.success(
        `${cityName} has been successfully set as the home location.`
      );
      setFavoriteCitiesData((prev) =>
        prev.map((city) => {
          if (city.id === homeLocationId) {
            return { ...city, isDefaultCity: false };
          } else if (city.id === newHomeLocationId) {
            return { ...city, isDefaultCity: true };
          } else {
            return city;
          }
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unsetHomeLocation = async () => {
    if (!userId) return;

    try {
      await updateHomeLocationApi(
        {
          currentHomeLocationId: homeLocationId,
        },
        userId
      );
      setHomeLocationId(null);
      toast.success(`${cityName} has been unset as the home location.`);
      setFavoriteCitiesData((prev) =>
        prev.map((city) => {
          if (city.id === homeLocationId) {
            return { ...city, isDefaultCity: false };
          } else {
            return city;
          }
        })
      );
      console.log(favoriteCitiesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIconClick = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (userFavoriteCityId === homeLocationId) {
      unsetHomeLocation();
    } else {
      updateHomeLocation(userFavoriteCityId);
    }
  };

  return (
    <div className={styles.cityCard__homeIconContainer}>
      <MapPinIcon
        className={`${styles.cityCard__homeIcon} ${
          userFavoriteCityId === homeLocationId ? styles.homeIconActive : ""
        }`}
        onClick={handleIconClick}
      />
      <div className={styles.cityCard__tooltip}>
        <ToolTip
          message={
            userFavoriteCityId === homeLocationId
              ? "Unset home location"
              : "Set as home location"
          }
          width={110}
        />
      </div>
    </div>
  );
};

export default HomeLocationIcon;
