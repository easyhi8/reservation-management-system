// LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:3001/api";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("メールアドレスとパスワードを入力してください");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      alert("ログインに成功しました");
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/custs");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("ログインに失敗しました");
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h2>ログイン</h2>
      <div className="textBox">
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
          <button onClick={handleLogin}>ログイン</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
