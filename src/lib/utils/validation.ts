import parse from "libphonenumber-js";
import {
  CardDetails,
  PaymentProvider,
  ProcessorPayload,
} from "../entities/PaymentProcessor.js";
import { LittlePayError } from "./errors.js";
import cardValidator from "card-validator";

const humanReadableCardFields = {
  cc_number: "Card Number",
  cc_name: "Card Name",
  cc_cvv: "CVV",
  cc_exp: "Expiry Date",
};

/**
 * Validates the given value based on the specified card field.
 * @param field - The card field to validate.
 * @param value - The value to be validated.
 * @returns - The validation result.
 * @throws {@link LittlePayError} If the card field is invalid.
 */
export const cardValidation = (field: keyof CardDetails, value: string) => {
  switch (field) {
    case "cc_number":
      return cardValidator.number(value);
    case "cc_name":
      return cardValidator.cardholderName(value);
    case "cc_cvv":
      return cardValidator.cvv(value);
    case "cc_exp":
      return cardValidator.expirationDate(value);
    default:
      throw new LittlePayError("INVALID_DATA", "Invalid card field");
  }
};

/**
 * Validates the payment payload based on the specified payment provider.
 * @template T - The type of the payment provider.
 * @param payload - The payment payload to be validated.
 * @returns - The validated payment payload.
 * @throws {@link LittlePayError} If the payment payload is invalid.
 */
export const paymentPayloadValidator = <T extends PaymentProvider>(
  payload: ProcessorPayload<T>
): ProcessorPayload<T> => {
  switch (payload.type) {
    case "AIRTEL":
    case "MTN":
    case "MPESA":
    case "TIGOPESA":
      const mpesaPayload: ProcessorPayload<
        "MPESA" | "MTN" | "AIRTEL" | "TIGOPESA"
      > = payload as ProcessorPayload<"MPESA" | "MTN" | "AIRTEL" | "TIGOPESA">;

      const mobile = mpesaPayload?.payment?.mobile;
      if (!mobile?.startsWith("+")) {
        throw new LittlePayError(
          "INVALID_DATA",
          "Mobile number should start with +"
        );
      }
      const parsed = parse(mpesaPayload?.payment?.mobile ?? "");
      if (!parsed?.isValid()) {
        throw new LittlePayError("INVALID_DATA", "Invalid mobile number");
      }
      return {
        type: payload.type,
        payment: {
          mobile: `${parsed.countryCallingCode}${parsed.nationalNumber}`,
        },
      } as ProcessorPayload<T>;

    case "CARDS":
      const cardPayload: ProcessorPayload<"CARDS"> =
        payload as ProcessorPayload<"CARDS">;

      Object.keys(cardPayload.payment).forEach((field) => {
        const result = cardValidation(
          field as keyof CardDetails,
          cardPayload.payment[field as keyof CardDetails]
        );
        if (!result.isValid) {
          throw new LittlePayError(
            "INVALID_DATA",
            "Invalid " + humanReadableCardFields[field as keyof CardDetails]
          );
        }
      });

      return {
        type: "CARDS",
        payment: {
          cc_number: cardPayload.payment.cc_number,
          cc_name: cardPayload.payment.cc_name,
          cc_cvv: cardPayload.payment.cc_cvv,
          cc_exp: cardPayload.payment.cc_exp,
        },
      } as ProcessorPayload<T>;

    default:
      throw new LittlePayError("INVALID_DATA", "Invalid payment type");
  }
};
