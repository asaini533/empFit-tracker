import React from "react";
import { Avatar } from "@mui/material";

import "./OtherUser.css";

const OtherUser = (props) => {
  return (
    <div className="otherUser__container">
      <Avatar src={props.user.image} />
      <div className="otherUser__details">
        <p className="otherUser__details-name">{props.user.name}</p>
        <p className="otherUser__details-score">
          <span>Score: </span>
          {props.user.score}
        </p>
      </div>
      <div className="otherUser__rank">
        <p className="otherUser__rank-data">{props.rank + 1}</p>
      </div>
    </div>
  );
};

export default OtherUser;
