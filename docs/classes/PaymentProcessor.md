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

- [axiosInstance](PaymentProcessor.md#axiosinstance)
- [paymentPayload](PaymentProcessor.md#paymentpayload)
- [reference](PaymentProcessor.md#reference)

### Methods

- [process](PaymentProcessor.md#process)

## Constructors

### constructor

• **new PaymentProcessor**\<`T`\>(`payload`, `reference`, `axiosInstance?`): [`PaymentProcessor`](PaymentProcessor.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaymentProvider`](../modules.md#paymentprovider) |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`ProcessorPayload`](../interfaces/ProcessorPayload.md)\<`T`\> | `undefined` |
| `reference` | `string` | `undefined` |
| `axiosInstance` | `AxiosInstance` | `baseAxios` |

#### Returns

[`PaymentProcessor`](PaymentProcessor.md)\<`T`\>

## Properties

### axiosInstance

• `Private` **axiosInstance**: `AxiosInstance`

___

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
