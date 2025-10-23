import type React from "react";
import styles from "./DeleteWish.module.scss";

interface DeleteProps {
  onClick: () => void;
  handleDelete: () => void;
}

export const DeleteWish: React.FC<DeleteProps> = ({
  onClick,
  handleDelete,
}) => {
  return (
    <div className={styles["delete-conteiner"]}>
      <div className={styles.wrapTB}>
        <h2 className={styles.title}>Delete</h2>
        <button onClick={onClick} className={styles.close}>
          &#10006;
        </button>
      </div>
      <p className={styles.sure}>
        Are you sure you want to remove this wish from your list?
      </p>
      <div className={styles.BT}>
        <button onClick={handleDelete}>Delete</button>
        <button>Cancel</button>
      </div>
    </div>
  );
};
