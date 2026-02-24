import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";
import { Login } from "./pages/Login.jsx";

function App() {
  return (
    <>
      <Dashboard />
      <Login />
    </>
  );
}

export default App;
