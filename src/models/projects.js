import { model, Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 1000,
    required: [true, "Name is required"],
  }
});

export const projects = model("projects", schema);
