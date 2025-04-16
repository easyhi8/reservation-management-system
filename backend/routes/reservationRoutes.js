// reservationRoutes.js

const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { verifyToken } = require("../middleware/authMiddleware"); // 認証ミドルウェア

// ログインユーザーのみ予約を作成可能
router.post("/create", verifyToken, reservationController.createReservation);

// ログインユーザーのみ自分の予約を取得
router.get("/my", verifyToken, reservationController.getMyReservations);

// ログインユーザーのみ自分の予約を修正
router.put("/:id", verifyToken, reservationController.updateReservation);

module.exports = router;
