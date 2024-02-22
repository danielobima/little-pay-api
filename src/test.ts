import { LittlePayClient } from ".";

const client = new LittlePayClient({
  clientId: "81af9dffa51f6059",
  clientSecret: "f9oNskEf6kiOZk/GZiARPw==",
  tokenId: "9f252db9-dfbd-4af6-be88-24f1635c5de3",
});

const form = document.getElementById("form");
if (form) {
  form.onsubmit = async (e) => {
    e.preventDefault();

    try {
      const confirmButton = document.getElementById("confirm-button");
      confirmButton!.innerHTML = "Please wait .... ";
      confirmButton!.setAttribute("disabled", "true");
      form.classList.add("hide");
      confirmForm!.classList.remove("hide");
      const formData = new FormData(e.target as HTMLFormElement);

      const cc_number = formData.get("cc_number")?.toString() ?? "";
      const cc_cvv = formData.get("cc_cvv")?.toString() ?? "";
      const cc_exp = formData.get("cc_exp")?.toString() ?? "";
      const cc_name = formData.get("cc_name")?.toString() ?? "";

      const intent = await client.createIntent({
        amount: 1,
        callbackUrl: "https://google.com",
        currency: "KES",
        description: "Test payment",
        expiresAt: 1,
        key: new Date().getTime().toString(),
        metadata: {
          type: "CARDS",
          payment: {
            cc_number,
            cc_cvv,
            cc_exp,
            cc_name,
          },
        },
        payload: {
          billingAddress: {
            firstName: "DANIEL",
            lastName: "MAINA",
            address1: "1 Market St",
            locality: "Nairobi",
            administrativeArea: "Nairobi",
            postalCode: "94105",
            country: "Kenya",
            email: "test@cybs.com",
            phoneNumber: "254712345678",
          },
        },
        returnUrl: "https://google.com",
      });

      const paymentProcessor = client.createPaymentProcessor(
        {
          type: "CARDS",
          payment: {
            cc_number,
            cc_cvv,
            cc_exp,
            cc_name,
          },
        },
        intent.getReference()
      );

      await client.validateDetails(intent, paymentProcessor);

      confirmButton!.innerHTML = "Confirm";
      confirmButton!.removeAttribute("disabled");
    } catch (error: any) {
      alert(error.message);
    }
  };
}

const confirmForm = document.getElementById("confirm");
if (confirmForm) {
  confirmForm.onsubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await client.processPayment({
        longPoll: true,
        stepUpHandler: (url, token) => {
          console.log(url, token);
        },
      });

      console.log(response);

      alert(response.message);
    } catch (error: any) {
      alert(error.message);
    }
  };
}
