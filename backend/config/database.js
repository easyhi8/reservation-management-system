// database.js
const mysql = require("mysql2");
require("dotenv").config(); // 環境変数を読み込む

console.log("DB Host:", process.env.DB_HOST); // 環境変数の確認
console.log("DB User:", process.env.DB_USER);
console.log("DB Name:", process.env.DB_NAME);

// MySQLデータベースへの接続プールを作成
const db = mysql.createPool({
  host: process.env.DB_HOST, // データベースサーバーのホスト名
  user: process.env.DB_USER, // データベースに接続するためのユーザー名
  password: process.env.DB_PASSWORD, // データベースユーザーのパスワード
  database: process.env.DB_NAME, // 接続するデータベース名
});

module.exports = db;
