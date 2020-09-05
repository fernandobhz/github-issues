import { model, Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 320,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export const users = model("users", schema);
