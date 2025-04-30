// server.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const reservationRoutes = require("./routes/reservationRoutes");

// アプリケーションにJSONボディパーサーを追加
app.use(bodyParser.json());
// apiパスにタスク関連のルートを使用
app.use("/api", reservationRoutes);

// 環境変数からポート番号を取得。指定がなければ3001を使用
const PORT = process.env.PORT || 3001;

// 指定したポートでサーバーをリッスンし、起動メッセージをコンソールに表示
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
