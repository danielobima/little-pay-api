[@littleapp/little-pay-api](../README.md) / [Exports](../modules.md) / LittlePayError

# Class: LittlePayError

## Hierarchy

- `Error`

  ↳ **`LittlePayError`**

## Table of contents

### Constructors

- [constructor](LittlePayError.md#constructor)

### Properties

- [code](LittlePayError.md#code)
- [message](LittlePayError.md#message)
- [name](LittlePayError.md#name)
- [stack](LittlePayError.md#stack)
- [prepareStackTrace](LittlePayError.md#preparestacktrace)
- [stackTraceLimit](LittlePayError.md#stacktracelimit)

### Methods

- [captureStackTrace](LittlePayError.md#capturestacktrace)

## Constructors

### constructor

• **new LittlePayError**(`code`, `message`): [`LittlePayError`](LittlePayError.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | [`ErrorCode`](../modules.md#errorcode) |
| `message` | `string` |

#### Returns

[`LittlePayError`](LittlePayError.md)

#### Overrides

Error.constructor

## Properties

### code

• **code**: [`ErrorCode`](../modules.md#errorcode)

___

### message

• **message**: `string`

#### Inherited from

Error.message

___

### name

• **name**: `string`

#### Overrides

Error.name

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace
