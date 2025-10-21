import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Wishes } from "../../types/wishes";
import styles from "./Dashboard.module.scss";

interface WhisesProps {
  wishes: Wishes[];
}

const ITEMS_PER_PAGE = 4;

export const Dashboard: React.FC<WhisesProps> = ({ wishes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1"); // беремо сторінку з URL
  const [currentPage, setCurrentPage] = useState(pageParam);

  const totalPages = Math.ceil(wishes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentWishes = wishes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // синхронізація state з URL
  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <>
      <div className={styles["whishes-list"]}>
        {currentWishes.map((item) => (
          <div className={styles["card-wish"]} key={item.id}>
            <h2 className={styles.title}>{item.title}</h2>
            <img src={item.image} alt={item.title} className={styles.image} />
            <p className={styles.description}>{item.description}</p>
            <p className={styles.price}>Price: {item.price} $</p>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button disabled={currentPage === 1} onClick={handlePrev}>
          Prev
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};
