import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    userIdBlocked: {
      type: mongoose.ObjectId,
      ref: "User",
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

const Block = mongoose.model("Block", schema);

export default Block;
