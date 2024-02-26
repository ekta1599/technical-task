const userModel = require("../model/authmodel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { encrypt, decrypt } = require("../helper/encrypt-decrypt");

const CryptoJS = require("crypto-js");

module.exports = {
    add: (data) => {
        console.log("req");
        return new Promise(async (res, rej) => {
            try {
                console.log("resp------------>", data);
                let saveData = await userModel.create(data);
                console.log("saveData-------->", saveData);
                if (saveData) {
                    res({ status: 200, data: "New Data added!!" });
                } else {
                    rej({ status: 500, message: "something went wrong!!........." });
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

    login: (data) => {
        return new Promise(async (res, rej) => {
            try {

                let getData = await userModel.findOne({
                    email: data.email,
                });


                if (getData) {

                    const isMatch = await CryptoJS.SHA256(
                        data.password,
                        getData.password
                    );
                    if (isMatch) {
                        let key1 = process.env.USER_ENCRYPTION_KEY;
                        let encryptUser = encrypt(getData._id, key1);
                        let encryptPassword = encrypt(data.password, key1);
                        let encryptRole = encrypt(getData.role, key1);

                        let token = jwt.sign(
                            {
                                userId: encryptUser,
                                password: encryptPassword,
                                role: encryptRole,
                            },
                            process.env.USER_ACCESS_TOKEN,
                            { expiresIn: process.env.USER_ACCESS_TIME }
                        );
                        res({
                            status: 200,
                            data: {
                                token: token,
                                role: getData.role,
                            },
                        });
                    } else {
                        rej({ status: 403, message: "Entered password is wrong!!" });
                    }
                } else {
                    rej({ status: 404, message: "Invalid Email id !!" });
                }
            } catch (err) {
                console.log(err);
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    },
    delete: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await userModel.findByIdAndDelete(_id)
                if (saveData) {
                    res({ status: 200, data: saveData });
                } else {
                    rej({ status: 500, message: "something went wrong!!" });
                }
            } catch (err) {
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },
    byId: (_id) => {
        return new Promise(async (res, rej) => {
            try {
                let saveData = await userModel.findOne({ _id })
                if (saveData) {
                    res({ status: 200, data: saveData });
                } else {
                    rej({ status: 500, message: "Invalid id!!" });
                }
            }
            catch (err) {
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        })
    },
    getAll: (page, limit, str) => {
        return new Promise(async (res, rej) => {
            try {
                let qry = {};
                page = parseInt(page);
                limit = parseInt(limit);
                if (str) {
                    qry['$or'] = [
                        { "name": { $regex: str, $options: 'i' } },
                    ]
                }
                let getData = await userModel.aggregate([
                    // { $match: qry },
                    {
                        $facet: {
                            total_count: [
                                {
                                    $group: {
                                        _id: null,
                                        count: { $sum: 1 }
                                    }
                                }
                            ],
                            result: [
                                {
                                    $project: {
                                        __v: 0,
                                    }
                                },
                                { $sort: { createdAt: -1 } },
                                { $skip: (page - 1) * limit },
                                { $limit: limit }
                            ]
                        }
                    },
                ]);
                getData = getData[0]
                if (getData.result.length > 0) {
                    res({ status: 200, data: { total_count: getData.total_count[0].count, result: getData.result } });
                }
                else {
                    rej({ status: 404, message: "No data found!!" });
                }
            }
            catch (err) {
                // console.log(err)
                rej({ status: 500, error: err, message: "something went wrong!!" });
            }
        });
    }
}