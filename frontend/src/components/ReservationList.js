// ReservationList.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const ReservationList = ({ onAddClick, onEditClick }) => {
  const [reservations, setReservations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(response.data);
    } catch (err) {
      console.error("予約の取得に失敗:", err);
    }
  };

  return (
    <div>
      <h2>予約一覧</h2>
      <button onClick={onAddClick}>＋ 新規予約</button>

      <table>
        <thead>
          <tr>
            <th>日付</th>
            <th>時間</th>
            <th>ステータス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.date}</td>
              <td>{res.time}</td>
              <td>{res.status}</td>
              <td>
                <button onClick={() => onEditClick(res)}>編集</button>
                <button>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
