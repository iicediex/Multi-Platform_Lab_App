export function normalizePhone(input?: string | null): string | null {
  if (!input) return null;
  const digits = String(input).replace(/\D/g, '');
  return digits === '' ? null : digits;
}

export function isValidPhone10(digits?: string | null): boolean {
  return typeof digits === 'string' && /^\d{10}$/.test(digits);
}