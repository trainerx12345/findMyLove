import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    userIdGiven: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    userIdReceived: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    grade: {
      type: Number,
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

const Grade = mongoose.model("Grade", schema);

export default Grade;
