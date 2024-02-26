const { response } = require("./response");
const userModel = require("../model/authmodel");

exports.userEmailCheck = async (req, res, next) => {
    try {
        let isEmail = await userModel.findOne({ email: req.body.email });
        if (isEmail) response("This Email is already exist .!! go for login", {}, 400, res);
        else next();
    }
    catch (err) {
        response("something went wrong!!", err, 500, res);
    }
};