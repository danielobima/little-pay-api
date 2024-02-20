export type ErrorCode =
  | "INVALID_REQUEST"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "PAYMENT_FAILED"
  | "INVALID_DATA"
  | "UNKNOWN_ERROR";

export class LittlePayError extends Error {
  constructor(code: ErrorCode, message: string) {
    super(`${code} - ${message}`);
    this.name = this.constructor.name;
  }
}

export const getErrorMessage = (error: any, defaultMessage: string) => {
  return (
    error.response?.data?.data?.message ??
    error.response?.data?.message ??
    error.message ??
    defaultMessage
  );
};
