import { BillingAddress } from "./BillingAddress";
import { PaToken } from "./PaToken";
import { baseAxios } from "../utils/axios";
import { ProcessorPayload } from "./PaymentProcessor";
import { LittlePayError } from "../utils/errors";

export type IntentBody = {
  metadata: any & {
    paToken: PaToken;
  };
  merchant?: string;
  expired: boolean;
  id: string;
  amount: number;
  currency: string;
  description: string;
  key: string;
  callbackUrl: string;
  expiresAt: string;
  processed: boolean;
  createdAt: string;
  updatedAt: string;
  tokenId: string;
  invoiceId: string;
};

/**
 * Parameters for creating an intent.
 */
export type CreateIntentParams = {
  /**
   * The amount to be paid.
   */
  amount: number;
  /**
   * The currency to be used for the payment. Must be a valid ISO 4217 currency code {@link https://en.wikipedia.org/wiki/ISO_4217}. Example: "KES".
   *
   * Currencies are enabled and disabled in the LittlePay dashboard.
   *
   * {@link https://pay.little.africa/}
   */
  currency: string;

  /**
   * A description of the payment.
   */
  description: string;
  /**
   * A URL to post the results of the payment to.
   *
   * The payload format can be found at {@link https://pay.little.africa/documentation/docs/intro/}
   */
  callbackUrl: string;

  /**
   * If you use the intent checkout page, the user will be redirected to this URL after the payment is completed.
   */
  returnUrl?: string;

  /**
   * The time at which the intent will expire. Must be a Unix timestamp.
   */
  expiresAt?: number;
  /**
   * A unique key for the intent.
   */
  key: string;
  /**
   * The payload for the intent. This is used to pass billing information and any other required data.
   */
  payload: {
    /**
     * The billing address for the intent.
     */
    billingAddress: BillingAddress;
  };
  /**
   * The metadata for the intent.
   */
  metadata?: ProcessorPayload<any>;
};

export type CreateIntentResponse = {
  date: string;
  data: {
    reference: string;
    checkoutUrl: string;
    message: string;
    paToken?: PaToken;
  };
};

export class Intent {
  private creationParams: CreateIntentParams;
  private checkoutUrl?: string;
  private reference?: string;
  private paToken?: PaToken;

  constructor(params: CreateIntentParams) {
    this.creationParams = params;
  }

  /**
   * Get the intent reference.
   *
   * @throws {LittlePayError} If the reference is not available.
   * @returns {string} The intent reference
   */
  getReference(): string {
    if (!this.reference) {
      throw new LittlePayError("INVALID_DATA", "Reference not available");
    }

    return this.reference;
  }

  /**
   * Get the PaToken.
   * @returns {string} The PaToken
   */
  getPaToken(): PaToken | undefined {
    return this.paToken;
  }

  async create(
    clientId: string,
    clientSecret: string,
    tokenId: string
  ): Promise<{
    reference: string;
    checkoutUrl: string;
    message: string;
  }> {
    const response = await baseAxios.post<CreateIntentResponse>(
      `/api/payments/${tokenId}/pay`,
      this.creationParams,
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    const { paToken, reference, checkoutUrl, message } = response.data.data;

    if (paToken) {
      this.paToken = paToken;
    }

    this.reference = reference;
    this.checkoutUrl = checkoutUrl;

    return {
      reference,
      checkoutUrl,
      message,
    };
  }

  /**
   * Get the checkout URL.
   * @returns {string} The checkout URL
   * @throws {LittlePayError} Will throw an error if the checkout URL is not available.
   */
  getCheckoutUrl(): string {
    if (!this.checkoutUrl) {
      throw new LittlePayError("INVALID_DATA", "Checkout URL not available");
    }

    return this.checkoutUrl;
  }

  /**
   * Redirects the user to the checkout page. If you set a return URL when creating the intent, the user will be redirected to that URL after the payment is completed.
   * @throws {LittlePayError} If the checkout URL is not available.
   */
  redirectToCheckout(): void {
    if (!this.checkoutUrl) {
      throw new LittlePayError("SERVER_ERROR", "Checkout URL not available");
    }

    window.location.assign(this.checkoutUrl);
  }

  async createPaToken(params: ProcessorPayload<"CARDS">): Promise<PaToken> {
    if (!this.reference) {
      throw new LittlePayError("INVALID_REQUEST", "Reference not available");
    }

    const response = await baseAxios.post<CreateIntentResponse>(
      `/pay/${this.reference}/cspaToken`,
      params
    );

    const { paToken } = response.data?.data ?? {};

    if (!paToken) {
      throw new LittlePayError("SERVER_ERROR", "PaToken not available");
    }

    return paToken;
  }
}
