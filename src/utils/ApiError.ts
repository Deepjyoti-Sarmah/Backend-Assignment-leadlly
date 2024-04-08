class ApiError extends Error {
 statusCode: number;
 data: any; // Assuming 'data' can be of any type, adjust as necessary
 message: string;
 success: boolean;
 errors: any[]; // Assuming 'errors' is an array of any type, adjust as necessary

 constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack: string = ""
 ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
 }
}

export { ApiError };
