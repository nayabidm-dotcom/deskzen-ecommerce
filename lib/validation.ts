export const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
export const isValidPhone = (s: string) => /^[6-9]\d{9}$/.test(s.trim());
export const isValidPincode = (s: string) => /^[1-9][0-9]{5}$/.test(s.trim());
export const isNonEmpty = (s: string) => s.trim().length > 0;

export interface ValidationResult { ok: boolean; errors: Record<string, string>; }

export function validateCheckout(data: {
  customerName?: string; email?: string; mobile?: string;
  house?: string; street?: string; area?: string;
  city?: string; state?: string; pincode?: string;
  paymentMethod?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};
  if (!isNonEmpty(data.customerName || '')) errors.customerName = 'Full name is required.';
  if (!isValidEmail(data.email || '')) errors.email = 'Enter a valid email address.';
  if (!isValidPhone(data.mobile || '')) errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  if (!isNonEmpty(data.house || '')) errors.house = 'House / flat number is required.';
  if (!isNonEmpty(data.street || '')) errors.street = 'Street is required.';
  if (!isNonEmpty(data.area || '')) errors.area = 'Area / locality is required.';
  if (!isNonEmpty(data.city || '')) errors.city = 'City is required.';
  if (!isNonEmpty(data.state || '')) errors.state = 'State is required.';
  if (!isValidPincode(data.pincode || '')) errors.pincode = 'Enter a valid 6-digit PIN code.';
  if (!isNonEmpty(data.paymentMethod || '')) errors.paymentMethod = 'Select a payment method.';
  return { ok: Object.keys(errors).length === 0, errors };
}

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
];