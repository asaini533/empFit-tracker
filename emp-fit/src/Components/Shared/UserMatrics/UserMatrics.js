import React from "react";
import { AiFillFire } from "react-icons/ai";
import { FaHeartbeat } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";

import "./UserMatrics.css";

const UserMatrics = (props) => {
  return (
    <div className="userMatrics__container">
      {props.data.label === "Step Counts" && (
        <IoFootstepsSharp className="userMatrics__icon-step" />
      )}

      {props.data.label === "Heart Points" && (
        <FaHeartbeat className="userMatrics__icon-heart" />
      )}

      {props.data.label === "Calories Burnt" && (
        <AiFillFire className="userMatrics__icon-calory" />
      )}

      <p className="userMatrics__title">{props.data.label}</p>
      <p className="userMatrics__data">
        {props.data.value} <span>{props.data.unit}</span>
      </p>
    </div>
  );
};

export default UserMatrics;
