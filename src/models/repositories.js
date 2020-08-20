import { model, Schema } from "mongoose";

const schema = new Schema({
  fullName: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: [true, "Name is required"],
  }
});

export const repositories = model("repositories", schema);
