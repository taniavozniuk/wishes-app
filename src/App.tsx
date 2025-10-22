import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Header } from "./components/Header/Header";
import wishes from "../db.json";
import { useState } from "react";
import type { Filters } from "./types/Filters";
// import { Route, Routes } from "react-router-dom";

function App() {
  const [filters, setFilters] = useState<Filters>({
    date: 'newest',
    price: 'high',
  });

  return (
    <>
      <Header onFilterChange={setFilters} />

      {/* <Routes> */}
      <Dashboard wishes={wishes.wishes} filters={filters} />
      {/* </Routes> */}
    </>
  );
}

export default App;
