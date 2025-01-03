"use client";

import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";
import styles from "./PlaceNameEditor.module.scss";
import ToolTip from "@/app/components/elements/toolTip/ToolTip";
import { Pencil } from "lucide-react";

const PlaceNameEditor = ({
  cityName,
  userFavoriteCityId,
  cityAddress,
  isNight,
}: {
  cityName: string;
  userFavoriteCityId: number;
  cityAddress: string;
  isNight: boolean;
}) => {
  const { setPlaceInfoToEdit, setIsEditModalOpen } = useUserFavoriteCities();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const placeInfoToEdit = {
      cityName,
      userFavoriteCityId,
      cityAddress,
    };
    setPlaceInfoToEdit(placeInfoToEdit);
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.cityCard__editIconContainer} onClick={handleClick}>
      <div
        className={`${styles.cityCard__editIcon} ${
          isNight ? styles.nightMode : ""
        }`}
      >
        <Pencil width={20} height={20} />
      </div>
      <div className={styles.cityCard__tooltip}>
        <ToolTip message="Edit Place Name" />
      </div>
    </div>
  );
};

export default PlaceNameEditor;
