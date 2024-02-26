const { Router } = require("express");
const {
  verifyStaffToken,
} = require("../middleware/verifytoken");
const adminRoute = Router();

const authRoute = require("./auth");

adminRoute.get("/", (req, res) => {
  res.status(200).json({ message: "user Route is working" });
});

adminRoute.use("/auth", authRoute);

module.exports = adminRoute;