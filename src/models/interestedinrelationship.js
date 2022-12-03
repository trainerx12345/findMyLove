import mongoose from "mongoose";

import { handleDuplicateKeyError } from "./error.js";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    relationshipTypeId: {
      type: mongoose.ObjectId,
      ref: "RelationshipType",
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

const InterestedInRelationship = mongoose.model("InterestedInRelationship", schema);

export default InterestedInRelationship;
