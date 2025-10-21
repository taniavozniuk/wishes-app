import "./App.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Header } from "./components/Header/Header";
import wishes from "../db.json";
// import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      {/* <Routes> */}
        <Dashboard wishes={wishes.wishes} />
      {/* </Routes> */}
    </>
  );
}

export default App;
