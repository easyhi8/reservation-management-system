// reservationController.js

const { addReservation } = require("../models/Reservation");

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

module.exports = {
  createReservation,
};
