// Reservation.js

const db = require("../config/database");

// データベースクエリをラップする関数（Promise化）
const dbQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// 新しい予約を追加
const addReservation = (userId, date, time, status = "pending") => {
  const sql = "INSERT INTO reservations (user_id, date, time, status) VALUES (?, ?, ?, ?)";
  return dbQuery(sql, [userId, date, time, status]);
};

// ユーザーの予約を取得
const getReservationsByUserId = (userId) => {
  const sql = "SELECT * FROM reservations WHERE user_id = ?";
  return dbQuery(sql, [userId]);
};

// 全予約を取得（管理者用など）
const getAllReservations = () => {
  const sql = "SELECT * FROM reservations";
  return dbQuery(sql);
};

// 予約を更新（例：ステータス変更）
const updateReservationStatus = (id, status) => {
  const sql = "UPDATE reservations SET status = ? WHERE id = ?";
  return dbQuery(sql, [status, id]);
};

// ID指定で予約を更新
const updateReservationById = (id, date, time, status) => {
  const sql = "UPDATE reservations SET date = ?, time = ?, status = ? WHERE id = ?";
  return dbQuery(sql, [date, time, status, id]);
};

// 予約を削除
const deleteReservation = (id) => {
  const sql = "DELETE FROM reservations WHERE id = ?";
  return dbQuery(sql, [id]);
};

module.exports = {
  addReservation,
  getReservationsByUserId,
  getAllReservations,
  updateReservationStatus,
  updateReservationById,
  deleteReservation,
};
