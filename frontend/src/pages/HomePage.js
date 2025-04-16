// HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToReservations = () => {
    navigate("/reservations");
  };

  return (
    <div>
      <h2>ようこそ、予約管理システムへ</h2>
      <h3>ここで簡単に予約管理できます。</h3>
      <button onClick={goToReservations}>
        予約一覧を見る
      </button>
    </div>
  );
};

export default HomePage;
