import { BillingAddress } from "./lib/entities/BillingAddress";
import { Intent, CreateIntentParams } from "./lib/entities/Intent";
import { LittlePayClient } from "./lib/entities/LittlePayClient";
import {
  PaymentProcessor,
  PaymentProcessorOptions,
  ProcessPaymentResponse,
  ProcessorPayload,
} from "./lib/entities/PaymentProcessor";
import { LittlePayError } from "./lib/utils/errors";

export { LittlePayClient, LittlePayError, PaymentProcessor, Intent };

export type {
  CreateIntentParams,
  PaymentProcessorOptions,
  ProcessPaymentResponse,
  ProcessorPayload,
  BillingAddress,
};
