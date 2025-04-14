// authMiddleware.js

const jwt = require("jsonwebtoken");
require("dotenv").config();

// JWT 認証ミドルウェア
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // "Bearer トークン" の形式でトークンを取得
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンがありません" });
  }

  try {
    // JWT を検証（秘密鍵は .env から）
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // トークンの中身（user.idなど）をリクエストに追加
    next(); // 認証OKなら次の処理へ
  } catch (error) {
    console.error("JWT検証エラー:", error.message); // エラー内容をログに出力
    return res.status(403).json({ message: "トークンが無効です" });
  }
};

module.exports = {
  verifyToken, // 他のミドルウェアも今後ここに追加可能
};
