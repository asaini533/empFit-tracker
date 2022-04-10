import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { connect } from "react-redux";

import "./UserProfileLeftSection.css";
import UserDetails from "./UserDetails/UserDetails";
import * as actionCreators from "../../../store/actions/index";

const UserProfileLeftSection = (props) => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const image = localStorage.getItem("image");

  const current = new Date();
  current.setMonth(current.getMonth());
  const currentMonth = current.toLocaleString("default", { month: "long" });

  const scoreUpdateHandler = () => {
    props.onUserHealthScore(
      name,
      email,
      "Software Engineer",
      image,
      30,
      currentMonth,
      props.stepCounts,
      props.heartpoints,
      props.caloriesBurnt
    );
  };

  let score = 0;

  if (props.user) {
    const currentMonthData = props.user.healthData.find((month) => {
      return Object.keys(month)[0] === currentMonth;
    });

    score = currentMonthData[currentMonth].score;
  }

  return (
    <div>
      <UserDetails />
      <div className="userProfile__leftSection-menu">
        <p className="userProfile__leftSection-menu__dashboard">
          <MdOutlineDashboard /> Dashboard
        </p>
        <div className="userProfile__score">
          <p className="userProfile__score-data">Score : {score}</p>
          <button
            className="userProfile__score-button"
            onClick={scoreUpdateHandler}
          >
            Update
          </button>
        </div>
        <div className="userProfile__leftSection-menu__bmi-conatiner">
          Your BMI: 23
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stepCounts: state.healthData.stepCounts,
    heartpoints: state.healthData.heartpoints,
    caloriesBurnt: state.healthData.caloriesBurnt,
    user: state.healthData.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserHealthScore: (
      name,
      email,
      designation,
      image,
      age,
      month,
      stepsCount,
      heartPoints,
      caloriesBurnt
    ) =>
      dispatch(
        actionCreators.userHealthScore(
          name,
          email,
          designation,
          image,
          age,
          month,
          stepsCount,
          heartPoints,
          caloriesBurnt
        )
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileLeftSection);
