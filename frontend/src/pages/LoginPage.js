// LoginPage.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false); // フォーム切り替え用
  const [userName, setUserName] = useState(""); // 登録用
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:3001/api";

  const handleAuth = async () => {
    if (!email || !password || (isRegister && !userName)) {
      alert("必要な情報をすべて入力してください");
      return;
    }

    const endpoint = isRegister ? "register" : "login";

    try {
      const payload = isRegister
        ? { userName, email, password }
        : { email, password };
      
        console.log("Sending payload:", payload); // リクエスト内容を確認

      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, payload);

      alert(isRegister ? "登録が成功しました" : "ログインに成功しました");

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Token saved to localStorage:", token); // トークンが保存されているか確認
        navigate("/home");
      }

      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(isRegister ? "登録に失敗しました" : "ログインに失敗しました");
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login">
      <h2>{isRegister ? "アカウント登録" : "ログイン"}</h2>
      <div className="textBox">
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="ユーザー名"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
          </>
        )}
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="buttonContainer">
          <button onClick={handleAuth}>
            {isRegister ? "登録" : "ログイン"}
          </button>
        </div>
      </div>
      <p>
        {isRegister ? (
          <>
            すでにアカウントをお持ちですか？
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsRegister(false)} // 登録フォームからログインフォームに切り替え
            >
              ログイン
            </span>
          </>
        ) : (
          <>
            アカウントをお持ちでないですか？
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsRegister(true)} // ログインフォームから登録フォームに切り替え
            >
              登録
            </span>
          </>
        )}
      </p>
    </div>
  );
};

export default LoginPage;
