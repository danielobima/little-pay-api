import { BillingAddress } from "./lib/entities/BillingAddress";
import { Intent, CreateIntentParams } from "./lib/entities/Intent";
import { LittlePayClient } from "./lib/entities/LittlePayClient";
import {
  PaymentProcessor,
  PaymentProcessorOptions,
  ProcessPaymentResponse,
  ProcessorPayload,
  CardDetails,
  PaymentProvider,
} from "./lib/entities/PaymentProcessor";
import { LittlePayError } from "./lib/utils/errors";
import {
  cardValidation,
  paymentPayloadValidator,
} from "./lib/utils/validation";

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
