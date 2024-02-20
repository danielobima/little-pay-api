export type BillingAddress = {
  /**
   * The first name of the person associated with the billing address.
   */
  firstName: string;
  /**
   * The last name of the person associated with the billing address.
   */
  lastName: string;
  /**
   * The primary address line for the billing address.
   */
  address1: string;
  /**
   * The locality/city for the billing address.
   */
  locality: string;
  /**
   * The administrative area/state for the billing address.
   */
  administrativeArea: string;
  /**
   * The postal code for the billing address.
   */
  postalCode: string;
  /**
   * The country for the billing address.
   */
  country: string;
  /**
   * The email address for the person associated with the billing address.
   */
  email: string;
  /**
   * The phone number for the person associated with the billing address.
   */
  phoneNumber: string;
};
