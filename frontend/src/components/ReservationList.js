// ReservationList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReservationForm from "./ReservationForm";

const ReservationList = ({ token }) => {
  const [reservations, setReservations] = useState([]);
  const [editTarget, setEditTarget] = useState(null);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("/reservations/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data);
    } catch (err) {
      console.error("取得エラー:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("本当に削除しますか？")) return;
    try {
      await axios.delete(`/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReservations();
    } catch (err) {
      console.error("削除エラー:", err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
      <ReservationForm
        token={token}
        onSuccess={() => {
          fetchReservations();
          setEditTarget(null);
        }}
        initialData={editTarget}
      />

      <h3>予約一覧</h3>
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
            {res.date} {res.time} - {res.status}　
            <button onClick={() => setEditTarget(res)}>編集</button>
            <button onClick={() => handleDelete(res.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
