// ReservationForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationForm = ({ token, onSuccess, initialData = null }) => {
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [status, setStatus] = useState(initialData?.status || "pending");

  const isEdit = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (isEdit) {
        // 編集
        await axios.put(`/reservations/${initialData.id}`, { date, time, status }, config);
      } else {
        // 新規作成
        await axios.post("/reservations/create", { date, time, status }, config);
      }

      onSuccess(); // 親に通知
      setDate("");
      setTime("");
      setStatus("pending");
    } catch (err) {
      console.error("送信エラー:", err);
      alert("エラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEdit ? "予約を編集" : "予約を作成する"}</h3>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">未確認</option>
        <option value="confirmed">確認済み</option>
        <option value="cancelled">キャンセル</option>
      </select>
      <button type="submit">{isEdit ? "更新" : "予約を作成"}</button>
    </form>
  );
};

export default ReservationForm;
