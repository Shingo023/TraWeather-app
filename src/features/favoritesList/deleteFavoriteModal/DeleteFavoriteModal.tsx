import { TrashIcon } from "@heroicons/react/24/solid";
import styles from "./DeleteFavoriteModal.module.scss";
import Button from "@/app/components/elements/button/Button";
import { Dispatch, SetStateAction } from "react";

const DeleteFavoriteModal = ({
  cityName,
  setIsModalOpen,
}: {
  cityName: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const deleteFavorite = () => {};

  return (
    <div className={styles.deleteModal}>
      <div className={styles.deleteModal__trashIcon}>
        <TrashIcon width={40} height={40} color="#999" />
      </div>
      <div className={styles.deleteModal__message}>
        Are you sure you want to delete <span>{cityName}</span> from your
        favorites list?
      </div>
      <div className={styles.deleteModal__buttons}>
        <Button
          className="modalCancel"
          text="Cancel"
          type="button"
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
        <Button
          className="modalDelete"
          text="Delete"
          type="button"
          onClick={deleteFavorite}
        />
      </div>
    </div>
  );
};

export default DeleteFavoriteModal;
