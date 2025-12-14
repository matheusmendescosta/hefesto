export class ApiError extends Error {
  errors: Map<string, string[]> = new Map();

  errorCode = (code: string): boolean => {
    return this.errors.has(code);
  };

  errorByCode: (code: string, format?: boolean) => string | undefined = (
    code,
    format = true
  ) => {
    try {
      const errorsFromCode = this.errors.get(code);
      if (errorsFromCode && errorsFromCode.length > 0) {
        const error = errorsFromCode[0];
        return format ? error.replaceAll(" ", "_") : error;
      }
    } catch (error) {}

    return undefined;
  };

  errorsByCode: (code: string, format?: boolean) => string[] | undefined = (
    code,
    format = true
  ) => {
    try {
      const errorsFromCode = this.errors.get(code);
      if (errorsFromCode) {
        return errorsFromCode.map((error) => {
          return format ? error.replaceAll(" ", "_") : error;
        });
      }
    } catch (error) {}

    return undefined;
  };

  // eslint-disable-next-line
  constructor(message: string, errors: {}) {
    super(message);
    this.name = "ApiError";
    this.errors = new Map<string, string[]>(Object.entries(errors));
  }
}
