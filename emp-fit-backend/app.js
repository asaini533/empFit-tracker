const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const userRoutes = require("./routes/users");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);

app.use((error, req, res, next) => {
  // if (req.file) {
  //   fs.unlink(req.file.path, (err) => {});
  // }

  if (res.headerSent) {
    return next(error);
  }

  // res.write(response.statusCode.toString());
  res.status(error.code || 500 || error.status);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_URL}`)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
