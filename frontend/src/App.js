// App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import Admin from "./pages/AdminPage";
import ReservationForm from "./components/ReservationForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservations" element={<Admin />} />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route path="/reservations/edit/:id" element={<ReservationForm />} />
      </Routes>
    </div>
  );
}

export default App;
