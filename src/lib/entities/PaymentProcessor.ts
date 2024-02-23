import { baseAxios } from "../utils/axios.js";
import { paymentPayloadValidator } from "../utils/validation.js";

export type PaymentProvider = "MPESA" | "CARDS";
type MpesaPayload = {
  mobile: string;
};
export type CardDetails = {
  cc_number: string;
  cc_name: string;
  cc_cvv: string;
  cc_exp: string;
};

type Payload<T extends PaymentProvider> = T extends "MPESA"
  ? MpesaPayload
  : T extends "CARDS"
  ? CardDetails
  : never;
export interface ProcessorPayload<T extends PaymentProvider> {
  type: T;
  payment: Payload<T>;
}
export type PaymentStatus = "COMPLETED" | "PENDING" | "FAILED";
export type ProcessPaymentResponse = {
  status: PaymentStatus;
  message: string;
  meta: {
    provider: string;
    providerReference: string;
    amount: number;
    currency: string;
    description: string;
    reference: string;
  };
};

export type PaymentProcessorOptions = {
  longPoll?: boolean;
  /**
   * Where to display the step up page
   * @default "_blank"
   */
  stepUpTarget?: string;

  /**
   * This option will override the default authentication step up behavior
   * @default undefined
   */
  stepUpHandler?: (url: string, token: string) => any;
};
export class PaymentProcessor<T extends PaymentProvider> {
  paymentPayload: ProcessorPayload<T>;
  private reference: string;

  constructor(payload: ProcessorPayload<T>, reference: string) {
    //TODO: Add client side validation

    this.paymentPayload = paymentPayloadValidator(payload);
    this.reference = reference;
  }

  async process(
    options: PaymentProcessorOptions = {
      longPoll: true,
    }
  ): Promise<ProcessPaymentResponse> {
    const response = await baseAxios.post<{
      data: ProcessPaymentResponse;
    }>(`/pay/${this.reference}/process`, this.paymentPayload, {
      params: {
        longPoll: options?.longPoll,
      },
    });

    return response.data.data;
  }
}
