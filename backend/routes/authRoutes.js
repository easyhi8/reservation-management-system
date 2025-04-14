// authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// ユーザー登録用のエンドポイントを定義
router.post("/register", authController.insertUser);

// ログイン用のエンドポイントを定義
router.post("/login", authController.loginUser);

module.exports = router;
