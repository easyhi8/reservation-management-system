// ReservationForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";
import "react-calendar/dist/Calendar.css";
import "react-time-picker/dist/TimePicker.css";

const ReservationForm = ({ token, onSuccess, initialData = null }) => {
  const [date, setDate] = useState(initialData?.date ? new Date(initialData.date) : new Date());
  const [time, setTime] = useState(initialData?.time || "10:00");
  const [status, setStatus] = useState(initialData?.status || "pending");

  const isEdit = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

      if (isEdit) {
        await axios.put(`/reservations/${initialData.id}`, { date: formattedDate, time, status }, config);
      } else {
        await axios.post("/reservations/create", { date: formattedDate, time, status }, config);
      }

      onSuccess(); // 親へ通知
      setDate(new Date());
      setTime("10:00");
      setStatus("pending");
    } catch (err) {
      console.error("送信エラー:", err);
      alert("エラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h2>{isEdit ? "予約を編集" : "予約を作成する"}</h2>

      <div className="form-group">
        <label>日付</label>
        <Calendar value={date} onChange={setDate} minDate={new Date()} />
      </div>

      <div className="form-group">
        <label>時間</label>
        <TimePicker
          onChange={setTime}
          value={time}
          disableClock
          format="HH:mm"
          clearIcon={null}
        />
      </div>

      <div className="form-group">
        <label>ステータス</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">未確認</option>
          <option value="confirmed">確認済み</option>
          <option value="cancelled">キャンセル</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        {isEdit ? "更新" : "予約を作成"}
      </button>
    </form>
  );
};

export default ReservationForm;
