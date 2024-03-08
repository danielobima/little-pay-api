[@littleapp/little-pay-api](../README.md) / [Exports](../modules.md) / PaymentProcessor

# Class: PaymentProcessor\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaymentProvider`](../modules.md#paymentprovider) |

## Table of contents

### Constructors

- [constructor](PaymentProcessor.md#constructor)

### Properties

- [paymentPayload](PaymentProcessor.md#paymentpayload)
- [reference](PaymentProcessor.md#reference)

### Methods

- [process](PaymentProcessor.md#process)

## Constructors

### constructor

• **new PaymentProcessor**\<`T`\>(`payload`, `reference`): [`PaymentProcessor`](PaymentProcessor.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaymentProvider`](../modules.md#paymentprovider) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [`ProcessorPayload`](../interfaces/ProcessorPayload.md)\<`T`\> |
| `reference` | `string` |

#### Returns

[`PaymentProcessor`](PaymentProcessor.md)\<`T`\>

## Properties

### paymentPayload

• **paymentPayload**: [`ProcessorPayload`](../interfaces/ProcessorPayload.md)\<`T`\>

___

### reference

• `Private` **reference**: `string`

## Methods

### process

▸ **process**(`options?`): `Promise`\<[`ProcessPaymentResponse`](../modules.md#processpaymentresponse)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PaymentProcessorOptions`](../modules.md#paymentprocessoroptions) |

#### Returns

`Promise`\<[`ProcessPaymentResponse`](../modules.md#processpaymentresponse)\>
