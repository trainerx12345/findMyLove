import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    link: {
      type: String,
    },
    details: {
      type: String,
      default: "Image Caption",
    },
    timeAdded: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
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

const UserPhoto = mongoose.model("UserPhoto", schema);

export default UserPhoto;
