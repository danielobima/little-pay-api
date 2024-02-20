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

export type ProcessorPayload =
  | {
      type: "MPESA";
      payment: MpesaPayload;
    }
  | {
      type: "CARDS";
      payment: CardsPayload;
    };

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
export class PaymentProcessor {
  paymentPayload: ProcessorPayload;
  private reference: string;

  constructor(payload: ProcessorPayload, reference: string) {
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
