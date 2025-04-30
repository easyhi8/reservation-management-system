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
  return dbQuery(sqlInsert, [userName, email, hashedPassword]);
};

// ユーザーを取得する
const getUser = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    const results = await dbQuery(query, [email]); // 修正: db.execute -> dbQuery
    console.log("Results from DB:", results); // デバッグ用
    return results;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

module.exports = {
  addUser,
  getUser,
};
