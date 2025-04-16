// AdminPage.js

import React, { useState } from "react";
import ReservationList from "../components/ReservationList";
import ReservationForm from "../components/ReservationForm";

const AdminPage = () => {
  const [showForm, setShowForm] = useState(false); // フォーム表示状態
  const [editData, setEditData] = useState(null);  // 編集対象のデータ
  const token = localStorage.getItem("token");

  const handleCreateClick = () => {
    setEditData(null);      // 新規なので初期データなし
    setShowForm(true);      // フォーム表示
  };

  const handleEditClick = (reservation) => {
    setEditData(reservation); // 編集データをセット
    setShowForm(true);        // フォーム表示
  };

  const handleSuccess = () => {
    setShowForm(false);       // 作成/更新完了後にフォームを非表示
    setEditData(null);
  };

  return (
    <div>
      {!showForm ? (
        <ReservationList
          onAddClick={handleCreateClick}
          onEditClick={handleEditClick}
        />
      ) : (
        <ReservationForm
          token={token}
          initialData={editData}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default AdminPage;
