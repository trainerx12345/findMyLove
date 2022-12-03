import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    participantId: {
      type: mongoose.ObjectId,
      ref: "Participant",
    },
    messageText: {
      type: String,
    },
    ts: {
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

const Message = mongoose.model("Message", schema);

export default Message;
