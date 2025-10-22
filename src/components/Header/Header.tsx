import React, { useState } from "react";
import "./Header.scss";
import { Filter } from "../Filter/Filter";
import type { Filters } from "../../types/Filters";

interface HeaderProps {
  onFilterChange: (filters: Filters) => void;
}

export const Header: React.FC<HeaderProps> = ({ onFilterChange }) => {
  const [openFilte, setOpenFilte] = useState(false);
  return (
    <div className="header">
      <div className="BtWrap">
        <button className="filer" onClick={() => setOpenFilte(true)}>
          Filter
        </button>
        {openFilte && (
          <div className="filter-madal">
            <Filter
              onClick={() => setOpenFilte(false)}
              onFilterChange={(filters) => {
                onFilterChange(filters);
                setOpenFilte(false);
              }}
            />
          </div>
        )}
        <button className="add">Add</button>
      </div>
    </div>
  );
};
