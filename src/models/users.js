import mongoose from "mongoose";
import { handleDuplicateKeyError } from "./error.js";
import isEmail from "validator/lib/isEmail.js";

import { isPasswordHash } from "../password.js";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: { validator: isEmail, message: "Invalid email" },
    },
    password: {
      type: String,
      required: true,
      validate: { validator: isPasswordHash, message: "Invalid password hash" },
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    dob_day:{
      type:Number,
    },
    dob_month:{
      type:Number,
    },
    dob_year:{
      type:Number,
    },
    show_gender: {
      type: Boolean,
      default: false,
    },
    gender_identity: {
      type: String,
    },
    gender_interest: {
      type: String,
    },

    about: {
      type: String,
    },
    nickname: {
      type: String,
    },
    url: {
      type: String,
    },
    matches:{
      userId: {
        type: mongoose.ObjectId,
        ref: "User",
      }, 
    }
  },
  {
    versionKey: false,
  }
);
schema.post("save", handleDuplicateKeyError);
schema.post("update", handleDuplicateKeyError);
schema.post("findOneAndUpdate", handleDuplicateKeyError);
schema.post("insertMany", handleDuplicateKeyError);

const User = mongoose.model("User", schema);

export default User;
