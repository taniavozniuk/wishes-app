import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Header } from "./components/Header/Header";
import { useEffect, useState } from "react";
import type { Filters } from "./types/Filters";
import type { Wishes } from "./types/wishes";
import { wishDelete, wishGet } from "./components/api/api";
import { AddWish } from "./components/AddWish/AddWish";
import { DeleteWish } from "./components/DeleteWish/DeleteWish";
// import { Route, Routes } from "react-router-dom";

function App() {
  const [wishes, setWishes] = useState<Wishes[]>([]);
  const [selectedWishId, setSelectedWishId] = useState<number | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
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
    fetchWishes();
  }, []);
  

  const handleWishAdded = () => {
    fetchWishes();
    setOpenAdd(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await wishDelete(id);
      await fetchWishes()
      setWishes((prev) => prev.filter((w) => w.id !== id));
      setOpenDelete(false)
    } catch (err) {
      console.log("delete err", err);
    }
  };

  const handleDeleteClick = (id: number) => {
    setSelectedWishId(id);
    setOpenDelete(true);
  };

  return (
    <>
      <Header onFilterChange={setFilters} setOpenAdd={() => setOpenAdd(true)} />

      {/* <Routes> */}
      <Dashboard
        wishes={wishes}
        filters={filters}
        onDeleteClick={handleDeleteClick}
      />
      {/* </Routes> */}

      {openAdd && (
        <div className="add-modal">
          <AddWish
            onClick={() => setOpenAdd(false)}
            handleWishAdded={handleWishAdded}
          />
        </div>
      )}

      {openDelete && selectedWishId !== null &&(
        <div className="delete-modal">
          <DeleteWish
            onClick={() => setOpenDelete(false)}
            handleDelete={() => handleDelete(selectedWishId)}
          />
        </div>
      )}
    </>
  );
}

export default App;
