import { baseAxios } from "../utils/axios";
import { LittlePayError } from "../utils/errors";
import { DeviceDetails } from "./DetailsCollectionService";
import { PaymentProcessor, PaymentProcessorOptions } from "./PaymentProcessor";

export type PaymentAuthActions = "MAKE_PAYMENT" | "AUTHENTICATE" | "FAILED";

// export type Size = {
//   Width: number;
//   Height: number;
// };

export class EnrollmentService {
  private deviceDetails: DeviceDetails;
  private paymentProcessor: PaymentProcessor<"CARDS">;
  private reference: string;
  private stepUpUrl?: string;
  private accessToken?: string;

  constructor(
    reference: string,
    deviceDetails: DeviceDetails,
    paymentProcessor: PaymentProcessor<"CARDS">
  ) {
    if (paymentProcessor.paymentPayload.type !== "CARDS") {
      throw new LittlePayError("INVALID_DATA", "Invalid payment type");
    }
    this.deviceDetails = deviceDetails;
    this.paymentProcessor = paymentProcessor;
    this.reference = reference;
  }

  async checkEnrollment(): Promise<string> {
    const response = await baseAxios.post<{
      data: {
        action: PaymentAuthActions;
        accessToken?: string;
        stepUpUrl?: string;
      };
    }>(`/pay/${this.reference}/enroll`, {
      deviceInformation: this.deviceDetails,
      ...this.paymentProcessor.paymentPayload,
    });

    const { stepUpUrl, accessToken, action } = response.data.data;

    if (action === "AUTHENTICATE") {
      this.stepUpUrl = stepUpUrl;

      this.accessToken = accessToken;
    }

    return action;
  }

  async stepUp(options?: PaymentProcessorOptions): Promise<any> {
    if (options?.stepUpHandler) {
      return options.stepUpHandler(this.stepUpUrl!, this.accessToken!);
    }
    if (!this.stepUpUrl || !this.accessToken) {
      throw new LittlePayError("INVALID_DATA", "Step up URL not available");
    }

    const form = document.createElement("form");
    form.id = "stepUpForm";
    form.method = "POST";
    form.action = this.stepUpUrl;
    form.target = options?.stepUpTarget ?? "_blank";

    const jwtInput = document.createElement("input");
    jwtInput.type = "hidden";
    jwtInput.name = "JWT";
    jwtInput.value = this.accessToken;
    form.appendChild(jwtInput);

    const mdInput = document.createElement("input");
    mdInput.type = "hidden";
    mdInput.name = "MD";
    mdInput.value = this.reference;
    form.appendChild(mdInput);

    document.body.appendChild(form);

    form.submit();

    return new Promise((resolve, reject) => {
      window.addEventListener("message", (event) => {
        if (event.data?.action && event.data.action === "MAKE_PAYMENT") {
          resolve(event.data.action);
        } else {
          reject(new LittlePayError("UNKNOWN_ERROR", "Unknown error occurred"));
        }
      });
    });
  }
}
