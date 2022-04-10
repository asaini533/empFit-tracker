import React from "react";
import { AiFillFire } from "react-icons/ai";
import { FaHeartbeat } from "react-icons/fa";
import { IoFootstepsSharp } from "react-icons/io5";

import "./Tips.css";

const Tips = () => {
  return (
    <div className="tips__container">
      <p className="tips__heading">
        A healthy lifestyle will improve your productivity.
      </p>
      <div className="tips__body">
        <p className="tips__body-text">
          <span className="tips__body-text__fireIcon">
            <AiFillFire />
          </span>{" "}
          For general fitness, most adults should aim for 10,000 steps per day.
        </p>
        <p className="tips__body-text">
          <span className="tips__body-text__heartIcon">
            <FaHeartbeat />
          </span>
          Scoring 150 heart points a week can help you live longer.
        </p>
        <p className="tips__body-text">
          <span className="tips__body-text__stepIcon">
            <IoFootstepsSharp />
          </span>
          30 minutes a day of activity is good for overall health.
        </p>
      </div>
    </div>
  );
};

export default Tips;
