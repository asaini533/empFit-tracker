import { Avatar } from "@mui/material";
import React from "react";
import { GiTrophyCup } from "react-icons/gi";

import "./HighlightedUser.css";

const HighlightedUser = (props) => {
  return (
    <div className="highlightedUser__container">
      <GiTrophyCup className="highlightedUser__trophy" />
      <Avatar src="https://www.odework.com/static/media/avtar.5aaee58f5fe514599381.jpg" />
      <div className="highlightedUser__details">
        <p className="highlightedUser__details-name">Ankit Saini</p>
        <p className="highlightedUser__details-score">
          <span>Score: </span>2245
        </p>
      </div>
    </div>
  );
};

export default HighlightedUser;
