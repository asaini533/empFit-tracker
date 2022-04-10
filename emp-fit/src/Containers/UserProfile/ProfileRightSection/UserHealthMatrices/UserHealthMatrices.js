import React from "react";

import "./UserHealthMatrices.css";
import UserMatrics from "../../../../Components/Shared/UserMatrics/UserMatrics";

const UserHealthMatrices = (props) => {
  const data = [
    { label: "Step Counts", value: props.stepCounts, unit: "steps" },
    { label: "Heart Points", value: props.heartpoints, unit: "points" },
    { label: "Calories Burnt", value: props.caloriesBurnt, unit: "kcal" },
  ];
  return (
    <div className="userHealthMatrices__container">
      {data.map((matrice, index) => (
        <UserMatrics key={index} data={matrice} />
      ))}
    </div>
  );
};

export default UserHealthMatrices;
