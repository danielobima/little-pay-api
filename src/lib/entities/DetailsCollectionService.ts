import { PaToken } from "./PaToken.js";

export type DeviceDetails = {
  httpBrowserColorDepth: number;
  httpBrowserJavaEnabled: boolean;
  httpBrowserJavaScriptEnabled: boolean;
  httpBrowserLanguage: string;
  httpBrowserScreenHeight: number;
  httpBrowserScreenWidth: number;
  httpBrowserTimeDifference: number;
};
export class DetailsCollectionService {
  private paToken: PaToken;
  constructor(paToken: PaToken) {
    this.paToken = paToken;
  }

  async collectDetails(): Promise<DeviceDetails> {
    const details = {
      httpBrowserColorDepth: screen.colorDepth,
      httpBrowserJavaEnabled: false,
      httpBrowserJavaScriptEnabled: true,
      httpBrowserLanguage: navigator.language,
      httpBrowserScreenHeight: screen.height,
      httpBrowserScreenWidth: screen.width,
      httpBrowserTimeDifference: new Date().getTimezoneOffset(),
    };

    const form = document.createElement("form");
    form.id = "deviceDataCollectionForm";
    form.method = "POST";
    form.action = this.paToken.deviceDataCollectionUrl;
    form.style.display = "none";
    form.target = "collectionIframe";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "JWT";
    input.value = this.paToken.accessToken;
    input.id = "cardinal_collection_form_input";
    form.appendChild(input);

    const iframe = document.createElement("iframe");
    iframe.name = "collectionIframe";
    iframe.style.display = "none";
    iframe.id = "cardinal_collection_iframe";
    iframe.width = "10";
    iframe.height = "10";

    document.body.appendChild(form);
    document.body.appendChild(iframe);
    form.submit();

    return new Promise((resolve) => {
      window.addEventListener("message", (event) => {
        if (event.origin === "https://centinelapistag.cardinalcommerce.com") {
          console.log("Device details collected successfully");
          resolve(details);
        }
      });

      setTimeout(() => {
        resolve(details);
      }, 10000);
    });
  }
}
