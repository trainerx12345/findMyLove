import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    genderId: {
      type: mongoose.ObjectId,
      required: true,
      unique: true,
      ref: "Gender",
    },
  },
  {
    versionKey: false,
  }
);

schema.post("save", handleDuplicateKeyError);
schema.post("update", handleDuplicateKeyError);
schema.post("findOneAndUpdate", handleDuplicateKeyError);
schema.post("insertMany", handleDuplicateKeyError);

const InterestedInGender = mongoose.model("InterestedInGender", schema);

export default InterestedInGender;
