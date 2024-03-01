const { Router } = require("express");
const {
  verifyStaffToken,
} = require("../middleware/verifytoken");
const adminRoute = Router();

const authRoute = require("./auth");
const otpRoute = require('./otp')

adminRoute.get("/", (req, res) => {
  res.status(200).json({ message: "user Route is working" });
});

adminRoute.use("/auth", authRoute);
adminRoute.use("/otp", otpRoute);

module.exports = adminRoute;