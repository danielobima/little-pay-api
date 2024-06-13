import { LittlePayClient } from ".";

const client = new LittlePayClient({
  clientId: "50483af9f53ab972",
  clientSecret: "G23BKJocOUwauPU0BwmaLw==",
  tokenId: "70f7c0ff-95c1-49b0-b263-9d7ff8f22767",
});

let reference = "";

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
        // metadata: {
        //   authenticationRedirectUrl: "https://pay.little.africa",
        // },
      });

      reference = intent.getReference();

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
        stepUpHandler: async function stepup(url, token) {
          const form = document.createElement("form");
          form.id = "stepUpForm";
          form.method = "POST";
          form.action = url;
          form.target = "_blank"; //the name property of an iframe element

          // document.getElementById("si")?.classList.remove("hide"); //an iframe element

          const jwtInput = document.createElement("input");
          jwtInput.type = "hidden";
          jwtInput.name = "JWT";
          jwtInput.value = token;
          form.appendChild(jwtInput);
          const mdInput = document.createElement("input");
          mdInput.type = "hidden";
          mdInput.name = "MD";
          mdInput.value = reference;
          form.appendChild(mdInput);
          document.body.appendChild(form);
          form.submit();
          const result = await new Promise((resolve, reject) => {
            window.addEventListener("message", (event) => {
              console.log(event.origin);
              if (event.data.action) {
                if (
                  event.data.action === "MAKE_PAYMENT" &&
                  event.origin === "https://pay.little.africa"
                ) {
                  console.log("Authentication successful");
                  resolve(event.data.action);
                } else {
                  console.log(event.data);
                  reject(new Error("Failed"));
                }
              }
            });
          });
        },
      });

      console.log(response);

      alert(response.message);
    } catch (error: any) {
      alert(error.message);
    }
  };
}
