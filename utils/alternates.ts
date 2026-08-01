import { routing } from "i18n/routing";

/**
 * hreflang alternates for a locale-prefixed route. Relative URLs are
 * resolved against metadataBase from the root layout.
 */
export function languageAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(
        routing.locales.map((locale) => [locale, `/${locale}${path}`])
      ),
      "x-default": `/${routing.defaultLocale}${path}`
    }
  };
}
