/* eslint-disable no-console */
import mongoose from "mongoose";
import { MONGO_CONNECTION_STRING } from "./config";

export const connect = () =>
  mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
