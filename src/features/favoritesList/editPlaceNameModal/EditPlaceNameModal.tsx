import { useRef } from "react";
import styles from "./EditPlaceNameModal.module.scss";
import { EditPlaceNameModalPropsType } from "@/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapPin } from "lucide-react";
import Button from "@/app/components/elements/button/Button";
import { useUserFavoriteCities } from "@/context/UserFavoriteCitiesContext";

const EditPlaceNameModal: React.FC<EditPlaceNameModalPropsType> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const { placeInfoToEdit, setFavoriteCitiesWithWeather, setPlaceInfoToEdit } =
    useUserFavoriteCities();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isModalOpen) return null;

  const handleUpdatePlaceName = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedCityName = inputRef.current?.value.trim();

    if (!updatedCityName) return;

    try {
      const response = await fetch(
        `/api/user-favorite-cities?id=${placeInfoToEdit?.userFavoriteCityId}`,
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
      setFavoriteCitiesWithWeather((prev) => {
        return prev.map((city) =>
          city.id === placeInfoToEdit?.userFavoriteCityId
            ? { ...city, customName: updatedCityName }
            : city
        );
      });
      setPlaceInfoToEdit(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update city name");
    }
  };

  return (
    <div className={styles.modal__content}>
      <h2>Edit Place Name</h2>
      <form onSubmit={handleUpdatePlaceName}>
        <input
          type="text"
          defaultValue={placeInfoToEdit?.cityName}
          ref={inputRef}
          placeholder="Enter a custom place name"
          required
        />
        <div className={styles.modal__address}>
          <MapPin className={styles.modal__mapPinIcon} />
          <p>{placeInfoToEdit?.cityAddress}</p>
        </div>
        <div className={styles.modal__buttons}>
          <Button
            text="Cancel"
            onClick={() => {
              setPlaceInfoToEdit(null);
              setIsModalOpen(false);
            }}
            type="button"
            className="modalCancel"
          />
          <Button text="Edit" type="submit" className="modalEdit" />
        </div>
      </form>
    </div>
  );
};

export default EditPlaceNameModal;
