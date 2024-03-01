const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const { string } = require("joi");

let OTpSchema = new Schema(
  {
    mobile: {
      type: Number,
      default:null
    },
    otp : {
        type: Number,
        default:null
    },
  },
  {
   timestamps: true
  }
);

module.exports = model("otp", OTpSchema);