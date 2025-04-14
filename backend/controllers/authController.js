// authController.js
const bcrypt = require("bcrypt"); // パスワードハッシュ化のためのライブラリをインポート
const jwt = require("jsonwebtoken"); // JWT生成のためのライブラリをインポート
const nodemailer = require("nodemailer"); // メール送信用ライブラリ
const { addUser, getUser } = require("../models/User"); // DB操作用
require("dotenv").config(); // 環境変数を読み込む

// 新しいユーザーを追加する
const insertUser = async (req, res) => {
  const { userName, email, password } = req.body; // リクエストボディからユーザー名・メール・パスワードを取得
  if (!userName || !email || !password) {
    return res.status(400).send("ユーザー名とパスワードを入力してください"); // 必須項目がない場合
  }

  try {
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);
    // データベースにユーザーを追加
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
    // メールアドレスに基づいてユーザーを取得
    const results = await getUser(email);
    if (results.length === 0) {
      return res.status(401).send("ユーザー名またはパスワードが間違っています"); // ユーザーが存在しない
    }

    const user = results[0]; // ユーザー情報を取得
    const match = await bcrypt.compare(password, user.password); // パスワードを比較

    if (!match) {
      return res.status(401).send("ユーザー名またはパスワードが間違っています"); // パスワード不一致
    }

    // JWTを生成し、ユーザーIDをペイロードに含める
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // 有効期限：1時間
    });

    res.json({ message: "ログイン成功", token }); // トークンを返す
  } catch (error) {
    console.error(error);
    return res.status(500).send("ログインに失敗しました");
  }
};

// パスワードリセットリクエスト処理（リセットリンクをメールで送信）
const requestPasswordReset = async (req, res) => {
  const { email } = req.body; // リクエストからメールアドレスを取得

  try {
    // メールアドレスからユーザー情報を取得
    const users = await getUser(email);
    if (users.length === 0) {
      return res.status(404).json({ message: "ユーザーが見つかりませんでした" }); // 該当なし
    }

    const user = users[0];

    // リセット用JWTトークンを生成（有効期限15分）
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // パスワードリセットリンク（フロントエンド側で処理するパス）
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // メール送信用の設定（Gmail使用）
    const transporter = nodemailer.createTransport({
      service: "gmail", // 他のメールサービスを使う場合はここを変更
      auth: {
        user: process.env.EMAIL_USER, // 環境変数に保存したメールアドレス
        pass: process.env.EMAIL_PASS, // アプリパスワード（Gmailの場合）
      },
    });

    // メール本文の設定
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "【予約管理システム】パスワードリセットのご案内",
      text: `以下のリンクからパスワードをリセットしてください（15分以内）:\n\n${resetLink}`,
    };

    // メールを送信
    await transporter.sendMail(mailOptions);

    return res.json({ message: "パスワードリセットリンクを送信しました" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "メール送信に失敗しました" });
  }
};

// モジュールとしてエクスポート
module.exports = {
  insertUser,
  loginUser,
  requestPasswordReset,
};

