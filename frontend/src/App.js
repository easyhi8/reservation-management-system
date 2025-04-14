// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import Admin from "./pages/AdminPage";
import Register from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />{" "}
        {/* ルートパスにLoginコンポーネントを表示 */}
        <Route path="/custs" element={<Home />} />{" "}
        {/* /custsにHomeコンポーネントを表示 */}
        <Route path="/custs/:id" element={<Admin />} />{" "}
        {/* /custs/:idにAdminコンポーネントを表示 */}
        <Route path="/custs/edit/:id" element={<Register />} />{" "}
        {/* /custs/edit/:idにRegisterコンポーネントを表示 */}
      </Routes>
    </div>
  );
}

export default App;
