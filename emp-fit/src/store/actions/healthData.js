import * as actionTypes from "./actionTypes";

// Getting user step counts from google fit app
export const getUserStepCountsStart = () => {
  return {
    type: actionTypes.GET_USER_STEP_COUNTS_START,
  };
};

export const getUserStepCountsSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_STEP_COUNTS_SUCCESS,
    data: data,
  };
};

export const getUserStepCountsFail = (error) => {
  return {
    type: actionTypes.GET_USER_STEP_COUNTS_FAIL,
    error: error,
  };
};

export const getUserStepCounts = (token, startTime, endTime, bucketTime) => {
  return async (dispatch) => {
    dispatch(getUserStepCountsStart());

    try {
      const response = await fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aggregateBy: [
              {
                dataTypeName: "com.google.step_count.delta",
              },
            ],
            bucketByTime: { durationMillis: bucketTime },
            startTimeMillis: startTime,
            endTimeMillis: endTime,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch(
        getUserStepCountsSuccess(
          responseData.bucket[0].dataset[0].point[0].value[0].intVal
        )
      );
    } catch (err) {
      dispatch(getUserStepCountsFail(err.message));
    }
  };
};

// Getting user heart points from google fit app
export const getUserHeartPointsStart = () => {
  return {
    type: actionTypes.GET_USER_HEART_POINTS_START,
  };
};

export const getUserHeartPointsSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_HEART_POINTS_SUCCESS,
    data: data,
  };
};

export const getUserHeartPointsFail = (error) => {
  return {
    type: actionTypes.GET_USER_HEART_POINTS_FAIL,
    error: error,
  };
};

export const getUserHeartPoints = (token, startTime, endTime, bucketTime) => {
  return async (dispatch) => {
    dispatch(getUserHeartPointsStart());

    try {
      const response = await fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aggregateBy: [
              {
                dataTypeName: "com.google.heart_minutes",
              },
            ],
            bucketByTime: { durationMillis: bucketTime },
            startTimeMillis: startTime,
            endTimeMillis: endTime,
          }),
        }
      );

      const responseData = await response.json();

      dispatch(
        getUserHeartPointsSuccess(
          responseData.bucket[0].dataset[0].point[0].value[0].fpVal
        )
      );
    } catch (err) {
      dispatch(getUserHeartPointsFail(err.message));
    }
  };
};

// Getting user step counts from google fit app
export const getUserCaloriesBurntStart = () => {
  return {
    type: actionTypes.GET_USER_CALORIES_BURNT_START,
  };
};

export const getUserCaloriesBurntSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_CALORIES_BURNT_SUCCESS,
    data: data,
  };
};

export const getUserCaloriesBurntFail = (error) => {
  return {
    type: actionTypes.GET_USER_CALORIES_BURNT_FAIL,
    error: error,
  };
};

export const getUserCaloriesBurnt = (token, startTime, endTime, bucketTime) => {
  return async (dispatch) => {
    dispatch(getUserCaloriesBurntStart());

    try {
      const response = await fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aggregateBy: [
              {
                dataTypeName: "com.google.calories.expended",
              },
            ],
            bucketByTime: { durationMillis: bucketTime },
            startTimeMillis: startTime,
            endTimeMillis: endTime,
          }),
        }
      );

      const responseData = await response.json();

      dispatch(
        getUserCaloriesBurntSuccess(
          Math.floor(responseData.bucket[0].dataset[0].point[0].value[0].fpVal)
        )
      );
    } catch (err) {
      dispatch(getUserCaloriesBurntFail(err.message));
    }
  };
};

//Create new user of get selected user
export const getSelectedUserStart = () => {
  return {
    type: actionTypes.GET_SELECTED_USER_START,
  };
};

export const getSelectedUserSuccess = (data) => {
  return {
    type: actionTypes.GET_SELECTED_USER_SUCCESS,
    data: data,
  };
};

export const getSelectedUserFail = (error) => {
  return {
    type: actionTypes.GET_SELECTED_USER_FAIL,
    error: error,
  };
};

export const getSelectedUser = (
  name,
  email,
  designation,
  image,
  age,
  month,
  googleId
) => {
  return async (dispatch) => {
    dispatch(getSelectedUserStart());

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/getselecteduser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            designation: designation,
            image: image,
            age: age,
            month: month,
            googleId: googleId,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(getSelectedUserSuccess(responseData.user));
    } catch (err) {
      dispatch(getSelectedUserFail(err.message));
    }
  };
};

//Update user health score
export const userHealthScoreStart = () => {
  return {
    type: actionTypes.UPDATE_USER_SCORE_START,
  };
};

export const userHealthScoreSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_USER_SCORE_SUCCESS,
    data: data,
  };
};

export const userHealthScoreFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_SCORE_FAIL,
    error: error,
  };
};

export const userHealthScore = (
  name,
  email,
  designation,
  image,
  age,
  month,
  stepsCount,
  heartPoints,
  caloriesBurnt
) => {
  return async (dispatch) => {
    dispatch(userHealthScoreStart());

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/updateUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            designation: designation,
            image: image,
            age: age,
            month: month,
            stepsCount: stepsCount,
            heartPoints: heartPoints,
            caloriesBurnt: caloriesBurnt,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(userHealthScoreSuccess(responseData.user));
    } catch (err) {
      dispatch(userHealthScoreFail(err.message));
    }
  };
};

//Get leaderboard data
export const getLeaderboardDataStart = () => {
  return {
    type: actionTypes.GET_LEADERBOARD_DATA_START,
  };
};

export const getLeaderboardDataSuccess = (data) => {
  return {
    type: actionTypes.GET_LEADERBOARD_DATA_SUCCESS,
    data: data,
  };
};

export const getLeaderboardDataFail = (error) => {
  return {
    type: actionTypes.GET_LEADERBOARD_DATA_FAIL,
    error: error,
  };
};

export const getLeaderboardData = (month) => {
  return async (dispatch) => {
    dispatch(getLeaderboardDataStart());

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/leaderboard/" + month,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(getLeaderboardDataSuccess(responseData.leaderboard));
    } catch (err) {
      dispatch(getLeaderboardDataFail(err.message));
    }
  };
};
