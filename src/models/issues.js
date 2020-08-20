import { model, Schema } from "mongoose";

const schema = new Schema({
  id: {
    type: Number,
    required: [true, "id is required"],
  },
  project: {
    /**
     *  I'm new to mongodb and I'm not know every aspect of references in mongodb, so I won't use it
     *  But I know if we store the project _id here it makes possible to "join" these documents
     *  If I have time I'll implement this
     */
    type: String,
    required: [true, "project is required"],
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
    required: [true, "closed_at is required"],
  },
  age: {
    type: Number,
  },
});

export const issues = model("issues", schema);
