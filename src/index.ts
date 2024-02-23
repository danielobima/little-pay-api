import { BillingAddress } from "./lib/entities/BillingAddress.js";
import { Intent, CreateIntentParams } from "./lib/entities/Intent.js";
import { LittlePayClient } from "./lib/entities/LittlePayClient.js";
import {
  PaymentProcessor,
  PaymentProcessorOptions,
  ProcessPaymentResponse,
  ProcessorPayload,
  CardDetails,
  PaymentProvider,
} from "./lib/entities/PaymentProcessor.js";
import { LittlePayError } from "./lib/utils/errors.js";
import {
  cardValidation,
  paymentPayloadValidator,
} from "./lib/utils/validation.js";

export {
  LittlePayClient,
  LittlePayError,
  PaymentProcessor,
  Intent,
  paymentPayloadValidator,
  cardValidation,
};

export type {
  CreateIntentParams,
  PaymentProcessorOptions,
  ProcessPaymentResponse,
  ProcessorPayload,
  BillingAddress,
  PaymentProvider,
  CardDetails,
};
