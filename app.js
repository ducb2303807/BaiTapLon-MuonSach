const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const adminRouter = require("./app/routes/admin/index.route");
const userRouter = require("./app/routes/user/index.route");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to book borrow application" });
});

app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
