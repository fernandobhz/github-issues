/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { ExposableError } from "../errors";

export function errorHandler(err, req, res, next) {
  if (err instanceof ExposableError) {
    res.status(err.statusCode || 400).json({
      status: err.statusCode || 400,
      message: err.message,
    });
  } else {
    // eslint-disable-next-line no-debugger
    debugger;
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "Internal sever error, contact support",
    });
  }
}
