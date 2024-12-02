import { X } from "lucide-react";
import styles from "./Modal.module.scss";
import { Dispatch, SetStateAction } from "react";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  content,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  content: React.ReactNode;
}) => {
  if (!isModalOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal__contentContainer}>
        <div
          className={styles.modal__close}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <X />
        </div>
        <div className={styles.modal__content}>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
