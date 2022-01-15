/**
 * @file Address model.
 * @author jquirossoto
 */

export default interface Address {
  street: string;
  buildingNumber?: string;
  city: string;
  state: string;
  countryCode: string;
  postalCode: string;
}
