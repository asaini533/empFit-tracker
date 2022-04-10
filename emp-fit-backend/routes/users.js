const express = require("express");

const userController = require("../controllers/users");

const router = express.Router();

router.post("/getselecteduser", userController.getSelectedUser);

router.post("/updateUser", userController.updateUserData);

router.get("/leaderboard/:month", userController.fetchLeaderBoard);

module.exports = router;
