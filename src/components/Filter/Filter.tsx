import type React from "react";
import styles from "./Filter.module.scss";
import type { Filters } from "../../types/Filters";
import { useState } from "react";

interface FilterProps {
  onClick: () => void;
  onFilterChange: (filters: Filters) => void;
}

export const Filter: React.FC<FilterProps> = ({ onClick, onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    date: "newest",
    price: "high",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onFilterChange(filters);
    onClick();
  };
  return (
    <div className={styles["filter-conteiner"]}>
      <div className={styles.wrapTB}>
        <h2 className={styles.title}>Filter</h2>
        <button onClick={onClick} className={styles.close}>
          &#10006;
        </button>
      </div>
      <div className={styles.filters}>
        <label>
          Date:
          <select name="date" value={filters.date} onChange={handleChange}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>

        <label>
          Price:
          <select name="price" value={filters.price} onChange={handleChange}>
            <option value="high">Price high to low</option>
            <option value="low">Price low to high</option>
          </select>
        </label>
      </div>

      <div className={styles.actions}>
        <button onClick={handleApply} className={styles.apply}>
          Apply
        </button>
      </div>
    </div>
  );
};
