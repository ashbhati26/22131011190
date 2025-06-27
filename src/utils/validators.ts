export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isValidShortcode(code: string): boolean {
  const alphanumeric = /^[a-zA-Z0-9]+$/;
  return alphanumeric.test(code);
}
