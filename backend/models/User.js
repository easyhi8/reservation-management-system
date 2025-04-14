//User.js
const db = require("../config/database");

// データベースクエリをラップする関数
const dbQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// 新しいユーザーを追加する
const addUser = (userName, email, hashedPassword) => {
  const sqlInsert = "INSERT INTO users (userName, email, password) VALUES (?, ?, ?)";
  return dbQuery(sqlInsert, [userName, hashedPassword]);
};

// ユーザーを取得する
const getUser = (userName) => {
  const sqlSelect = "SELECT * FROM users WHERE userName = ?";
  return dbQuery(sqlSelect, [userName]);
};

module.exports = {
  addUser,
  getUser,
};
