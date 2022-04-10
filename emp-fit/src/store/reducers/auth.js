import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../Utility";

const initialState = {
  token: null,
  userId: null,
  userName: null,
};

// Storing user authentication details
const authenticationSuccess = (state, action) => {
  return updatedObject(state, {
    token: action.token,
    userId: action.userId,
    userName: action.userName,
  });
};

// Logging out user
const authenticationLogout = (state, action) => {
  return updatedObject(state, { token: null, userId: null, userName: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_SUCCESS:
      return authenticationSuccess(state, action);

    case actionTypes.AUTHENTICATION_LOGOUT:
      return authenticationLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
