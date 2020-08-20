import { model, Schema } from "mongoose";

const schema = new Schema({
  id: {
    type: Number,
    required: [true, "id is required"],
  },
  repository: {
    type: String,
    required: [true, "repository is required"],
  },
  title: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: [true, "title is required"],
  },
  number: {
    type: Number,
    required: [true, "number is required"],
  },
  created_at: {
    type: Date,
    required: [true, "created_at is required"],
  },
  closed_at: {
    type: Date,
  },
  age: {
    type: Number,
  },
});

export const issues = model("issues", schema);
