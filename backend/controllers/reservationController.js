// reservationController.js

const {
  addReservation,
  getReservationsByUserId,
  updateReservationById,
  deleteReservation
} = require("../models/Reservation");

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

// 予約を編集
const updateReservation = async (req, res) => {
  const reservationId = req.params.id;
  const userId = req.user.id; // JWTで取得
  const { date, time, status } = req.body;

  try {
    // 自分の予約かどうか確認
    const reservations = await getReservationsByUserId(userId);
    const target = reservations.find((r) => r.id == reservationId);

    if (!target) {
      return res.status(403).json({ message: "この予約は編集できません" });
    }

    await updateReservationById(reservationId, date, time, status);
    res.status(200).json({ message: "予約が更新されました" });
  } catch (error) {
    console.error("予約更新エラー:", error.message);
    res.status(500).json({ message: "予約の更新に失敗しました" });
  }
};

// 予約を削除
const deleteMyReservation = async (req, res) => {
  const reservationId = req.params.id;
  const userId = req.user.id;

  try {
    // 自分の予約か確認
    const myReservations = await getReservationsByUserId(userId);
    const target = myReservations.find((r) => r.id == reservationId);

    if (!target) {
      return res.status(403).json({ message: "この予約は削除できません" });
    }

    await deleteReservation(reservationId);
    res.status(200).json({ message: "予約が削除されました" });
  } catch (error) {
    console.error("予約削除エラー:", error.message);
    res.status(500).json({ message: "予約の削除に失敗しました" });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  updateReservation,
  deleteMyReservation
};
