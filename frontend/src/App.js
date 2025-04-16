// App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import Admin from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reservations" element={<AdminPage />} />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route path="/reservations/edit/:id" element={<ReservationForm />} />
      </Routes>
    </div>
  );
}

export default App;
