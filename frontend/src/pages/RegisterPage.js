// RegisterPage.js
import React from "react";
import { useParams } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";

const RegisterPage = () => {
  const { id } = useParams(); // URLから予約ID取得

  return (
    <div>
      <h2>{id ? "予約の編集" : "新規予約"}</h2>
      <ReservationForm reservationId={id} />
    </div>
  );
};

export default RegisterPage;
