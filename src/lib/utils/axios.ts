import axios from "axios";
import { LittlePayError, getErrorMessage } from "./errors.js";

const baseAxios = axios.create({
  baseURL: "http://localhost:3000",
});

baseAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error.response) {
      return Promise.reject(
        new LittlePayError("NETWORK_ERROR", "Network error")
      );
    }

    switch (true) {
      case error.response.status >= 400 && error.response.status < 500:
        return Promise.reject(
          new LittlePayError(
            "INVALID_REQUEST",
            getErrorMessage(error, "Invalid request")
          )
        );
      case 500 <= error.response.status:
        return Promise.reject(
          new LittlePayError("SERVER_ERROR", "Server error")
        );
      default:
        return Promise.reject(
          new LittlePayError(
            "UNKNOWN_ERROR",
            getErrorMessage(error, "Unknown error")
          )
        );
    }
  }
);

export { baseAxios };
