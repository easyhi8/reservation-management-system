// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// HTMLのルート要素を取得し、Reactのルートを作成
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {" "}
    {/* アプリ全体をBrowserRouterで包み、ルーティングを有効にする */}
    <App />
  </BrowserRouter>
);
