[@littleapp/little-pay-api](../README.md) / [Exports](../modules.md) / Intent

# Class: Intent

## Table of contents

### Constructors

- [constructor](Intent.md#constructor)

### Properties

- [checkoutUrl](Intent.md#checkouturl)
- [creationParams](Intent.md#creationparams)
- [paToken](Intent.md#patoken)
- [reference](Intent.md#reference)

### Methods

- [create](Intent.md#create)
- [createPaToken](Intent.md#createpatoken)
- [getCheckoutUrl](Intent.md#getcheckouturl)
- [getPaToken](Intent.md#getpatoken)
- [getReference](Intent.md#getreference)
- [redirectToCheckout](Intent.md#redirecttocheckout)

## Constructors

### constructor

• **new Intent**(`params`): [`Intent`](Intent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CreateIntentParams`](../modules.md#createintentparams) |

#### Returns

[`Intent`](Intent.md)

## Properties

### checkoutUrl

• `Private` `Optional` **checkoutUrl**: `string`

___

### creationParams

• `Private` **creationParams**: [`CreateIntentParams`](../modules.md#createintentparams)

___

### paToken

• `Private` `Optional` **paToken**: [`PaToken`](../modules.md#patoken)

___

### reference

• `Private` `Optional` **reference**: `string`

## Methods

### create

▸ **create**(`clientId`, `clientSecret`, `tokenId`): `Promise`\<\{ `checkoutUrl`: `string` ; `message`: `string` ; `reference`: `string`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `clientId` | `string` |
| `clientSecret` | `string` |
| `tokenId` | `string` |

#### Returns

`Promise`\<\{ `checkoutUrl`: `string` ; `message`: `string` ; `reference`: `string`  }\>

___

### createPaToken

▸ **createPaToken**(`params`): `Promise`\<[`PaToken`](../modules.md#patoken)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ProcessorPayload`](../interfaces/ProcessorPayload.md)\<``"CARDS"``\> |

#### Returns

`Promise`\<[`PaToken`](../modules.md#patoken)\>

___

### getCheckoutUrl

▸ **getCheckoutUrl**(): `string`

Get the checkout URL.

#### Returns

`string`

- The checkout URL

**`Throws`**

[LittlePayError](LittlePayError.md) Will throw an error if the checkout URL is not available.

___

### getPaToken

▸ **getPaToken**(): `undefined` \| [`PaToken`](../modules.md#patoken)

Get the PaToken.

#### Returns

`undefined` \| [`PaToken`](../modules.md#patoken)

- The PaToken

___

### getReference

▸ **getReference**(): `string`

Get the intent reference.

#### Returns

`string`

- The intent reference

**`Throws`**

[LittlePayError](LittlePayError.md) If the reference is not available.

___

### redirectToCheckout

▸ **redirectToCheckout**(): `void`

Redirects the user to the checkout page. If you set a return URL when creating the intent, the user will be redirected to that URL after the payment is completed.

#### Returns

`void`

**`Throws`**

[LittlePayError](LittlePayError.md) If the checkout URL is not available.
