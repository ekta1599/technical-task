const OTPModel = require("../model/OTPModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { encrypt, decrypt } = require("../helper/encrypt-decrypt");

const CryptoJS = require("crypto-js");

module.exports = {
    sendOtp : (data) => {
        return new Promise(async (res, rej) => {
            try {
                let OTPData = await OTPModel.findOne({ mobile:data.mobile })
               
                if (OTPData) {
                    res({ status: 200, data: OTPData });
                } else {
                    rej({ status: 500, message: "your mobile number is not registered" });
                }
            } catch (err) {
                console.log("err", err);
                rej({
                    status: 500,
                    error: err,
                    message: "something went wrong!!",
                });
            }
        });
    },
}