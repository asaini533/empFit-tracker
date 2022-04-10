import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Enter.css";
import * as actionCreators from "../../store/actions/index";
import enterIcon from "../../assets/images/enter.png";

const Enter = (props) => {
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const responseGoogle = (response) => {
    props.onAuthentication(response, navigate);
  };

  const failAuthentication = (response) => {
    setError(true);
  };

  return (
    <div className="enter__container">
      <div className="enter__layout">
        <img src={enterIcon} alt="enter" className="enter__layout-image" />
        <p className="enter__layout-text">
          Improving the health and productivity of the poorest is one of the
          best investment you can make in the future of the world.{" "}
          <span>
            <em>-by Bill Gates</em>
          </span>
        </p>
        <GoogleLogin
          clientId="212435296658-v397hd2sip65sg09003p4lig5uqnivp8.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={failAuthentication}
          cookiePolicy={"single_host_origin"}
          className="enter__layout-button"
          responseType="code,token"
          scope="https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.activity.read"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthentication: (response, navigate) =>
      dispatch(actionCreators.authentication(response, navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Enter);
