const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const { string } = require("joi");

let authSchema = new Schema(
  {
    email: {
      type: String,
      default:null

    },
    password: {
      type: String,
      default:null

    },
    name:{
        type: String,
        default: null
    },
    role :{
      type : String,
      default:null

    }
  },
  {
   timestamps: true
  }
);

authSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
  }
});

module.exports = model("admin", authSchema);