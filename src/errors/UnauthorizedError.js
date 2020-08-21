import { ExposableError } from "./ExposableError";

export class UnauthorizedError extends ExposableError {
  constructor() {
    super("Unauthorized", 401);
  }
}
