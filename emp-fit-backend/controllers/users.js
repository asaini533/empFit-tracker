const HttpError = require("../actions/http-error");
const User = require("../models/user");

// Add new user or fetch existing user data
const getSelectedUser = async (req, res, next) => {
  const { googleId, name, email, designation, image, age, month } = req.body;

  let existingUserArray;

  try {
    existingUserArray = await User.find({ googleId: googleId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while getting existing user!",
      403
    );
    return next(error);
  }

  let user;

  if (existingUserArray.length !== 0) {
    user = existingUserArray[0];
  } else {
    const createUser = new User({
      name: name,
      email: email,
      designation: designation,
      image: image,
      age: age,
      googleId: googleId,
      healthData: [
        {
          [month]: {
            stepsCount: 0,
            heartPoints: 0,
            caloriesBurnt: 0,
            score: 0,
          },
        },
      ],
    });

    try {
      user = await createUser.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong while creating new user!",
        403
      );
      return next(error);
    }
  }

  res.json({ user: user });
};

// Add and update user data
const updateUserData = async (req, res, next) => {
  const { email, month, stepsCount, heartPoints, caloriesBurnt } = req.body;

  let existingUserArray;

  try {
    existingUserArray = await User.find({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while getting existing user!",
      403
    );
    return next(error);
  }

  let existingUser = existingUserArray[0];

  let updatedUser;

  let isMonthExist = existingUser.healthData.filter((month) => month === month);

  if (isMonthExist.length > 0) {
    existingUser.healthData.map((data) => {
      if (Object.keys(data)[0] === month) {
        const stepsScore = Math.floor(
          (stepsCount - data[month].stepsCount) / 100
        );
        const heartScore = Math.floor(
          (heartPoints - data[month].heartPoints) / 10
        );
        const caloriesScore = Math.floor(
          (caloriesBurnt - data[month].caloriesBurnt) / 100
        );
        data[month].stepsCount = stepsCount;
        data[month].heartPoints = heartPoints;
        data[month].caloriesBurnt = caloriesBurnt;
        data[month].score =
          data[month].score + stepsScore + heartScore + caloriesScore;
      }
      return;
    });

    existingUser.markModified("healthData");
    try {
      updatedUser = await existingUser.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong while updating user!",
        403
      );
      return next(error);
    }
  } else {
    const stepsScore = Math.floor(stepsCount / 100);
    const heartScore = Math.floor(heartPoints / 10);
    const caloriesScroe = Math.floor(caloriesBurnt / 100);

    existingUser.healthData = [
      ...existingUser.healthData,
      {
        [month]: {
          stepsCount: stepsCount,
          heartPoints: heartPoints,
          caloriesBurnt: caloriesBurnt,
          score: stepsScore + heartScore + caloriesScroe,
        },
      },
    ];

    try {
      updatedUser = await existingUser.save();
    } catch (err) {
      const error = new HttpError(
        "Something went wrong while updating user!",
        403
      );
      return next(error);
    }
  }

  res.json({ user: updatedUser });
};

// Get Leaderboard data
const fetchLeaderBoard = async (req, res, next) => {
  const month = req.params.month;

  let leaderboard;

  try {
    leaderboard = await User.aggregate([
      {
        $unwind: {
          path: "$healthData",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          googleId: 1,
          designation: 1,
          image: 1,
          age: 1,
          email: 1,
          score: `$healthData.${month}.score`,
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
    ]);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while getting leaderboard!",
      403
    );
    return next(error);
  }

  res.json({ leaderboard: leaderboard });
};

exports.updateUserData = updateUserData;
exports.getSelectedUser = getSelectedUser;
exports.fetchLeaderBoard = fetchLeaderBoard;
