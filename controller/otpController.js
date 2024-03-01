const otpService = require("../service/otpService")
const { response } = require("../middleware/response");

exports.
    sendOtp = async (req, res) => {
        try {
            let resp = await otpService.sendOtp(req.body);
            if (resp) {
                return response("Success!!", resp, 200, res);
            } else {
                return response("something went wrong!!", {}, 500, res);
            }
        } catch (err) {
            console.log("err", err);
            return response(err.message, err?.error, err.status, res);
        }
    };
