import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Header } from "./components/Header/Header";
import { useState } from "react";
import type { Filters } from "./types/Filters";
import { AddWish } from "./components/AddWish/AddWish";
import { DeleteWish } from "./components/DeleteWish/DeleteWish";
import type { Wishes } from "./types/wishes";
import { useWishes } from "./context/useWishes";

function App() {
  const { wishes, deleteWish } = useWishes();
  const [selectedWishId, setSelectedWishId] = useState<number | null>(null);
  const [editWish, setEditWish] = useState<Wishes | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    date: "newest",
    price: "high",
  });

  const handleDeleteClick = (id: number) => {
    setSelectedWishId(id);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedWishId !== null) {
      await deleteWish(selectedWishId);
      setOpenDelete(false);
      setSelectedWishId(null);
    }
  };

  return (
    <>
      <Header onFilterChange={setFilters} setOpenAdd={() => setOpenAdd(true)} />

      <Dashboard
        wishes={wishes}
        filters={filters}
        onDeleteClick={handleDeleteClick}
        onUpdateClick={(wish) => {
          setEditWish(wish);
          setOpenAdd(true);
        }}
      />

      {openAdd && (
        <div className="add-modal">
          <AddWish
            onClick={() => {
              setOpenAdd(false);
              setEditWish(null);
            }}
            existingWish={editWish}
          />
        </div>
      )}

      {openDelete && selectedWishId !== null && (
        <div className="delete-modal">
          <DeleteWish
            onClick={() => setOpenDelete(false)}
            handleDelete={handleConfirmDelete}
          />
        </div>
      )}
    </>
  );
}

export default App;
