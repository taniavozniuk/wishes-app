import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import type { Filters } from "./types/Filters";
import type { Wishes } from "./types/wishes";
import { wishGet } from "./components/api/api";
import { AddWish } from "./components/AddWish/AddWish";
// import { Route, Routes } from "react-router-dom";

function App() {
  const [wishes, setWishes] = useState<Wishes[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    date: "newest",
    price: "high",
  });

  const fetchWishes = async () => {
    try {
      const data = await wishGet();
      setWishes(data);
    } catch (err) {
      console.log("Eror fetch wishes", err);
    }
  };

  useEffect(() => {
    fetchWishes()
  }, []);

  const handleWishAdded = () => {
    fetchWishes();
    setOpenAdd(false);
  }

  return (
    <>
      <Header onFilterChange={setFilters} setOpenAdd={() => setOpenAdd(true)} />

      {/* <Routes> */}
      <Dashboard wishes={wishes} filters={filters} />
      {/* </Routes> */}

      {openAdd && (
        <div className="add-modal">
          <AddWish onClick={() => setOpenAdd(false)} handleWishAdded={handleWishAdded} />
        </div>
      )}
    </>
  );
}

export default App;
