import React from "react";
import { MdOutlineDataUsage } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { GoogleLogout } from "react-google-login";
import moment from "moment";
import { connect } from "react-redux";

import "./ProfileRightSection.css";

import * as actionCreators from "../../../store/actions/index";
import UserHealthMatrices from "./UserHealthMatrices/UserHealthMatrices";
import Tips from "../../../Components/Shared/Tips/Tips";
import UsersAnalysis from "./UsersAnalysis/UsersAnalysis";

const ProfileRightSection = (props) => {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const fromDate = moment(firstDay).format("MMMM Do YYYY, h:mm:ss a");
  const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

  const successLogout = (response) => {
    props.onAuthenticationLogout();
  };

  const failLogout = (response) => {};

  return (
    <div className="profileRightSection__container">
      <div className="profileRightSection__header">
        <p className="profileRightSection__header-title">
          <MdOutlineDataUsage /> User Matrices,{" "}
          <span>Data gathered from google fit app</span>
        </p>
        <GoogleLogout
          clientId="212435296658-v397hd2sip65sg09003p4lig5uqnivp8.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={successLogout}
          onFailure={failLogout}
        />
      </div>

      <div className="profileRightSection__body-date">
        <p>
          <BsCalendar3 /> <span>{fromDate}</span> to <span>{currentDate}</span>
        </p>
      </div>

      <div className="profileRightSection__body">
        <div className="profileRightSection__body-metrices">
          <UserHealthMatrices
            stepCounts={props.stepCounts}
            heartpoints={props.heartpoints}
            caloriesBurnt={props.caloriesBurnt}
          />
          <Tips />
        </div>
        <div className="profileRightSection__body-positions">
          <UsersAnalysis />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticationLogout: () =>
      dispatch(actionCreators.authenticationLogout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileRightSection);
