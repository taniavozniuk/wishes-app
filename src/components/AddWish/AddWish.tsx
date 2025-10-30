import type React from "react";
import styles from "./AddWish.module.scss";
import Input from "./Input/Input";
import { useEffect, useState } from "react";
import type { Wishes } from "../../types/wishes";
import { useWishes } from "../../context/useWishes";

interface AddWishProps {
  onClick: () => void;
  existingWish?: Wishes | null;
}

export const AddWish: React.FC<AddWishProps> = ({ onClick, existingWish }) => {
  const { addWish, updateWish } = useWishes();

  const [formData, setFormData] = useState({
    title: existingWish?.title || "",
    image: existingWish?.image || "",
    description: existingWish?.description || "",
    price: existingWish?.price?.toString() || "",
  });

  useEffect(() => {
    if (existingWish) {
      setFormData({
        title: existingWish.title,
        image: existingWish.image,
        description: existingWish.description,
        price: existingWish.price.toString(),
      });
    } else {
      setFormData({ title: "", image: "", description: "", price: "" });
    }
  }, [existingWish]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWish: Omit<Wishes, "id"> = {
      title: formData.title,
      image: formData.image,
      description: formData.description,
      price: Number(formData.price) || 0,
      dateAdded: existingWish
        ? existingWish.dateAdded
        : new Date().toISOString().split("T")[0],
    };

    if (existingWish) {
      await updateWish(existingWish.id, newWish);
    } else {
      await addWish(newWish); // тут id не потрібен
      setFormData({ title: "", image: "", description: "", price: "" });
    }

    onClick();
  };

  return (
    <div className={styles["add-conteiner"]}>
      <div className={styles.wrapTB}>
        <h2 className={styles.title}>
          {existingWish ? "Update wish" : "Add new wish"}
        </h2>
        <button onClick={onClick} className={styles.close}>
          &#10006;
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <label className={styles.label}>Title</label>
          <Input
            type="text"
            clearable
            value={formData.title}
            placeholder="Enter title"
            onChange={(e) =>
              setFormData((p) => ({ ...p, title: e.target.value }))
            }
          />
        </div>

        <div className={styles.box}>
          <label className={styles.label}>Image</label>
          <Input
            type="text"
            clearable
            value={formData.image}
            placeholder="Image link"
            onChange={(e) =>
              setFormData((p) => ({ ...p, image: e.target.value }))
            }
          />
        </div>

        <div className={styles.box}>
          <label className={styles.label}>Description</label>
          <Input
            type="text"
            clearable
            value={formData.description}
            placeholder="Enter description"
            onChange={(e) =>
              setFormData((p) => ({ ...p, description: e.target.value }))
            }
          />
        </div>

        <div className={styles.box}>
          <label className={styles.label}>Price</label>
          <Input
            type="number"
            clearable
            value={formData.price}
            placeholder="Enter price"
            onChange={(e) =>
              setFormData((p) => ({ ...p, price: e.target.value }))
            }
          />
        </div>

        <button className={styles.sub}>
          {existingWish ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};
