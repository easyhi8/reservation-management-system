const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // "Bearer トークン" 形式を想定
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "トークンがありません" });
  }

  try {
    // JWTを検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ユーザー情報をreqに付加（次のミドルウェアやルートで使えるように）
    next();
  } catch (error) {
    console.error("JWT検証エラー:", error.message);
    return res.status(403).json({ message: "トークンが無効です" });
  }
};

module.exports = verifyToken;
