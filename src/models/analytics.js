import { model, Schema } from "mongoose";

const schema = new Schema({
  user: {
    type: String,
  },
  path: {
    type: String,
    required: [true, "Path is required"],
  },
  method: {
    type: String,
    required: [true, "Method is required"],
  },
  params: {
    type: Object,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const analytics = model("analytics", schema);
