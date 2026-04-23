import axios, { AxiosInstance } from "axios";
import { LittlePayError, getErrorMessage } from "./errors.js";

/**
 * Creates a new axios instance with the given baseURL and default interceptors.
 * @param baseURL - The base URL for the API.
 * @returns The configured axios instance.
 */
export const createAxiosInstance = (
  baseURL: string = "https://pay.little.africa",
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (!error.response) {
        return Promise.reject(
          new LittlePayError("NETWORK_ERROR", "Network error"),
        );
      }

      switch (true) {
        case error.response.status >= 400 && error.response.status < 500:
          return Promise.reject(
            new LittlePayError(
              "INVALID_REQUEST",
              getErrorMessage(error, "Invalid request"),
            ),
          );
        case 500 <= error.response.status:
          return Promise.reject(
            new LittlePayError("SERVER_ERROR", "Server error"),
          );
        default:
          return Promise.reject(
            new LittlePayError(
              "UNKNOWN_ERROR",
              getErrorMessage(error, "Unknown error"),
            ),
          );
      }
    },
  );

  return instance;
};

const baseAxios = createAxiosInstance();

export { baseAxios };
