import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./UserProfile.css";
import ProfileRightSection from "./ProfileRightSection/ProfileRightSection";
import UserProfileLeftSection from "./UserProfileLeftSection/UserProfileLeftSection";
import ReactSpinner from "../../Components/Shared/ReactSpinner/ReactSpinner";
import * as actionCreators from "../../store/actions/index";

const UserProfile = (props) => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const image = localStorage.getItem("image");
  const googleId = localStorage.getItem("googleId");

  const current = new Date();
  current.setMonth(current.getMonth());
  const currentMonth = current.toLocaleString("default", { month: "long" });

  useEffect(() => {
    props.onGetSelectedUser(
      name,
      email,
      "Software Engineer",
      image,
      30,
      currentMonth,
      googleId
    );
  }, []);

  return (
    <>
      {props.loading || props.user === null ? (
        <ReactSpinner />
      ) : (
        <div className="userProfile__container">
          <div className="userProfile__leftSection">
            <UserProfileLeftSection />
          </div>
          <div className="userProfile__rightSection">
            <ProfileRightSection />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.healthData.loading,
    error: state.healthData.error,
    user: state.healthData.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetSelectedUser: (
      name,
      email,
      designation,
      image,
      age,
      month,
      googleId
    ) =>
      dispatch(
        actionCreators.getSelectedUser(
          name,
          email,
          designation,
          image,
          age,
          month,
          googleId
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
