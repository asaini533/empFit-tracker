import { Avatar, Button } from "@mui/material";
import React from "react";
import { RiEditCircleLine } from "react-icons/ri";
import { BsChevronCompactDown } from "react-icons/bs";
import { connect } from "react-redux";

import "./UserDetails.css";

const UserDetails = (props) => {
  return (
    <div className="userDetails__container">
      <div className="userDetails__heading">
        <p className="userDetails__heading-myProfile">My Profile</p>
        <Button>
          <RiEditCircleLine className="userDetails__heading-edit" />
        </Button>
      </div>
      <div className="userDetails__image-container">
        <Avatar src={props.user.image} sx={{ width: 130, height: 130 }} />
      </div>
      <div className="userDetails__details">
        <p className="userDetails__details-name">{props.user.name}, 29</p>
        <p className="userDetails__details-designation">Software Developer</p>
      </div>
      <BsChevronCompactDown className="userDetails__end" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.healthData.user,
  };
};

export default connect(mapStateToProps)(UserDetails);
