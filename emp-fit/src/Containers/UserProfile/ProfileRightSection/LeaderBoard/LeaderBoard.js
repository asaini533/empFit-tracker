import React from "react";
import OtherUser from "../../../../Components/Shared/OtherUser/OtherUser";

import "./LeaderBoard.css";

const LeaderBoard = (props) => {
  return (
    <div className="leaderBoard__container">
      {props.leaderboard.map((user, index) => (
        <OtherUser key={index} rank={index} user={user} />
      ))}

      {/* <OtherUser />
      <OtherUser />
      <OtherUser />
      <OtherUser />
      <OtherUser />
      <OtherUser />
      <OtherUser />
      <OtherUser /> */}
    </div>
  );
};

export default LeaderBoard;
