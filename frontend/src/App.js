// App.js
import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import Admin from "./pages/AdminPage";
import ReservationForm from "./components/ReservationForm";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/" || location.pathname === "/register";
  const isHomePage = location.pathname === "/home";

  return (
    <>
      {!isLoginPage && (
        <nav className="navbar">
          <ul className="nav-list">
            <li onClick={() => navigate("/home")}>ホーム</li>
            <li onClick={() => navigate("/reservations")}>予約一覧</li>
            <li
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              ログアウト
            </li>
          </ul>
        </nav>
      )}

      {/* Homeページだけは枠なし表示 */}
      {isHomePage ? (
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reservations" element={<Admin />} />
            <Route path="/reservations/new" element={<ReservationForm />} />
            <Route path="/reservations/edit/:id" element={<ReservationForm />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
