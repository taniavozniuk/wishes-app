import type React from "react";
import styles from "./AddWish.module.scss";
import Input from "./Input/Input";
import { useState } from "react";
import type { WishData } from "../../types/WishData";
import { wishPost } from "../api/api";

interface AddWishProps {
  onClick: () => void;
  handleWishAdded: () => void;
}

export const AddWish: React.FC<AddWishProps> = ({ onClick, handleWishAdded }) => {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    image: "",
    description: "",
    price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWish: WishData = {
      id: formData.id,
      title: formData.title,
      image: formData.image,
      description: formData.description,
      price: Number(formData.price),
      dateAdded: new Date().toISOString().split("T")[0],
    };

    try {
      await wishPost(newWish);
      console.log("Wish successfully added!");
      handleWishAdded();
    } catch (err) {
      console.error("Error adding wish:", err);
      alert("Error adding wish");
    }
  };

  return (
    <div className={styles["add-conteiner"]}>
      <div className={styles.wrapTB}>
        <h2 className={styles.title}>Add new wish</h2>
        <button onClick={onClick} className={styles.close}>
          &#10006;
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <Input
            type="text"
            clearable
            placeholder="Enter title"
            className={styles.input}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className={styles.box}>
          <label className={styles.label} htmlFor="title">
            Image
          </label>
          <Input
            type="text"
            clearable
            placeholder="Please insert a link to the image."
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
          />
        </div>
        <div className={styles.box}>
          <label className={styles.label} htmlFor="title">
            Description
          </label>
          <Input
            type="text"
            clearable
            placeholder="Enter des"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div className={styles.box}>
          <label className={styles.label} htmlFor="title">
            Price
          </label>
          <Input
            type="number"
            clearable
            placeholder="Enter des"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};
