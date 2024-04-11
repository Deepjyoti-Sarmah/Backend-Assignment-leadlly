class ApiResponse {
  statusCode: number;
  data: any; // Assuming 'data' can be of any type, adjust as necessary
  message: string;
  success: boolean;

  constructor(
    statusCode: number,
    data: any, // Adjust the type as necessary
    message: string = "Success"
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
