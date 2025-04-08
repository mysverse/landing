/**
 * Determines whether a given URL is external.
 *
 * A URL is considered external if:
 * - It starts with a protocol-relative prefix (e.g., "//example.com"), or
 * - It begins with a valid protocol scheme (e.g., "http:", "https:", "mailto:", etc.)
 *
 * @param url - The URL string to check.
 * @returns True if the URL is external, false if it is relative.
 */
export function isExternalUrl(url: string): boolean {
  if (!url) return false;
  const trimmedUrl = url.trim();

  // Check for protocol-relative URLs (e.g., "//example.com")
  if (trimmedUrl.startsWith("//")) {
    return true;
  }

  // Check for absolute URLs with a valid scheme using a regular expression.
  // The regex checks for a scheme which must start with a letter,
  // followed by any combination of letters, digits, plus, period, or hyphen, and then a colon.
  return /^[a-z][a-z0-9+-.]*:/i.test(trimmedUrl);
}
