[@littleapp/little-pay-api](README.md) / Exports

# @littleapp/little-pay-api

## Table of contents

### Classes

- [Intent](classes/Intent.md)
- [LittlePayClient](classes/LittlePayClient.md)
- [LittlePayError](classes/LittlePayError.md)
- [PaymentProcessor](classes/PaymentProcessor.md)

### Interfaces

- [ProcessorPayload](interfaces/ProcessorPayload.md)

### Type Aliases

- [BillingAddress](modules.md#billingaddress)
- [CardDetails](modules.md#carddetails)
- [CreateIntentParams](modules.md#createintentparams)
- [DeviceDetails](modules.md#devicedetails)
- [ErrorCode](modules.md#errorcode)
- [LittlePayClientConstructorParams](modules.md#littlepayclientconstructorparams)
- [MobilePayload](modules.md#mobilepayload)
- [PaToken](modules.md#patoken)
- [Payload](modules.md#payload)
- [PaymentProcessorOptions](modules.md#paymentprocessoroptions)
- [PaymentProvider](modules.md#paymentprovider)
- [PaymentStatus](modules.md#paymentstatus)
- [ProcessPaymentResponse](modules.md#processpaymentresponse)

### Functions

- [cardValidation](modules.md#cardvalidation)
- [paymentPayloadValidator](modules.md#paymentpayloadvalidator)

## Type Aliases

### BillingAddress

Ƭ **BillingAddress**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `address1` | `string` | The primary address line for the billing address. |
| `administrativeArea` | `string` | The administrative area/state for the billing address. |
| `country` | `string` | The country for the billing address. |
| `email` | `string` | The email address for the person associated with the billing address. |
| `firstName` | `string` | The first name of the person associated with the billing address. |
| `lastName` | `string` | The last name of the person associated with the billing address. |
| `locality` | `string` | The locality/city for the billing address. |
| `phoneNumber` | `string` | The phone number for the person associated with the billing address. |
| `postalCode` | `string` | The postal code for the billing address. |

___

### CardDetails

Ƭ **CardDetails**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cc_cvv` | `string` |
| `cc_exp` | `string` |
| `cc_name` | `string` |
| `cc_number` | `string` |

___

### CreateIntentParams

Ƭ **CreateIntentParams**: `Object`

Parameters for creating an intent.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | The amount to be paid. |
| `callbackUrl` | `string` | A URL to post the results of the payment to. The payload format can be found at [https://pay.little.africa/documentation/docs/intro/](https://pay.little.africa/documentation/docs/intro/) |
| `currency` | `string` | The currency to be used for the payment. Must be a valid ISO 4217 currency code [https://en.wikipedia.org/wiki/ISO_4217](https://en.wikipedia.org/wiki/ISO_4217). Example: "KES". Currencies are enabled and disabled in the LittlePay dashboard. [https://pay.little.africa/](https://pay.little.africa/) |
| `description` | `string` | A description of the payment. |
| `expiresAt?` | `number` | The time at which the intent will expire. Must be a Unix timestamp. |
| `key` | `string` | A unique key for the intent. |
| `metadata?` | [`ProcessorPayload`](interfaces/ProcessorPayload.md)\<`any`\> | The metadata for the intent. |
| `payload` | \{ `billingAddress`: [`BillingAddress`](modules.md#billingaddress)  } | The payload for the intent. This is used to pass billing information and any other required data. |
| `payload.billingAddress` | [`BillingAddress`](modules.md#billingaddress) | The billing address for the intent. |
| `returnUrl?` | `string` | If you use the intent checkout page, the user will be redirected to this URL after the payment is completed. If you are not using the intent checkout page but there was a 3DS challenge, the user will be redirected to this URL after the 3DS challenge is completed. |

___

### DeviceDetails

Ƭ **DeviceDetails**: `Object`

Device details collected from a browser.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `httpBrowserColorDepth` | `number` |
| `httpBrowserJavaEnabled` | `boolean` |
| `httpBrowserJavaScriptEnabled` | `boolean` |
| `httpBrowserLanguage` | `string` |
| `httpBrowserScreenHeight` | `number` |
| `httpBrowserScreenWidth` | `number` |
| `httpBrowserTimeDifference` | `number` |

___

### ErrorCode

Ƭ **ErrorCode**: ``"INVALID_REQUEST"`` \| ``"SERVER_ERROR"`` \| ``"NETWORK_ERROR"`` \| ``"PAYMENT_FAILED"`` \| ``"INVALID_DATA"`` \| ``"UNKNOWN_ERROR"``

Possible error codes

___

### LittlePayClientConstructorParams

Ƭ **LittlePayClientConstructorParams**: `Object`

Parameters for constructing a LittlePayClient instance. All values are available in the LittlePay dashboard.

[https://pay.little.africa/](https://pay.little.africa/)

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientId` | `string` | The client ID for the LittlePay API. |
| `clientSecret` | `string` | The client secret for the LittlePay API. |
| `tokenId` | `string` | The token ID for the LittlePay API. |

___

### MobilePayload

Ƭ **MobilePayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mobile` | `string` |

___

### PaToken

Ƭ **PaToken**: `Object`

Access token and device data collection URL for collecting device details.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |
| `deviceDataCollectionUrl` | `string` |
| `referenceId` | `string` |
| `token` | `string` |

___

### Payload

Ƭ **Payload**\<`T`\>: `T` extends ``"MPESA"`` \| ``"MTN"`` ? [`MobilePayload`](modules.md#mobilepayload) : `T` extends ``"CARDS"`` ? [`CardDetails`](modules.md#carddetails) : `never`

Details required by the payment provider

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`PaymentProvider`](modules.md#paymentprovider) | The payment provider type |

___

### PaymentProcessorOptions

Ƭ **PaymentProcessorOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `longPoll?` | `boolean` | - |
| `stepUpHandler?` | (`url`: `string`, `token`: `string`) => `any` | - |
| `stepUpTarget?` | `string` | Where to display the step up page **`Default`** ```ts "_blank" ``` |

___

### PaymentProvider

Ƭ **PaymentProvider**: ``"MPESA"`` \| ``"CARDS"`` \| ``"MTN"``

___

### PaymentStatus

Ƭ **PaymentStatus**: ``"COMPLETED"`` \| ``"PENDING"`` \| ``"FAILED"``

The possible payment statuses for a processed payment.

___

### ProcessPaymentResponse

Ƭ **ProcessPaymentResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `meta` | \{ `amount`: `number` ; `currency`: `string` ; `description`: `string` ; `provider`: `string` ; `providerReference`: `string` ; `reference`: `string`  } |
| `meta.amount` | `number` |
| `meta.currency` | `string` |
| `meta.description` | `string` |
| `meta.provider` | `string` |
| `meta.providerReference` | `string` |
| `meta.reference` | `string` |
| `status` | [`PaymentStatus`](modules.md#paymentstatus) |

## Functions

### cardValidation

▸ **cardValidation**(`field`, `value`): `Verification`

Validates the given value based on the specified card field.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `field` | keyof [`CardDetails`](modules.md#carddetails) | The card field to validate. |
| `value` | `string` | The value to be validated. |

#### Returns

`Verification`

- The validation result.

**`Throws`**

[LittlePayError](classes/LittlePayError.md) If the card field is invalid.

___

### paymentPayloadValidator

▸ **paymentPayloadValidator**\<`T`\>(`payload`): [`ProcessorPayload`](interfaces/ProcessorPayload.md)\<`T`\>

Validates the payment payload based on the specified payment provider.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`PaymentProvider`](modules.md#paymentprovider) | The type of the payment provider. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`ProcessorPayload`](interfaces/ProcessorPayload.md)\<`T`\> | The payment payload to be validated. |

#### Returns

[`ProcessorPayload`](interfaces/ProcessorPayload.md)\<`T`\>

- The validated payment payload.

**`Throws`**

[LittlePayError](classes/LittlePayError.md) If the payment payload is invalid.
