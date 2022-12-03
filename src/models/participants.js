import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.ObjectId,
      ref: "Conversation",
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    timeJoined: {
      type: String,
    },
    timeLeft: {
      type: String,
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

const Participant = mongoose.model("Participant", schema);

export default Participant;
