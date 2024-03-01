const otpController = require("../controller/otpController");
const { Router } = require("express");
const otpRoute = Router();

const { userEmailCheck } = require("../middleware/validation")
const {verifyStaffToken, verifyAdminToken} = require("../middleware/verifytoken");

otpRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "user Router is working" });
});

otpRoute.get("/sendotp", otpController.sendOtp);



module.exports = otpRoute;