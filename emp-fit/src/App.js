import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import * as actionCreators from "./store/actions/index";

const Enter = React.lazy(() => import("./Containers/Enter/Enter"));
const UserProfile = React.lazy(() =>
  import("./Containers/UserProfile/UserProfile")
);

function App(props) {
  const date = new Date();
  const fromDateMilli = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getTime();
  const currentdateMilli = date.getTime();
  const bucketTime = currentdateMilli - fromDateMilli;

  const token = localStorage.getItem("token");
  const isAuthenticated = token !== null;
  const id = localStorage.getItem("googleId");

  const current = new Date();
  current.setMonth(current.getMonth());
  const currentMonth = current.toLocaleString("default", { month: "long" });

  useEffect(() => {
    props.onTryAutoAuth();

    if (isAuthenticated) {
      props.onGetUserStepCounts(
        token,
        fromDateMilli,
        currentdateMilli,
        bucketTime
      );
      props.onGetUserHeartPoints(
        token,
        fromDateMilli,
        currentdateMilli,
        bucketTime
      );
      props.onGetUserCaloriesBurnt(
        token,
        fromDateMilli,
        currentdateMilli,
        bucketTime
      );

      props.onGetLeaderboardData(currentMonth);
    }
  }, [isAuthenticated]);

  let routes;

  if (isAuthenticated) {
    routes = (
      <Routes>
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="*" element={<Navigate to={`/profile/${id}`} replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Router>
      <Suspense>{routes}</Suspense>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    stepCounts: state.healthData.stepCounts,
    heartpoints: state.healthData.heartpoints,
    caloriesBurnt: state.healthData.caloriesBurnt,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoAuth: () => dispatch(actionCreators.tryAutoAuth()),

    onGetUserStepCounts: (token, startTime, endTime, bucketTime) =>
      dispatch(
        actionCreators.getUserStepCounts(token, startTime, endTime, bucketTime)
      ),

    onGetUserHeartPoints: (token, startTime, endTime, bucketTime) =>
      dispatch(
        actionCreators.getUserHeartPoints(token, startTime, endTime, bucketTime)
      ),

    onGetUserCaloriesBurnt: (token, startTime, endTime, bucketTime) =>
      dispatch(
        actionCreators.getUserCaloriesBurnt(
          token,
          startTime,
          endTime,
          bucketTime
        )
      ),

    onGetLeaderboardData: (month) =>
      dispatch(actionCreators.getLeaderboardData(month)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
