import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    from_id: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    to_id: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    timestamp: {
      type: Date,
      required: true,
      unique: true,
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

const Message = mongoose.model("Messages", schema);

export default Message;
