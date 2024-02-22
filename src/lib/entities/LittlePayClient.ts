import { LittlePayError } from "../utils/errors";
import {
  DetailsCollectionService,
  DeviceDetails,
} from "./DetailsCollectionService";
import { EnrollmentService } from "./EnrollmentService";
import { CreateIntentParams, Intent } from "./Intent";
import {
  PaymentProcessor,
  PaymentProcessorOptions,
  PaymentProvider,
  ProcessPaymentResponse,
  ProcessorPayload,
} from "./PaymentProcessor";

/**
 * Parameters for constructing a LittlePayClient instance. All values are available in the LittlePay dashboard.
 *
 * {@link https://pay.little.africa/}
 */
type LittlePayClientConstructorParams = {
  /**
   * The client ID for the LittlePay API.
   */
  clientId: string;
  /**
   * The client secret for the LittlePay API.
   */
  clientSecret: string;
  /**
   * The token ID for the LittlePay API.
   */
  tokenId: string;
};

/**
 * Used to interact with the LittlePay API.
 */
export class LittlePayClient {
  private clientId: string;
  private clientSecret: string;
  private tokenId: string;
  private intent?: Intent;
  private paymentProcessor?: PaymentProcessor<any>;
  private deviceDetails?: DeviceDetails;
  private validated: boolean = false;

  /**
   * Constructs a new instance of the LittlePayClient class.
   * @param {LittlePayClientConstructorParams} params The parameters for constructing the LittlePayClient.
   */
  constructor({
    clientId,
    clientSecret,
    tokenId,
  }: LittlePayClientConstructorParams) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.tokenId = tokenId;
  }

  /**
   * Creates a new payment intent.
   *
   * @param {CreateIntentParams} params The parameters for creating the intent.
   * @returns {Promise<Intent>} A promise that resolves to the created intent.
   */
  async createIntent(params: CreateIntentParams): Promise<Intent> {
    const intent = new Intent(params);
    await intent.create(this.clientId, this.clientSecret, this.tokenId);
    return intent;
  }

  /**
   * Creates a payment processor with the given payload and reference.
   * @param {ProcessorPayload} payload - The payload for the payment processor.
   * @param {string} reference - The reference for the payment processor.
   * @returns {PaymentProcessor} A promise that resolves to the created PaymentProcessor instance.
   */
  createPaymentProcessor<T extends PaymentProvider>(
    payload: ProcessorPayload<T>,
    reference: string
  ): PaymentProcessor<T> {
    return new PaymentProcessor(payload, reference);
  }

  /**
   * Validates the required details for a given intent and payment processor. Must be called before processing a payment.
   *
   * @param intent - The intent to validate details for.
   * @param paymentProcessor - The payment processor to use for validation.
   */
  async validateDetails<T extends PaymentProvider>(
    intent: Intent,
    paymentProcessor: PaymentProcessor<T>
  ) {
    if (paymentProcessor.paymentPayload.type === "CARDS") {
      const paToken =
        intent.paToken ??
        (await intent.createPaToken(
          paymentProcessor.paymentPayload as ProcessorPayload<"CARDS">
        ));
      const detailsCollectionsService = new DetailsCollectionService(paToken);

      await detailsCollectionsService.collectDetails();
      this.deviceDetails = await detailsCollectionsService.collectDetails();
    }
    this.intent = intent;
    this.paymentProcessor = paymentProcessor;
    this.validated = true;
  }

  /**
   * Processes a payment using the configured payment processor.
   * @param options - Optional payment processor options.
   * @returns A promise that resolves to the processed payment response.
   * @throws {LittlePayError} If the intent or payment processor is not set, or if the details are not validated.
   */
  async processPayment(options?: PaymentProcessorOptions) {
    return new Promise<ProcessPaymentResponse>(async (resolve, reject) => {
      if (!this.intent || !this.intent.reference || !this.paymentProcessor) {
        throw new LittlePayError(
          "INVALID_DATA",
          "Intent and Payment Processor not set"
        );
      }
      if (!this.validated) {
        throw new LittlePayError("INVALID_DATA", "Details not validated");
      }
      if (this.paymentProcessor.paymentPayload.type === "CARDS") {
        if (!this.deviceDetails) {
          throw new LittlePayError("INVALID_DATA", "Details not validated");
        }
        const enrollmentService = new EnrollmentService(
          this.intent.reference,
          this.deviceDetails,
          this.paymentProcessor
        );

        this.paymentProcessor.process(options).then(resolve).catch(reject);

        const action = await enrollmentService.checkEnrollment();

        if (action === "AUTHENTICATE") {
          enrollmentService.stepUp(options);
        }
      } else {
        const response = await this.paymentProcessor.process();

        resolve(response);
      }
    });
  }
}
