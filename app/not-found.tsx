import "styles/globals.css";

import Link from "next/link";
import { THEME_INIT_SCRIPT } from "utils/themeInit";

/**
 * Root 404 for paths outside the locale tree. The locale layout (fonts,
 * header, i18n) is unavailable here, so this is a minimal English page;
 * localized 404s inside /[locale] use app/[locale]/not-found.tsx.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-surface-page flex h-dvh items-center justify-center font-sans">
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <div className="px-6 text-center">
          <p className="eyebrow">404</p>
          <h1 className="heading-2 mt-2">Page not found</h1>
          <p className="body-lg mx-auto mt-4 max-w-xl">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <Link
            href="/"
            className="bg-primary focus-visible:outline-primary mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
