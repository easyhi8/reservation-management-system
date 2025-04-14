// authController.js
const bcrypt = require("bcrypt"); // パスワードハッシュ化のためのライブラリをインポート
const jwt = require("jsonwebtoken"); // JWT生成のためのライブラリをインポート
const { addUser, getUser } = require("../models/User");
require("dotenv").config(); // 環境変数を読み込む

// 新しいユーザーを追加する
const insertUser = async (req, res) => {
  const { userName, email, password } = req.body; // リクエストボディからユーザー名とパスワードを取得
  if (!userName || !email || !password) {
    return res.status(400).send("ユーザー名とパスワードを入力してください"); // ユーザー名またはパスワードがない場合はエラーメッセージ
  }

  try {
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
      await addUser(userName, email, hashedPassword);
      return res.status(201).send("ユーザーが正常に追加されました");
  } catch (error) {
    console.error(error);
    return res.status(500).send("パスワードのハッシュエラー");
  }
};

// ログイン処理
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("ユーザー名とパスワードを入力してください");
  }

  try {
    // ユーザー名に基づいてユーザーをデータベースから取得
    const results = await getUser(email);
    if (results.length === 0) {
      return res.status(401).send("ユーザー名またはパスワードが間違っています"); // ユーザーが存在しない場合のエラーメッセージ
    }

    const user = results[0]; // ユーザー情報を取得
    const match = await bcrypt.compare(password, user.password); // パスワードを比較

    if (!match) {
      return res.status(401).send("ユーザー名またはパスワードが間違っています"); // パスワードが一致しない場合のエラーメッセージ
    }

    // JWTを生成し、ユーザーIDをペイロードに含める
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "ログイン成功", token }); // 成功メッセージとトークンを返す
  } catch (error) {
    console.error(error);
    return res.status(500).send("ログインに失敗しました");
  }
};

module.exports = { insertUser, loginUser };
