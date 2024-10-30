import { useRef, useState } from "react";
import styles from "./EditPlaceNameModal.module.scss";
import { EditPlaceNameModalPropsType } from "@/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapPin } from "lucide-react";

const EditPlaceNameModal: React.FC<EditPlaceNameModalPropsType> = ({
  cityName,
  isModalOpen,
  setIsModalOpen,
  setPlaceNameToDisplay,
  userFavoriteCityId,
  cityAddress,
}) => {
  const [editedCityName, setEditedCityName] = useState(cityName);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen) return null;

  const handleUpdatePlaceName = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedCityName = inputRef.current?.value.trim();

    if (!updatedCityName) return;

    try {
      const response = await fetch(
        `/api/user-favorite-cities?id=${userFavoriteCityId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customName: updatedCityName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update city name");
      }

      toast.success(`City name updated to ${updatedCityName}`);
      setPlaceNameToDisplay(updatedCityName);
      setEditedCityName(updatedCityName);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update city name");
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__contentContainer}>
        <div className={styles.modal__content}>
          <h2>Edit Place Name</h2>
          <form onSubmit={handleUpdatePlaceName}>
            <input
              type="text"
              defaultValue={editedCityName}
              ref={inputRef}
              placeholder="Enter a custom place name"
              required
            />
            <div className={styles.modal__address}>
              <MapPin className={styles.modal__mapPinIcon} />
              <p>{cityAddress}</p>
            </div>
            <div className={styles.modal__buttons}>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPlaceNameModal;
