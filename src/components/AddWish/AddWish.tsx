import type React from "react";
import styles from "./AddWish.module.scss";
import Input from "./Input/Input";
import { useEffect, useState } from "react";
import type { WishData } from "../../types/WishData";
import { wishPost, wishPut } from "../api/api";
import type { Wishes } from "../../types/wishes";

interface AddWishProps {
  onClick: () => void;
  handleWishAdded: () => void;
  existingWish?: Wishes | null;
}

export const AddWish: React.FC<AddWishProps> = ({
  onClick,
  handleWishAdded,
  existingWish,
}) => {
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
      setFormData({
        title: "",
        image: "",
        description: "",
        price: "",
      });
    }
  }, [existingWish]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWish: WishData = {
      title: formData.title,
      image: formData.image,
      description: formData.description,
      price: Number(formData.price),
      dateAdded: existingWish
        ? existingWish.dateAdded
        : new Date().toISOString().split("T")[0],
    };

    try {
      if (existingWish) {
        await wishPut(existingWish.id, newWish);
        console.log("Wish updated!");
      } else {
        await wishPost(newWish);
        console.log("Wish added!");
      }
      handleWishAdded();
    } catch (err) {
      console.error("Error saving wish:", err);
      alert("Error saving wish");
    }
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
            className={styles.input}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>

        <div className={styles.box}>
          <label className={styles.label}>Image</label>
          <Input
            type="text"
            clearable
            value={formData.image}
            placeholder="Please insert a link to the image."
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
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
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
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
              setFormData((prev) => ({ ...prev, price: e.target.value }))
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
