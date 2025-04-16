// reservationController.js

const { addReservation, getReservationsByUserId } = require("../models/Reservation");

// 予約作成処理
const createReservation = async (req, res) => {
  const { date, time, status } = req.body;
  const userId = req.user.id; // verifyToken で埋め込んだ JWT のユーザーID

  if (!date || !time) {
    return res.status(400).json({ message: "日付と時間を入力してください" });
  }

  try {
    await addReservation(userId, date, time, status || "pending");
    res.status(201).json({ message: "予約が正常に作成されました" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "予約作成に失敗しました" });
  }
};

// 自分の予約一覧を取得
const getMyReservations = async (req, res) => {
  const userId = req.user.id; // JWT から取得したユーザーID

  try {
    const reservations = await getReservationsByUserId(userId);
    res.status(200).json(reservations);
  } catch (error) {
    console.error("予約一覧取得エラー:", error.message);
    res.status(500).json({ message: "予約の取得に失敗しました" });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
};
