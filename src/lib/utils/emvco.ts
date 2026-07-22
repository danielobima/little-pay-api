export function crc16ccitt(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    let x = (crc >> 8) ^ data.charCodeAt(i);
    x ^= x >> 4;
    crc = (crc << 8) ^ (x << 12) ^ (x << 5) ^ x;
    crc &= 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function getCurrencyNumericCode(currency: string): string {
  const map: Record<string, string> = {
    KES: '404',
    USD: '840',
    GHS: '936',
    TZS: '834',
    UGX: '800'
  };
  return map[currency] || '840';
}

export function generateEmvcoString(
  payloadFormatIndicator: string,
  pointOfInitiationMethod: string,
  merchantAccountInformation: Map<string, string>,
  merchantCategoryCode: string,
  transactionCurrency: string,
  transactionAmount: string,
  countryCode: string,
  merchantName: string,
  merchantCity: string,
  additionalDataFieldTemplate?: string
): string {
  let emvString = '';

  const addItem = (id: string, value: string) => {
    const length = value.length.toString().padStart(2, '0');
    emvString += id + length + value;
  };

  addItem('00', payloadFormatIndicator); // Payload Format Indicator
  addItem('01', pointOfInitiationMethod); // Point of Initiation Method

  // Merchant Account Information (IDs 02-51)
  // Merchant Account Information (ID 26)
  let merchantAccountInfoString = '';
  merchantAccountInformation.forEach((value, key) => {
    const length = value.length.toString().padStart(2, '0');
    merchantAccountInfoString += key + length + value;
  });
  addItem('26', merchantAccountInfoString);

  addItem('52', merchantCategoryCode); // Merchant Category Code
  addItem('53', transactionCurrency); // Transaction Currency
  if (transactionAmount) {
    addItem('54', transactionAmount); // Transaction Amount
  }
  addItem('58', countryCode); // Country Code
  addItem('59', merchantName); // Merchant Name
  addItem('60', merchantCity); // Merchant City

  if (additionalDataFieldTemplate) {
    addItem('62', additionalDataFieldTemplate);
  }

  // CRC (ID 63)
  const crcId = '63';
  const crcLength = '04';
  emvString += crcId + crcLength;

  const crcValue = crc16ccitt(emvString);
  return emvString + crcValue;
}
