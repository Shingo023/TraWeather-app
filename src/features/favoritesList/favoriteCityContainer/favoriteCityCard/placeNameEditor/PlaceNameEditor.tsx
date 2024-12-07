"use client";

import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";
import styles from "./PlaceNameEditor.module.scss";
import ToolTip from "@/app/components/elements/toolTip/ToolTip";
import { Pencil } from "lucide-react";

const PlaceNameEditor = ({
  cityName,
  userFavoriteCityId,
  cityAddress,
}: {
  cityName: string;
  userFavoriteCityId: number;
  cityAddress: string;
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
      <div className={styles.cityCard__editIcon}>
        <Pencil width={20} height={20} />
      </div>
      <div className={styles.cityCard__tooltip}>
        <ToolTip message="Edit Place Name" width={130} />
      </div>
    </div>
  );
};

export default PlaceNameEditor;
