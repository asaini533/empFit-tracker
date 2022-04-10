import * as actionTypes from "./actionTypes";

// Storing user authentication details
export const authenticationSuccess = (token, userId, userName) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    token: token,
    userId: userId,
    userName: userName,
  };
};

export const authentication = (response, navigate) => {
  return (dispatch) => {
    const expirationDate = new Date(
      new Date().getTime() + response.tokenObj.expires_in * 1000
    );
    localStorage.setItem("expirationDate", expirationDate);
    localStorage.setItem("token", response.tokenObj.access_token);
    localStorage.setItem("email", response.profileObj.email);
    localStorage.setItem("name", response.profileObj.name);
    localStorage.setItem("googleId", response.profileObj.googleId);
    localStorage.setItem("image", response.profileObj.imageUrl);

    dispatch(
      authenticationSuccess(
        response.tokenObj.access_token,
        response.profileObj.email,
        response.profileObj.name
      )
    );

    dispatch(checkAuthTimeout(response.tokenObj.expires_in));
    navigate("/profile/" + response.profileObj.googleId);
  };
};

//Logout authentication
export const authenticationLogout = () => {
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("googleId");
  localStorage.removeItem("image");

  return {
    type: actionTypes.AUTHENTICATION_LOGOUT,
  };
};

//Loging out autometically after 1 hour
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authenticationLogout());
    }, expirationTime * 1000);
  };
};

//Auto login
export const tryAutoAuth = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authenticationLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authenticationLogout());
      } else {
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");

        dispatch(authenticationSuccess(token, userId, userName));

        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
