import React from "react";
import HighlightedUser from "../../../../Components/Shared/HighlightedUser/HighlightedUser";
import LeaderBoard from "../LeaderBoard/LeaderBoard";
import { connect } from "react-redux";

import "./UserAnalysis.css";

const UsersAnalysis = (props) => {
  const previous = new Date();
  previous.setMonth(previous.getMonth() - 1);
  const previousMonth = previous.toLocaleString("default", { month: "long" });

  const current = new Date();
  current.setMonth(current.getMonth());
  const currentMonth = current.toLocaleString("default", { month: "long" });

  return (
    <div className="usersAnalysis__container">
      <div className="usersAnalysis__previousMonth">
        <p className="userAnalysis__heading">{previousMonth} winner</p>
        <HighlightedUser />
      </div>
      <div className="userAnalysis__leaderboard-container">
        <p className="userAnalysis__heading-leaderboard">
          {currentMonth} leaderboard
        </p>
        <LeaderBoard leaderboard={props.leaderboard} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leaderboard: state.healthData.leaderboard,
  };
};

export default connect(mapStateToProps)(UsersAnalysis);
