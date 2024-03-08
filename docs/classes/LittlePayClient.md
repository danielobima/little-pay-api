[@littleapp/little-pay-api](../README.md) / [Exports](../modules.md) / LittlePayClient

# Class: LittlePayClient

Used to interact with the LittlePay API.

## Table of contents

### Constructors

- [constructor](LittlePayClient.md#constructor)

### Properties

- [clientId](LittlePayClient.md#clientid)
- [clientSecret](LittlePayClient.md#clientsecret)
- [deviceDetails](LittlePayClient.md#devicedetails)
- [intent](LittlePayClient.md#intent)
- [paymentProcessor](LittlePayClient.md#paymentprocessor)
- [tokenId](LittlePayClient.md#tokenid)
- [validated](LittlePayClient.md#validated)

### Methods

- [createIntent](LittlePayClient.md#createintent)
- [createPaymentProcessor](LittlePayClient.md#createpaymentprocessor)
- [processPayment](LittlePayClient.md#processpayment)
- [validateDetails](LittlePayClient.md#validatedetails)

## Constructors

### constructor

• **new LittlePayClient**(`params`): [`LittlePayClient`](LittlePayClient.md)

Constructs a new instance of the LittlePayClient class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`LittlePayClientConstructorParams`](../modules.md#littlepayclientconstructorparams) | The parameters for constructing the LittlePayClient. |

#### Returns

[`LittlePayClient`](LittlePayClient.md)

## Properties

### clientId

• `Private` **clientId**: `string`

___

### clientSecret

• `Private` **clientSecret**: `string`

___

### deviceDetails

• `Private` `Optional` **deviceDetails**: [`DeviceDetails`](../modules.md#devicedetails)

___

### intent

• `Private` `Optional` **intent**: [`Intent`](Intent.md)

___

### paymentProcessor

• `Private` `Optional` **paymentProcessor**: [`PaymentProcessor`](PaymentProcessor.md)\<`any`\>

___

### tokenId

• `Private` **tokenId**: `string`

___

### validated

• `Private` **validated**: `boolean` = `false`

## Methods

### createIntent

▸ **createIntent**(`params`): `Promise`\<[`Intent`](Intent.md)\>

Creates a new payment intent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CreateIntentParams`](../modules.md#createintentparams) | The parameters for creating the intent. |

#### Returns

`Promise`\<[`Intent`](Intent.md)\>

- A promise that resolves to the created intent.

___

### createPaymentProcessor

▸ **createPaymentProcessor**\<`T`\>(`payload`, `reference`): [`PaymentProcessor`](PaymentProcessor.md)\<`T`\>

Creates a payment processor with the given payload and reference.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaymentProvider`](../modules.md#paymentprovider) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | [`ProcessorPayload`](../interfaces/ProcessorPayload.md)\<`T`\> | The payload for the payment processor. |
| `reference` | `string` | The reference for the payment processor. |

#### Returns

[`PaymentProcessor`](PaymentProcessor.md)\<`T`\>

- A promise that resolves to the created PaymentProcessor instance.

___

### processPayment

▸ **processPayment**(`options?`): `Promise`\<[`ProcessPaymentResponse`](../modules.md#processpaymentresponse)\>

Processes a payment using the configured payment processor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`PaymentProcessorOptions`](../modules.md#paymentprocessoroptions) | Optional payment processor options. |

#### Returns

`Promise`\<[`ProcessPaymentResponse`](../modules.md#processpaymentresponse)\>

- A promise that resolves to the processed payment response.

**`Throws`**

[LittlePayError](LittlePayError.md) If the intent or payment processor is not set, or if the details are not validated.

___

### validateDetails

▸ **validateDetails**\<`T`\>(`intent`, `paymentProcessor`): `Promise`\<`void`\>

Validates the required details for a given intent and payment processor. Must be called before processing a payment.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaymentProvider`](../modules.md#paymentprovider) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `intent` | [`Intent`](Intent.md) | The intent to validate details for. |
| `paymentProcessor` | [`PaymentProcessor`](PaymentProcessor.md)\<`T`\> | The payment processor to use for validation. |

#### Returns

`Promise`\<`void`\>
