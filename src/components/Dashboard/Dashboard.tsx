import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Wishes } from "../../types/wishes";
import styles from "./Dashboard.module.scss";
import type { Filters } from "../../types/Filters";
interface WhisesProps {
  wishes: Wishes[];
  filters: Filters;
}

const ITEMS_PER_PAGE = 4;

export const Dashboard: React.FC<WhisesProps> = ({ wishes, filters }) => {
  const [wishesData, setWishesData] = useState<Wishes[]>(wishes);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") || "1");
  const [currentPage, setCurrentPage] = useState(pageParam);

  const totalPages = Math.ceil(wishes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentWishes = wishesData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setWishesData(wishes);
  }, [wishes]);

  useEffect(() => {
    const sortBy = "dateAdded";
    const dateOrder = filters.date === "newest" ? "desc" : "asc";

    fetch(`http://localhost:3001/wishes?_sort=${sortBy}&_order=${dateOrder}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) =>
          filters.price === "high" ? b.price - a.price : a.price - b.price
        );
        setWishesData(sorted);
      })
      .catch((err) => console.error(err));
  }, [filters]);

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      date: filters.date,
      price: filters.price,
    });
  }, [currentPage, setSearchParams, filters]);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <>
      <div className={styles["whishes-list"]}>
        {currentWishes.map((item) => (
          <>
            <div className={styles["card-wish"]} key={item.id}>
              <h2 className={styles.title}>{item.title}</h2>
              <img src={item.image} alt={item.title} className={styles.image} />
              <p className={styles.description}>{item.description}</p>
              <p className={styles.price}>Price: {item.price} $</p>
              <div className={styles.Btwrap}>
                <button className={styles.delete}>Delete</button>
                <button className={styles.update}>Update</button>
                <button className={styles.details}>Details</button>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={handlePrev}
          className={styles.prev}
        >
          &lsaquo;
        </button>
        <span className={styles.page}>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNext}
          className={styles.next}
        >
          &rsaquo;
        </button>
      </div>
    </>
  );
};
