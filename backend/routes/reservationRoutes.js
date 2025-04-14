// reservationRoutes.js

const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { verifyToken } = require("../middleware/authMiddleware"); // 認証ミドルウェア

// ログインユーザーのみ予約を作成可能
router.post("/create", verifyToken, reservationController.createReservation);

module.exports = router;
