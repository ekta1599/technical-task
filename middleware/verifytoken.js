const jwt = require("jsonwebtoken");
const { decrypt } = require("../helper/encrypt-decrypt");

function verifyStaffToken(req, res, next) {
    let token = req.headers["authorization"];

    if (!token) {
        res.status(403).json({ success: false, message: "token missing" });
    } else {
        token = token.split(" ")[1];
        jwt.verify(token, process.env.USER_ACCESS_TOKEN, (err, payload) => {
            if (err) {
                res.status(403).json({ success: false, message: "unauthorized token" });
            } else {
                req.userId = decrypt(
                    payload.userId,
                    process.env.USER_ENCRYPTION_KEY
                );
                req.password = decrypt(
                    payload.password,
                    process.env.USER_ENCRYPTION_KEY
                );
                req.role = decrypt(
                    payload.role,
                    process.env.USER_ENCRYPTION_KEY
                )
                if(req.role == "staff"){
                    next();
                }
                else{
                    res.status(403).json({ success: false, message: "unauthorized role" });
                }


            }
        });
    }
}
function verifyAdminToken(req, res, next) {
    let token = req.headers["authorization"];
   
    if (!token) {
        res.status(403).json({ success: false, message: "token missing" });
    } else {
        token = token.split(" ")[0];
        jwt.verify(token, process.env.USER_ACCESS_TOKEN, (err, payload) => {
            if (err) {
                console.log("err",err);
                res.status(403).json({ success: false, message: "unauthorized token" });
            } else {
                req.adminId = decrypt(  
                    payload.adminId,
                    process.env.USER_ENCRYPTION_KEY
                );
                req.password = decrypt(
                    payload.password,
                    process.env.USER_ENCRYPTION_KEY
                );
                req.role = decrypt(
                    payload.role,
                    process.env.USER_ENCRYPTION_KEY
                )
               // console.log(req.role);
                if(req.role == "admin"){
                    next();
                }
                else{
                    res.status(403).json({ success: false, message: "unauthorized role" });
                }


            }
        });
    }
}
module.exports = {verifyStaffToken,verifyAdminToken}