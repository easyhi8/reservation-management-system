// RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE_URL = "http://localhost:3001/api";
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!userName || !email || !password) {
      alert("すべての項目を入力してください");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/register`, {
        userName,
        email,
        password,
      });

      alert("登録が成功しました");
      navigate("/"); // 登録成功後にログインページへ遷移
    } catch (error) {
      alert("登録に失敗しました");
      console.error(error);
    }
  };

  return (
    <div className="register">
      <h2>新規登録</h2>
      <div className="textBox">
        <input
          type="text"
          placeholder="ユーザー名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <input
          type="text"
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
          <button onClick={handleRegister}>登録</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
