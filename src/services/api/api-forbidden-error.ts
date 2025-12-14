import { ApiError } from "./api-error";

export class ApiForbiddenError extends ApiError {
  //eslint-disable-next-line
  constructor(message: string, errors: {} = {}) {
    super(message, errors);
    this.name = "ApiForbiddenError";
  }
}
