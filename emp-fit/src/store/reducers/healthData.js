import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../Utility";

const initialState = {
  loading: false,
  error: null,
  stepCounts: null,
  heartpoints: null,
  caloriesBurnt: null,
  user: null,
  leaderboard: null,
};

// Getting user step counts from google fit app

const getUserStepCountsStart = (state, action) => {
  return updatedObject(state, {
    loading: true,
    error: null,
    stepCounts: null,
  });
};

const getUserStepCountsSuccess = (state, action) => {
  return updatedObject(state, {
    loading: false,
    stepCounts: action.data,
  });
};

const getUserStepCountsFail = (state, action) => {
  return updatedObject(state, {
    loading: false,
    error: action.error,
  });
};

// Getting user heart points from google fit app

const getUserHeartPointsStart = (state, action) => {
  return updatedObject(state, {
    loading: true,
    error: null,
    heartpoints: null,
  });
};

const getUserHeartPointsSuccess = (state, action) => {
  return updatedObject(state, {
    loading: false,
    heartpoints: action.data,
  });
};

const getUserHeartPointsFail = (state, action) => {
  return updatedObject(state, {
    loading: false,
    error: action.error,
  });
};

// Getting user step counts from google fit app

const getUserCaloriesBurntStart = (state, action) => {
  return updatedObject(state, {
    loading: true,
    error: null,
    caloriesBurnt: null,
  });
};

const getUserCaloriesBurntSuccess = (state, action) => {
  return updatedObject(state, {
    loading: false,
    caloriesBurnt: action.data,
  });
};

const getUserCaloriesBurntFail = (state, action) => {
  return updatedObject(state, {
    loading: false,
    error: action.error,
  });
};

//Create new user or get selected user
const getSelectedUserStart = (state, action) => {
  return updatedObject(state, {
    loading: true,
    user: null,
    error: false,
  });
};

const getSelectedUserSuccess = (state, action) => {
  return updatedObject(state, {
    loading: false,
    user: action.data,
  });
};

const getSelectedUserFail = (state, action) => {
  return updatedObject(state, {
    loading: false,
    error: action.error,
  });
};

//Updating user health data
const updateUserHealthScoreStart = (state, action) => {
  return updatedObject(state, { loading: true, error: false, user: null });
};

const updateUserHealthScoreSuccess = (state, action) => {
  return updatedObject(state, { loading: false, user: action.data });
};

const updateUserHealthScoreFail = (state, action) => {
  return updatedObject(state, { loading: false, error: action.error });
};

//UGetting Leaderboard data
const getLeaderboardDataStart = (state, action) => {
  return updatedObject(state, {
    loading: true,
    error: false,
    leaderboard: null,
  });
};

const getLeaderboardDataSuccess = (state, action) => {
  return updatedObject(state, { loading: false, leaderboard: action.data });
};

const getLeaderboardDataFail = (state, action) => {
  return updatedObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_STEP_COUNTS_START:
      return getUserStepCountsStart(state, action);
    case actionTypes.GET_USER_STEP_COUNTS_SUCCESS:
      return getUserStepCountsSuccess(state, action);
    case actionTypes.GET_USER_STEP_COUNTS_FAIL:
      return getUserStepCountsFail(state, action);

    case actionTypes.GET_USER_HEART_POINTS_START:
      return getUserHeartPointsStart(state, action);
    case actionTypes.GET_USER_HEART_POINTS_SUCCESS:
      return getUserHeartPointsSuccess(state, action);
    case actionTypes.GET_USER_HEART_POINTS_FAIL:
      return getUserHeartPointsFail(state, action);

    case actionTypes.GET_USER_CALORIES_BURNT_START:
      return getUserCaloriesBurntStart(state, action);
    case actionTypes.GET_USER_CALORIES_BURNT_SUCCESS:
      return getUserCaloriesBurntSuccess(state, action);
    case actionTypes.GET_USER_CALORIES_BURNT_FAIL:
      return getUserCaloriesBurntFail(state, action);

    case actionTypes.GET_SELECTED_USER_START:
      return getSelectedUserStart(state, action);
    case actionTypes.GET_SELECTED_USER_SUCCESS:
      return getSelectedUserSuccess(state, action);
    case actionTypes.GET_SELECTED_USER_FAIL:
      return getSelectedUserFail(state, action);

    case actionTypes.UPDATE_USER_SCORE_START:
      return updateUserHealthScoreStart(state, action);
    case actionTypes.UPDATE_USER_SCORE_SUCCESS:
      return updateUserHealthScoreSuccess(state, action);
    case actionTypes.UPDATE_USER_SCORE_FAIL:
      return updateUserHealthScoreFail(state, action);

    case actionTypes.GET_LEADERBOARD_DATA_START:
      return getLeaderboardDataStart(state, action);
    case actionTypes.GET_LEADERBOARD_DATA_SUCCESS:
      return getLeaderboardDataSuccess(state, action);
    case actionTypes.GET_LEADERBOARD_DATA_FAIL:
      return getLeaderboardDataFail(state, action);

    default:
      return state;
  }
};

export default reducer;
