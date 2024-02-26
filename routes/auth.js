const authController = require("../controller/authcontroller");
const { Router } = require("express");
const authRoute = Router();

const { userEmailCheck } = require("../middleware/validation")
const {verifyStaffToken, verifyAdminToken} = require("../middleware/verifytoken");

authRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "user Router is working" });
});

authRoute.post("/register", userEmailCheck, authController.register);
authRoute.get("/getAll",verifyAdminToken, authController.getAll);
authRoute.post("/login", authController.login);
authRoute.delete("/delete/:_id",verifyAdminToken, authController.delete)
authRoute.get("/byId/:_id", authController.byId)


module.exports = authRoute;