import { baseAxios } from "../utils/axios";

export type PaymentProvider = "MPESA" | "CARDS";

export type MpesaPayload = {
  mobile: string;
};

export type CardsPayload = {
  cc_number: string;
  cc_name: string;
  cc_cvv: string;
  cc_exp: string;
};

type Payload<T extends PaymentProvider> = T extends "MPESA"
  ? MpesaPayload
  : T extends "CARDS"
  ? CardsPayload
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
};
export class PaymentProcessor<T extends PaymentProvider> {
  paymentPayload: ProcessorPayload<T>;
  private reference: string;

  constructor(payload: ProcessorPayload<T>, reference: string) {
    //TODO: Add client side validation
    this.paymentPayload = payload;
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
