import { ApiError } from "./api-error";

export class ApiUnauthorizedError extends ApiError {
  //eslint-disable-next-line
  constructor(message: string, errors: {} = {}) {
    super(message, errors);
    this.name = "ApiUnauthorizedError";
  }
}
