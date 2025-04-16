// RegisterList.js
import React from "react";

const RegisterList = ({ reservations, onEdit, onDelete }) => {
  return (
    <div>
      <h2>予約一覧</h2>
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
          {reservations && reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>{reservation.status}</td>
                <td>
                  <button onClick={() => onEdit(reservation.id)}>編集</button>{" "}
                  <button onClick={() => onDelete(reservation.id)}>削除</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                予約がありません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterList;
