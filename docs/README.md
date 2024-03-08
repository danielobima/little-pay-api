@littleapp/little-pay-api / [Exports](modules.md)

# Quickstart

Welcome to the Little Pay API client library documentation. This library allows you to interact with the Little Pay API. It is built to be used in a browser environment. You can access the full documentation [here](https://pay.little.africa/documentation).

## Installation

You can install the client library using npm:

```bash
npm install @littlepay/little-pay-api
```

## Usage

### Initialize the client

To use the client library, you need to import it into your application and initialize it with your `clientId`, `clientSecret` and `tokenId`. You can then use the library to interact with the Little Pay API.

```javascript
import { LittlePayClient } from "@littlepay/little-pay-api";

const client = new LittlePayClient({
  clientId: "81af9dffa51f6059",
  clientSecret: "f9oNskEf6kiOZk/GZiARPw==",
  tokenId: "9f252db9-dfbd-4af6-be88-24f1635c5de3",
});
```

### Create a payment intent

You can use the client library to create a payment intent. This will return a payment intent object that you can use to process a payment.

```javascript
const intent = await client.createIntent({
  amount: 1,
  callbackUrl: "https://example.com",
  currency: "KES",
  description: "Test payment",
  expiresAt: 1,
  key: new Date().getTime().toString(), //A unique alphanumeric string that you can use to identify the payment intent
  payload: {
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      address1: "1 Market St",
      locality: "Nairobi",
      administrativeArea: "Nairobi",
      postalCode: "00100",
      country: "Kenya",
      email: "test@cybs.com",
      phoneNumber: "254712345678",
    },
  },
  returnUrl: "https://example.com",
});
```

### Process a payment

#### Option 1: Redirect the user to our hosted checkout page

You can redirect the user to our hosted checkout page to process the payment. You will receive the payment status and details on the `callbackUrl` you provided when creating the payment intent.

```javascript
intent.redirectToCheckout();
```

#### Option 2: Process the payment using your own checkout page

You can use the payment intent object to process the payment using your own checkout page. You will receive the payment status and details on the `callbackUrl` you provided when creating the payment intent.

```javascript
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

const response = await client.processPayment();
```

### Handle the payment response

You can handle the payment response using the `callbackUrl` you provided when creating the payment intent. The response will contain the payment status and details.

```javascript
app.post("/callback", (req, res) => {
  const { status, reference, currency, provider, amount, key } = req.body;
  // Handle the payment response
});
```
